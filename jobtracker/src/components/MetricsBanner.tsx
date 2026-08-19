import React from 'react';

interface MetricsBannerProps {
  total: number;
  interviewing: number;
  offers: number;
  rejected: number;
}

export const MetricsBanner: React.FC<MetricsBannerProps> = ({
  total,
  interviewing,
  offers,
  rejected,
}) => {
  const cards = [
    { label: 'Total Applied', count: total, color: 'border-blue-500' },
    { label: 'Interviewing', count: interviewing, color: 'border-yellow-500' },
    { label: 'Offers', count: offers, color: 'border-green-500' },
    { label: 'Rejected', count: rejected, color: 'border-red-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${card.color}`}>
          <p className="text-sm font-medium text-gray-500">{card.label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{card.count}</p>
        </div>
      ))}
    </div>
  );
};