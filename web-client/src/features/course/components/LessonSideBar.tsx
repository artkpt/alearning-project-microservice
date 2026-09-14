import { Button, buttonVariants } from "@/components/ui/button";
import { X, PlayCircle, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router";

export function LessonSideBar({courseData}){
  const { courseId, lessonId } = useParams();
  const currentLessonId = Number(lessonId);

    return (
            <div className="w-80 bg-background border-r flex flex-col h-full z-10">
              {/* Header (เหมือนเดิม) */}
              <div className="p-4 border-b flex items-center justify-between shrink-0">
                <h1 className="text-lg font-bold leading-tight text-foreground">{courseData.name}</h1>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0">
                  <X size={18} />
                </Button>
              </div>

              {/* Lesson List */}
              <div className="flex flex-col">
                {courseData.lessons.map((lesson) => {
                  const isActive = currentLessonId === lesson.id;
                  
                  return (
                    <Link
              key={lesson.id}
              to={`/courses/${courseId}/lessons/${lesson.id}`}
              
              className={`${buttonVariants({ variant: "ghost" })} w-full justify-start items-start gap-3 h-auto p-4 rounded-none border-l-4 transition-colors ${
                isActive
                  ? "bg-blue-50/50 border-blue-600 hover:bg-blue-50/80"
                  : "border-transparent hover:bg-muted/50"
              }`}
            >
              <div className="text-left flex-1 space-y-1">
                <p className={`text-sm font-semibold leading-none ${isActive ? 'text-blue-700' : 'text-foreground'}`}>
                  {lesson.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-normal mt-1">
                  {lesson.type === 'Reading' ? <BookOpen size={12} /> : <PlayCircle size={12} />}
                  <span>{lesson.type}</span>
                </div>
              </div>
            </Link>
                  )})}
              </div>  
            </div>  
  )}