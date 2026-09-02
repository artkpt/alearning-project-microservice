import React from "react";

interface VideoSectionProps {
  title: string;
  videoUrl: string;
  actionElements?: React.ReactNode; // รับ UI จากภายนอกเข้ามาแสดง
}

export function VideoSection({ title, videoUrl, actionElements }: VideoSectionProps) {
  return (
    <div className="max-w-5xl mx-auto w-full space-y-6">
      
      <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-lg">
        <video 
          controls 
          className="w-full h-full object-cover"
          src={videoUrl}
        >
          Your browser does not support the video tag. 
        </video>
      </div>
      
      {/* Video Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        
        {/* แสดงปุ่มที่รับมาจาก LessonPage ตรงนี้ */}
        {actionElements && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            {actionElements}
          </div>
        )}
      </div>
    </div>
  );
}