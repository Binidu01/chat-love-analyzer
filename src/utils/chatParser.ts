
import { ChatData, Message } from '@/types/chat';

const EMOJI_MEANINGS: Record<string, string> = {
  '❤️': 'Deep Love',
  '💕': 'Two Hearts',
  '😍': 'Heart Eyes',
  '🥰': 'Smiling Face with Hearts',
  '😘': 'Kiss',
  '💋': 'Kiss Mark',
  '🔥': 'Fire/Hot',
  '😊': 'Happy',
  '😂': 'Joy',
  '🤗': 'Hugging Face',
  '💖': 'Sparkling Heart',
  '💗': 'Growing Heart',
  '💓': 'Beating Heart',
  '💘': 'Heart with Arrow',
  '🌹': 'Rose',
  '🌟': 'Star',
  '✨': 'Sparkles',
  '💫': 'Dizzy',
  '🦋': 'Butterfly',
  '🌙': 'Moon',
};

export function parseWhatsAppChat(content: string): ChatData {
  const lines = content.split('\n').filter(line => line.trim());
  const messages: Message[] = [];
  const participants = new Set<string>();

  // WhatsApp date pattern: [DD/MM/YYYY, HH:MM:SS] or [M/D/YY, H:MM:SS AM/PM]
  const messagePattern = /^\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]?\s*([^:]+):\s*(.*)$/;

  for (const line of lines) {
    const match = line.match(messagePattern);
    if (match) {
      const [, date, time, sender, content] = match;
      
      // Parse date and time
      const [day, month, year] = date.split('/').map(Number);
      const fullYear = year < 100 ? 2000 + year : year;
      
      let parsedTime = time;
      if (time.includes('AM') || time.includes('PM')) {
        // Handle 12-hour format
        parsedTime = time.replace(/\s*(AM|PM)/, '');
      }
      
      const [hours, minutes, seconds = 0] = parsedTime.split(':').map(Number);
      const timestamp = new Date(fullYear, month - 1, day, hours, minutes, seconds);

      // Extract emojis
      const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
      const emojis = content.match(emojiRegex) || [];

      messages.push({
        timestamp,
        sender: sender.trim(),
        content: content.trim(),
        emojis
      });

      participants.add(sender.trim());
    }
  }

  // Sort messages by timestamp
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const participantArray = Array.from(participants);
  const analysis = analyzeChat(messages, participantArray);

  return {
    messages,
    participants: participantArray,
    totalMessages: messages.length,
    dateRange: {
      start: messages[0]?.timestamp || new Date(),
      end: messages[messages.length - 1]?.timestamp || new Date()
    },
    analysis
  };
}

function analyzeChat(messages: Message[], participants: string[]) {
  const user1 = participants[0];
  const user2 = participants[1] || participants[0];

  // Calculate reply times
  const replyTimes: number[] = [];
  const replyTimesByDate: Record<string, number[]> = {};
  
  for (let i = 1; i < messages.length; i++) {
    const current = messages[i];
    const previous = messages[i - 1];
    
    if (current.sender !== previous.sender) {
      const timeDiff = (current.timestamp.getTime() - previous.timestamp.getTime()) / (1000 * 60); // minutes
      if (timeDiff < 1440) { // Less than 24 hours
        replyTimes.push(timeDiff);
        
        const dateKey = current.timestamp.toDateString();
        if (!replyTimesByDate[dateKey]) {
          replyTimesByDate[dateKey] = [];
        }
        replyTimesByDate[dateKey].push(timeDiff);
      }
    }
  }

  const avgReplyTime = replyTimes.length > 0 
    ? replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length 
    : 0;

  // Emoji analysis
  const emojiCount: Record<string, number> = {};
  messages.forEach(msg => {
    msg.emojis.forEach(emoji => {
      emojiCount[emoji] = (emojiCount[emoji] || 0) + 1;
    });
  });

  const topEmojis = Object.entries(emojiCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([emoji, count]) => ({
      emoji,
      count,
      meaning: EMOJI_MEANINGS[emoji] || 'Unknown'
    }));

  // Word frequency
  const wordCount: Record<string, number> = {};
  messages.forEach(msg => {
    const words = msg.content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  const topWords = Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));

  // Message balance
  const user1Messages = messages.filter(m => m.sender === user1).length;
  const user2Messages = messages.filter(m => m.sender === user2).length;

  // Activity heatmap
  const activityByHour: Record<string, Record<number, number>> = {};
  messages.forEach(msg => {
    const day = msg.timestamp.toLocaleDateString('en-US', { weekday: 'short' });
    const hour = msg.timestamp.getHours();
    
    if (!activityByHour[day]) {
      activityByHour[day] = {};
    }
    activityByHour[day][hour] = (activityByHour[day][hour] || 0) + 1;
  });

  const activityHeatmap = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (const day of days) {
    for (let hour = 0; hour < 24; hour++) {
      activityHeatmap.push({
        day,
        hour,
        count: activityByHour[day]?.[hour] || 0
      });
    }
  }

  // Reply times by date
  const replyTimesByDateArray = Object.entries(replyTimesByDate)
    .map(([date, times]) => ({
      date,
      avgTime: times.reduce((a, b) => a + b, 0) / times.length
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate love score
  const loveScore = calculateLoveScore({
    avgReplyTime,
    emojiCount: topEmojis.length,
    messageBalance: user1Messages / (user1Messages + user2Messages),
    totalMessages: messages.length,
    heartEmojis: topEmojis.filter(e => ['❤️', '💕', '😍', '🥰', '😘', '💋'].includes(e.emoji)).length
  });

  return {
    loveScore,
    avgReplyTime,
    messageBalance: {
      user1: (user1Messages / messages.length) * 100,
      user2: (user2Messages / messages.length) * 100
    },
    topEmojis,
    topWords,
    replyTimes: replyTimesByDateArray,
    activityHeatmap
  };
}

function calculateLoveScore(factors: {
  avgReplyTime: number;
  emojiCount: number;
  messageBalance: number;
  totalMessages: number;
  heartEmojis: number;
}): number {
  let score = 50; // Base score

  // Quick reply bonus (faster replies = more love)
  if (factors.avgReplyTime < 5) score += 20; // Very quick
  else if (factors.avgReplyTime < 15) score += 15; // Quick
  else if (factors.avgReplyTime < 60) score += 10; // Moderate
  else if (factors.avgReplyTime > 240) score -= 15; // Slow

  // Emoji usage bonus
  score += Math.min(factors.emojiCount * 2, 15);

  // Heart emojis bonus
  score += Math.min(factors.heartEmojis * 3, 20);

  // Message balance (closer to 50-50 is better)
  const balanceScore = 15 - Math.abs(factors.messageBalance - 0.5) * 30;
  score += balanceScore;

  // Total messages bonus
  if (factors.totalMessages > 1000) score += 10;
  else if (factors.totalMessages > 500) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}
