
import React from 'react';
import { MessageCircle, Clock, Activity, Heart } from 'lucide-react';
import { ChatData } from '@/types/chat';

interface StatsCardsProps {
  data: ChatData;
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)}m`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  };

  const stats = [
    {
      icon: MessageCircle,
      label: 'Total Messages',
      value: data.totalMessages.toLocaleString(),
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Clock,
      label: 'Avg Reply Time',
      value: formatTime(data.analysis.avgReplyTime),
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: Activity,
      label: 'Message Balance',
      value: `${Math.round(data.analysis.messageBalance.user1)}% / ${Math.round(data.analysis.messageBalance.user2)}%`,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      icon: Heart,
      label: 'Love Score',
      value: `${data.analysis.loveScore}%`,
      color: 'text-pink-500',
      bg: 'bg-pink-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:scale-105 transition-transform"
        >
          <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center mb-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
