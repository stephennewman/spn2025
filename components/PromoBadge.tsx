import { Promo } from '@/lib/types';

interface PromoBadgeProps {
  promo: Promo;
}

export default function PromoBadge({ promo }: PromoBadgeProps) {
  const content = promo.url ? (
    <a 
      href={promo.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:underline"
    >
      {promo.label}
    </a>
  ) : (
    promo.label
  );

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-yellow-600 text-lg">🎉</span>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium text-yellow-800">Special Offer</h4>
          <p className="text-sm text-yellow-700 mt-1">{content}</p>
        </div>
      </div>
    </div>
  );
}
