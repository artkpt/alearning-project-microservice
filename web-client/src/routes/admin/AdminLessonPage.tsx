import { Link, redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Plus } from "lucide-react";
import videoThumbnail from "@/assets/video-bg.jpg"
import courseDefault from "@/assets/course-default-pic.jpg"
import { useAuth } from "@/features/auth/stores/authStore";
import { getCourseById } from "@/features/course/api/getCourseById";
import { getLessonsByCourseId } from "@/features/course/api/getLessonsByCourseId";


export const courseLessonsLoader = async({params}: LoaderFunctionArgs) => {
    const id = params.courseId as string
    const auth = useAuth.getState().auth
    try{
        const course = await getCourseById(id)
        const lessons = await getLessonsByCourseId(id)

        return { course, lessons}
    }catch(e){
       if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
    }
}

export function AdminLessonPage() {
  const { course, lessons } = useLoaderData() as any;

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans w-full">
      
      {/* 1. Sidebar (Left Column) - แสดงข้อมูลแบบ Read-only */}
      <aside className="w-[256px] border-r border-slate-200 flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
        
        {/* Course Info Section */}
        <div className="p-0 flex flex-col border-b border-slate-200">
          {/* Thumbnail */}
          <div className="w-full aspect-video bg-slate-200 flex items-center justify-center text-slate-400">
            {course.thumbnailUrl ? (
               <img src={`/uploads/images/${course.thumbnailUrl}`} alt={course.name} className="w-full h-full object-cover" />
            ) : (
               <img src={courseDefault} alt={course.name} className="w-full h-full object-cover" />
            )}
          </div>
          
          <div className="w-full text-left p-6">
            <p className="text-[13px] text-slate-500 font-medium">Course</p>
            <p className="text-sm font-semibold truncate mt-0.5">{course.name}</p>
          </div>
        </div>

        
      </aside>

      {/* 2. Main Content (Right Column) - ตารางจัดการ Lesson */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-white">
        
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10 border-b border-slate-200">
          <h1 className="text-[22px] font-semibold">Course videos</h1>
          <Link to={`/admin/courses/${course.id}/lessons/create`}>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-sm transition-colors">
              <Plus size={18} />
              CREATE LESSON
            </button>
          </Link>
        </header>

        {/* Table Content */}
        <div className="w-full flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-slate-200 text-slate-500 text-[13px] font-medium">
              <tr>
                <th className="py-3 px-2 w-5/12 font-medium">Video</th>
                <th className="py-3 px-4 w-2/12 font-medium">Date</th>
              </tr>
            </thead>
            
            
            <tbody className="divide-y divide-slate-200 text-slate-900 text-[13px]">
              {lessons.map((lesson: any) => (
                
                <tr  key={lesson.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* Video Details */}
                  <td className="py-3 px-2 align-top">
                      <a 
                        href={`/uploads/videos/${lesson.videoUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block" 
                    >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail with Duration Badge */}
                      <div className="relative w-[120px] aspect-video shrink-0 bg-slate-100 rounded-[4px] overflow-hidden border border-slate-200">
                        <img src={videoThumbnail} alt="video thumbnail" className="w-full h-full object-cover" />
                        
                      </div>
                      
                      <div className="flex flex-col min-w-0 py-0.5">
                        <span className="font-medium text-[14px] text-blue-600 hover:underline cursor-pointer truncate">
                          {lesson.title}
                        </span>
                      </div>
                    </div>
                    </a>
                  </td>

                
                  {/* Date */}
                  <td className="py-3 px-4 align-top pt-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900">{lesson.date}</span>
                    </div>
                  </td>

                  
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}