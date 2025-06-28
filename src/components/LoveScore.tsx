
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface LoveScoreProps {
  score: number;
}

const LoveScore: React.FC<LoveScoreProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 50;
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          current = score;
          clearInterval(interval);
        }
        setAnimatedScore(Math.round(current));
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-red-500 to-pink-500';
    if (score >= 60) return 'from-pink-500 to-purple-500';
    if (score >= 40) return 'from-purple-500 to-indigo-500';
    return 'from-indigo-500 to-blue-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "🔥 They're totally in love with you!";
    if (score >= 80) return "💕 Strong romantic feelings detected!";
    if (score >= 70) return "😍 They really care about you!";
    if (score >= 60) return "🥰 Good signs of affection!";
    if (score >= 50) return "😊 There's definitely something there!";
    if (score >= 40) return "🤔 Mixed signals, but promising!";
    return "😐 They might just be friendly...";
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center border border-pink-200 overflow-hidden">
      {/* Background Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute w-6 h-6 text-pink-200 animate-pulse opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💖 Love Score Analysis</h2>
        
        {/* Circular Progress */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(animatedScore / 100) * 251.2} 251.2`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`text-${getScoreColor(score).split('-')[1]}`} />
                <stop offset="100%" className={`text-${getScoreColor(score).split('-')[3]}`} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
                {animatedScore}%
              </div>
              <div className="text-sm text-gray-600 font-medium">Love Level</div>
            </div>
          </div>
        </div>

        {/* Score Message */}
        <div className={`inline-block bg-gradient-to-r ${getScoreColor(score)} text-white px-6 py-3 rounded-full text-lg font-semibold`}>
          {getScoreMessage(score)}
        </div>

        {/* Score Explanation */}
        <div className="mt-6 text-sm text-gray-600 max-w-md mx-auto">
          <p>
            This score is calculated based on reply times, emoji usage, message frequency, 
            and conversation patterns. The faster they reply and the more hearts they send, 
            the higher the love score! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoveScore;
