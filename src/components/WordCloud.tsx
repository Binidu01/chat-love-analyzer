
import React from 'react';

interface WordData {
  word: string;
  count: number;
}

interface WordCloudProps {
  words: WordData[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const maxCount = Math.max(...words.map(w => w.count));

  const getFontSize = (count: number) => {
    const ratio = count / maxCount;
    return Math.max(12, Math.min(32, 12 + ratio * 20));
  };

  const getColor = (index: number) => {
    const colors = [
      'text-pink-500', 'text-purple-500', 'text-indigo-500', 
      'text-blue-500', 'text-green-500', 'text-yellow-500',
      'text-red-500', 'text-gray-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📝 Word Frequency Analysis</h3>
        <p className="text-sm text-gray-600">
          The most used words reveal conversation patterns. Look for positive words and your name!
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center items-center min-h-[200px]">
        {words.slice(0, 20).map((word, index) => (
          <span
            key={index}
            className={`font-semibold ${getColor(index)} hover:scale-110 transition-transform cursor-default`}
            style={{ fontSize: `${getFontSize(word.count)}px` }}
            title={`${word.word}: ${word.count} times`}
          >
            {word.word}
          </span>
        ))}
        
        {words.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>No words to analyze</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCloud;
