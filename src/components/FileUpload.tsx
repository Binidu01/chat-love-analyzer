
import React, { useCallback, useState } from 'react';
import { Upload, FileText, Heart } from 'lucide-react';
import { ChatData } from '@/types/chat';
import { parseWhatsAppChat } from '@/utils/chatParser';

interface FileUploadProps {
  onFileUpload: (data: ChatData) => void;
  isAnalyzing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isAnalyzing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsedData = parseWhatsAppChat(content);
      onFileUpload(parsedData);
    };
    reader.readAsText(file);
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-pink-200">
        <div className="animate-spin w-16 h-16 mx-auto mb-6">
          <Heart className="w-16 h-16 text-pink-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Analyzing Your Love Story...</h3>
        <p className="text-gray-600">
          We're carefully examining every message, emoji, and timestamp to reveal the secrets of your relationship! 💕
        </p>
        <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border-2 border-dashed transition-all duration-300 ${
          isDragOver 
            ? 'border-pink-400 bg-pink-50/80 scale-105' 
            : 'border-pink-200 hover:border-pink-300'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="mb-8">
          <Upload className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Upload Your WhatsApp Chat
          </h2>
          <p className="text-gray-600 mb-6">
            Drag and drop your WhatsApp chat export file here, or click to browse
          </p>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".txt"
            onChange={handleFileInput}
          />
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
            Choose File
          </div>
        </label>

        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">📱 How to export your WhatsApp chat:</p>
          <ol className="text-left max-w-md mx-auto space-y-1">
            <li>1. Open WhatsApp chat</li>
            <li>2. Tap on contact name</li>
            <li>3. Choose "Export Chat"</li>
            <li>4. Select "Without Media"</li>
            <li>5. Upload the .txt file here</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
