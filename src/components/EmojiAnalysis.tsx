
import React from 'react';

interface EmojiData {
  emoji: string;
  count: number;
  meaning: string;
}

interface EmojiAnalysisProps {
  emojis: EmojiData[];
}

const EmojiAnalysis: React.FC<EmojiAnalysisProps> = ({ emojis }) => {
  const maxCount = Math.max(...emojis.map(e => e.count));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">😍 Emoji Analysis</h3>
        <p className="text-sm text-gray-600">
          What do their emoji choices reveal? Hearts and fire emojis are good signs! 🔥❤️
        </p>
      </div>
      
      <div className="space-y-3">
        {emojis.slice(0, 8).map((emoji, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="text-2xl">{emoji.emoji}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{emoji.meaning}</span>
                <span className="text-sm text-gray-500">{emoji.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(emoji.count / maxCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
        
        {emojis.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">😔</div>
            <p>No emojis found in this chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiAnalysis;
