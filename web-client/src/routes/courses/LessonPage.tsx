import React, { useState } from 'react';
import {LessonSideBar} from '@/features/course/components/LessonSideBar'
import { VideoSection } from '@/features/course/components/VideoSection';
import { useLoaderData } from 'react-router';
import { FileText, PenLine } from 'lucide-react';
import { NotePanel } from '@/features/note/components/NotePanel';


const LessonPage = () => {
  const {course} = useLoaderData()
  const [activeLessonId, setActiveLessonId] = useState(1)
  const [noteMode, setNoteMode] = useState<'hidden' | 'create' | 'view'>('hidden');

  const noteActionButtons = (
    <>
      <button 
        onClick={() => setNoteMode('view')}
        className="flex items-center gap-2 text-slate-600 font-semibold px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <FileText size={18} /> View notes
      </button>
      <button 
        onClick={() => setNoteMode('create')}
        className="flex items-center gap-2 text-blue-600 font-semibold px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <PenLine size={18} /> Save note
      </button>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* 1. Lesson List */}
      <LessonSideBar 
        activeLessonId={activeLessonId} 
        courseData={course} 
        onSelectLesson={setActiveLessonId} 
      />

      {/* 2. Video & Notes */}
      <div className="flex-1 flex flex-col">
        
        {/* 2.1 Video Player */}
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          <VideoSection 
            title={course.lessons.filter((lesson)=> lesson.id === activeLessonId).title}
            videoUrl='/videos/fa40928b-97e7-4028-87a8-da0536a1849e.mp4'
            actionElements={noteActionButtons}
          />

          <div className="max-w-5xl mx-auto w-full flex justify-end mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
                Go to next item &rarr;
            </button>
          </div>

          {noteMode !== 'hidden' && (
                                    <NotePanel 
                                      mode={noteMode} 
                                      onClose={() => setNoteMode('hidden')}
                                      lessonId={1}
                                    />
        )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;