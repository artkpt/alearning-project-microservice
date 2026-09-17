import { VideoSection } from "@/features/course/components/VideoSection";
import { NotePanel } from "@/features/note/components/NotePanel";
import { useLoaderData, useRouteLoaderData } from "react-router";
import { Link } from "react-router";

export default function LessonPage(){
    const {lesson} = useLoaderData()
    const {course} = useRouteLoaderData('learning-layout')
    console.log('lesson page render')

    return (
        <div className="flex-1 p-6 bg-white overflow-y-auto">
            <VideoSection 
                title={lesson.title}
                videoUrl={`/videos/${lesson.videoUrl}`}
            />
            <NotePanel key={lesson.id} lesson={lesson} course={course}/>
            <div className="max-w-5xl mx-auto w-full flex justify-end mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
                            Go to next item &rarr;
                </button>
            </div>
            
        </div>
       
    )
}