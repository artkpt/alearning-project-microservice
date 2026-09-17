import {LessonSideBar} from '@/features/course/components/LessonSideBar'
import { Link, useLoaderData } from 'react-router';
import { Outlet } from 'react-router';


export default function LearningPage(){
  const {course} = useLoaderData()
  console.log('learning page render')


  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* 1. Lesson List */}
      <LessonSideBar 
        courseData={course} 
      />

      {/* 2. Video & Notes */}
      <div className="flex-1 flex flex-col">
        {/* 2.1 Video Player */}
          <Outlet/>
      </div>
    </div>
  );
};
