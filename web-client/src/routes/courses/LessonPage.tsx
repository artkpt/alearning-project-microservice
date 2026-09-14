import { VideoSection } from "@/features/course/components/VideoSection";
import { useLoaderData } from "react-router";

export default function LessonPage(){
    const {lesson} = useLoaderData()

    return <VideoSection 
                title={lesson.title}
                videoUrl={`/videos/${lesson.videoUrl}`}
            />
}