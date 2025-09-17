import { HoursByDay } from '@/lib/types';

interface HoursProps {
  hours?: HoursByDay;
}

export default function Hours({ hours }: HoursProps) {
  if (!hours) {
    return (
      <div className="text-gray-500 italic">
        Hours not available
      </div>
    );
  }

  const dayOrder: (keyof HoursByDay)[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayNames = {
    mon: 'Monday',
    tue: 'Tuesday', 
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hours of Operation</h3>
      <div className="space-y-2">
        {dayOrder.map(day => (
          <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="font-medium text-gray-700 w-24">
              {dayNames[day]}:
            </span>
            <span className="text-gray-600 flex-1 text-right">
              {hours[day] || 'Closed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
