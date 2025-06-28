
import React from 'react';

interface ActivityData {
  hour: number;
  day: string;
  count: number;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ data }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const maxCount = Math.max(...data.map(d => d.count));

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'bg-pink-500';
    if (ratio > 0.6) return 'bg-pink-400';
    if (ratio > 0.4) return 'bg-pink-300';
    if (ratio > 0.2) return 'bg-pink-200';
    return 'bg-pink-100';
  };

  const getDataPoint = (day: string, hour: number) => {
    return data.find(d => d.day === day && d.hour === hour) || { hour, day, count: 0 };
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🕐 Activity Heatmap</h3>
        <p className="text-sm text-gray-600">
          When are you both most active? Peak hours might reveal their free time and priorities.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex mb-2">
            <div className="w-12"></div>
            {hours.filter(h => h % 4 === 0).map(hour => (
              <div key={hour} className="flex-1 text-xs text-gray-500 text-center">
                {hour.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          {days.map(day => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-gray-600 font-medium">{day}</div>
              <div className="flex flex-1 gap-1">
                {hours.map(hour => {
                  const dataPoint = getDataPoint(day, hour);
                  return (
                    <div
                      key={hour}
                      className={`h-4 rounded-sm ${getIntensity(dataPoint.count)} border border-gray-200`}
                      style={{ flex: '1' }}
                      title={`${day} ${hour}:00 - ${dataPoint.count} messages`}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Legend */}
          <div className="flex items-center justify-center mt-4 gap-2 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-pink-100 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-pink-200 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-pink-300 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-sm border border-gray-200"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
