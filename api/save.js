// Inline-editor save endpoint. Applies text changes to source files in the
// GitHub repo; the resulting commit triggers a redeploy via the Git integration.

const REPO = "stephennewman/spn2025";
const BRANCH = "main";
const FILES = [
  "src/pages/index.astro",
  "src/config/index.ts",
  "src/components/Experience.astro",
  "src/layouts/Layout.astro",
];

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Replace old text with new text in file source. Prefers exact quoted string
// literals (safe for short strings like stats); falls back to a
// whitespace-tolerant match for JSX body text.
function applyChange(text, oldT, newT) {
  let count = 0;
  for (const q of ['"', "'", "`"]) {
    const re = new RegExp(escapeRegex(q + oldT + q), "g");
    const matches = text.match(re);
    if (matches) {
      const escaped = q + newT.split(q).join("\\" + q) + q;
      text = text.replace(re, escaped);
      count += matches.length;
    }
  }
  if (count === 0 && oldT.length >= 8) {
    const fuzzy = new RegExp(
      "(?<![A-Za-z0-9])" +
        oldT.split(/\s+/).map(escapeRegex).join("\\s+") +
        "(?![A-Za-z0-9])",
      "g"
    );
    const matches = text.match(fuzzy);
    if (matches) {
      text = text.replace(fuzzy, newT);
      count += matches.length;
    }
  }
  return { text, count };
}

async function gh(token, path, opts = {}) {
  const res = await fetch("https://api.github.com" + path, {
    ...opts,
    headers: {
      authorization: "Bearer " + token,
      accept: "application/vnd.github+json",
      "user-agent": "spn-inline-editor",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error("GitHub " + res.status + ": " + (await res.text()).slice(0, 300));
  }
  return res.json();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const pw = req.headers["x-edit-password"];
  if (!process.env.EDIT_PASSWORD || pw !== process.env.EDIT_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const changes = (req.body && req.body.changes) || null;
  if (!Array.isArray(changes)) {
    return res.status(400).json({ error: "Bad payload" });
  }
  if (changes.length === 0) {
    return res.status(200).json({ ok: true, replacements: 0 }); // password check only
  }
  for (const ch of changes) {
    if (/[<>{}]/.test(String(ch.new || ""))) {
      return res.status(400).json({ error: "New text can't contain < > { } characters" });
    }
  }
  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: "Server missing GitHub token" });

  try {
    let total = 0;
    const updated = [];
    for (const file of FILES) {
      const meta = await gh(token, `/repos/${REPO}/contents/${file}?ref=${BRANCH}`);
      let text = Buffer.from(meta.content, "base64").toString("utf8");
      let fileCount = 0;
      for (const ch of changes) {
        const oldT = String(ch.old || "").trim();
        const newT = String(ch.new || "").trim();
        if (!oldT || !newT || oldT === newT) continue;
        const r = applyChange(text, oldT, newT);
        if (r.count) {
          text = r.text;
          fileCount += r.count;
        }
      }
      if (fileCount) {
        updated.push({ file, sha: meta.sha, text });
        total += fileCount;
      }
    }
    if (!total) {
      return res.status(422).json({
        error:
          "Couldn't locate that text in the source files. Try editing a smaller, exact piece of text.",
      });
    }
    for (const u of updated) {
      await gh(token, `/repos/${REPO}/contents/${u.file}`, {
        method: "PUT",
        body: JSON.stringify({
          message: "Inline edit via site editor",
          content: Buffer.from(u.text, "utf8").toString("base64"),
          sha: u.sha,
          branch: BRANCH,
        }),
      });
    }
    return res.status(200).json({
      ok: true,
      replacements: total,
      files: updated.map((u) => u.file),
    });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e).slice(0, 300) });
  }
};
