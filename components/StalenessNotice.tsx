import { isStale, formatRelativeTime } from '@/lib/data';

interface StalenessNoticeProps {
  lastScrapedAt?: string;
  hours?: number;
}

export default function StalenessNotice({ lastScrapedAt, hours = 48 }: StalenessNoticeProps) {
  if (!lastScrapedAt) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-red-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Data Not Available
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Last update information is not available for this business.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stale = isStale(lastScrapedAt, hours);

  if (stale) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-red-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Data Needs Update
            </h3>
            <p className="text-sm text-red-700 mt-1">
              This business information was last updated {formatRelativeTime(lastScrapedAt)} and may be outdated.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-green-400">✓</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-green-700">
            Last updated {formatRelativeTime(lastScrapedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
