
import React from 'react';
import { ChatData } from '@/types/chat';
import LoveScore from './LoveScore';
import ReplyTimeChart from './ReplyTimeChart';
import EmojiAnalysis from './EmojiAnalysis';
import WordCloud from './WordCloud';
import ActivityHeatmap from './ActivityHeatmap';
import StatsCards from './StatsCards';

interface ChatAnalysisProps {
  data: ChatData;
}

const ChatAnalysis: React.FC<ChatAnalysisProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Love Score - Main Feature */}
      <LoveScore score={data.analysis.loveScore} />
      
      {/* Stats Cards */}
      <StatsCards data={data} />
      
      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ReplyTimeChart data={data.analysis.replyTimes} />
        <EmojiAnalysis emojis={data.analysis.topEmojis} />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <WordCloud words={data.analysis.topWords} />
        <ActivityHeatmap data={data.analysis.activityHeatmap} />
      </div>
    </div>
  );
};

export default ChatAnalysis;
