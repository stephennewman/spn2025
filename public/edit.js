/* Inline editor — only loads when the page is visited with ?edit=1 */
(() => {
  const PW_KEY = "spn-edit-pw";
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const originals = new WeakMap();
  let editables = [];
  let unlocked = false;

  const style = document.createElement("style");
  style.textContent = `
    .spn-editable { outline: 1px dashed rgba(139,92,246,.35); outline-offset: 2px; cursor: text; }
    .spn-editable:hover, .spn-editable:focus { outline: 2px solid rgba(139,92,246,.85); }
    .spn-dirty { background: rgba(139,92,246,.08); }
    #spn-bar { position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%);
      z-index: 99999; background: #111827; color: #fff; border-radius: 9999px;
      padding: 10px 16px; display: flex; gap: 10px; align-items: center;
      font: 13px/1.2 -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 8px 30px rgba(0,0,0,.35); max-width: calc(100vw - 32px); }
    #spn-bar input { background: #1f2937; border: 1px solid #374151; color: #fff;
      border-radius: 9999px; padding: 6px 12px; font: inherit; outline: none; width: 160px; }
    #spn-bar button { border: 0; border-radius: 9999px; padding: 7px 14px; font: inherit;
      font-weight: 600; cursor: pointer; }
    #spn-save { background: linear-gradient(90deg,#ec4899,#8b5cf6); color: #fff; }
    #spn-discard { background: #374151; color: #d1d5db; }
    #spn-bar .spn-msg { opacity: .85; white-space: nowrap; }
  `;
  document.head.appendChild(style);

  const bar = document.createElement("div");
  bar.id = "spn-bar";
  document.body.appendChild(bar);

  function setBar(html) {
    bar.innerHTML = html;
  }

  function showLogin(msg) {
    setBar(`<span class="spn-msg">${msg || "Edit mode"}</span>
      <input id="spn-pw" type="password" placeholder="Password" autocomplete="off" />
      <button id="spn-save">Unlock</button>`);
    const input = bar.querySelector("#spn-pw");
    const go = async () => {
      const pw = input.value;
      if (!pw) return;
      setBar(`<span class="spn-msg">Checking…</span>`);
      const res = await post(pw, []);
      if (res.ok) {
        sessionStorage.setItem(PW_KEY, pw);
        enterEditMode();
      } else {
        showLogin("Wrong password");
      }
    };
    bar.querySelector("#spn-save").addEventListener("click", go);
    input.addEventListener("keydown", (e) => e.key === "Enter" && go());
    input.focus();
  }

  async function post(pw, changes) {
    try {
      const r = await fetch("/api/save", {
        method: "POST",
        headers: { "content-type": "application/json", "x-edit-password": pw },
        body: JSON.stringify({ changes }),
      });
      const data = await r.json().catch(() => ({}));
      return { ok: r.ok, status: r.status, data };
    } catch (e) {
      return { ok: false, status: 0, data: { error: String(e) } };
    }
  }

  function isLeaf(el) {
    if (!el.childNodes.length) return false;
    for (const n of el.childNodes) {
      if (n.nodeType !== Node.TEXT_NODE) return false;
    }
    return norm(el.textContent).length > 0;
  }

  function enterEditMode() {
    unlocked = true;
    const skip = new Set(["SCRIPT", "STYLE", "TITLE", "TEXTAREA", "INPUT", "SVG", "PATH"]);
    editables = [];
    document.querySelectorAll("body *").forEach((el) => {
      if (bar.contains(el)) return;
      if (skip.has(el.tagName)) return;
      if (el.closest("svg")) return;
      if (!isLeaf(el)) return;
      el.classList.add("spn-editable");
      el.setAttribute("contenteditable", "plaintext-only");
      el.setAttribute("spellcheck", "false");
      originals.set(el, norm(el.textContent));
      el.addEventListener("input", () => {
        el.classList.toggle("spn-dirty", norm(el.textContent) !== originals.get(el));
        refreshBar();
      });
      editables.push(el);
    });
    // Don't navigate when clicking text inside links while editing
    document.addEventListener(
      "click",
      (e) => {
        if (unlocked && e.target.closest && e.target.closest("a")) e.preventDefault();
      },
      true
    );
    refreshBar();
  }

  function pendingChanges() {
    const out = [];
    for (const el of editables) {
      const oldT = originals.get(el);
      const newT = norm(el.textContent);
      if (oldT && newT && oldT !== newT) out.push({ old: oldT, new: newT });
    }
    return out;
  }

  function refreshBar(msg) {
    const n = pendingChanges().length;
    setBar(`<span class="spn-msg">${msg || (n ? `${n} unsaved change${n > 1 ? "s" : ""}` : "Click any text to edit")}</span>
      <button id="spn-save" ${n ? "" : "disabled style='opacity:.4;cursor:default'"}>Save</button>
      <button id="spn-discard">Discard</button>`);
    bar.querySelector("#spn-save").addEventListener("click", save);
    bar.querySelector("#spn-discard").addEventListener("click", discard);
  }

  function discard() {
    for (const el of editables) {
      if (originals.get(el) !== norm(el.textContent)) el.textContent = originals.get(el);
      el.classList.remove("spn-dirty");
    }
    refreshBar();
  }

  async function save() {
    const changes = pendingChanges();
    if (!changes.length) return;
    setBar(`<span class="spn-msg">Saving…</span>`);
    const pw = sessionStorage.getItem(PW_KEY);
    const res = await post(pw, changes);
    if (res.status === 401) {
      sessionStorage.removeItem(PW_KEY);
      showLogin("Session expired — enter password");
      return;
    }
    if (!res.ok) {
      refreshBar(`⚠ ${res.data.error || "Save failed"}`);
      return;
    }
    for (const el of editables) {
      originals.set(el, norm(el.textContent));
      el.classList.remove("spn-dirty");
    }
    refreshBar(`Saved ✓ — rebuilding site, live in ~1–2 min`);
  }

  const pw = sessionStorage.getItem(PW_KEY);
  if (pw) {
    post(pw, []).then((res) => (res.ok ? enterEditMode() : showLogin()));
  } else {
    showLogin();
  }
})();
