
export interface Message {
  timestamp: Date;
  sender: string;
  content: string;
  emojis: string[];
}

export interface ChatData {
  messages: Message[];
  participants: string[];
  totalMessages: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  analysis: {
    loveScore: number;
    avgReplyTime: number;
    messageBalance: {
      user1: number;
      user2: number;
    };
    topEmojis: Array<{
      emoji: string;
      count: number;
      meaning: string;
    }>;
    topWords: Array<{
      word: string;
      count: number;
    }>;
    replyTimes: Array<{
      date: string;
      avgTime: number;
    }>;
    activityHeatmap: Array<{
      hour: number;
      day: string;
      count: number;
    }>;
  };
}
