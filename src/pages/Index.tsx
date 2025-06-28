
import React, { useState } from 'react';
import { Upload, Heart, MessageCircle, Clock, Activity } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ChatAnalysis from '@/components/ChatAnalysis';
import { ChatData } from '@/types/chat';

const Index = () => {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (data: ChatData) => {
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setChatData(data);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WhatsApp Love Analyzer
            </h1>
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your WhatsApp chat and discover the hidden patterns of love! 
            Find out how much they care based on response times, emojis, and conversation flow. 💕
          </p>
        </div>

        {/* Features Preview */}
        {!chatData && !isAnalyzing && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-pink-200">
              <Clock className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Reply Time Analysis</h3>
              <p className="text-sm text-gray-600 mt-2">Track response patterns</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-200">
              <Heart className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Emoji Analysis</h3>
              <p className="text-sm text-gray-600 mt-2">Decode their feelings</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-indigo-200">
              <MessageCircle className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Word Frequency</h3>
              <p className="text-sm text-gray-600 mt-2">Most used words</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-pink-200">
              <Activity className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Activity Heatmap</h3>
              <p className="text-sm text-gray-600 mt-2">Peak conversation times</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!chatData ? (
          <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
        ) : (
          <ChatAnalysis data={chatData} />
        )}
      </div>
    </div>
  );
};

export default Index;
