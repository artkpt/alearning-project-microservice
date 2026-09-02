import { useLoaderData, Link, useFetcher } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/stores/authStore";

interface Lesson {
  id: number;
  title: string;
  order: number;
  status: 'pending' | 'started' | 'completed'; // สถานะบทเรียน
}

interface CourseDetail {
  id: number;
  code: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  lessons: Lesson[];
}

const thumbnailUrl = "/course-default-pic.jpg"

export function CourseDetailPage() {
  const fetcher = useFetcher()
  const {course, enrollment} = useLoaderData()
  const {auth} = useAuth()

  return (
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        
        {/* banner */}
        <div className="relative rounded-lg border shadow-sm bg-[#2b5783] p-6 md:p-8 flex flex-col md:flex-row gap-6 text-white overflow-hidden">
          
          {/* background */}
          <div className="absolute right-6 top-8 w-4 h-4 bg-amber-400 rounded-full z-10" />
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#3993d4] opacity-90 z-0" />

          <img 
            src={thumbnailUrl} 
            alt={course.name} 
            className="relative z-10 w-full md:w-40 h-40 md:h-40 rounded-lg object-cover"
          />

          {/* course intro */}
          <div className="relative z-10 flex flex-col justify-center flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl drop-shadow-md">
              {course.code} - {course.name}
            </h1>
            <p className="text-lg font-medium tracking-wide text-slate-100 mt-2 line-clamp-2 md:line-clamp-3">
              {course.description}
            </p>
          </div>
        </div>

        {/* lesson */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Lessons ({course.lessons.length})
            </h2>
            {auth && (enrollment.status 
                                    ? <Button disabled>{enrollment.status}</Button>

                                    : <fetcher.Form method="post" action = {`/api/courses/${course.id}/enrollments`}>
                                            <Button type="submit">Enrollment</Button>
                                        </fetcher.Form>  
            )}
          </div>

          {enrollment.status && 
              <div className="grid grid-cols-1 gap-4">
                {course.lessons.map((lesson) => {
                  return (
                    <Link to={`/courses/${course.id}/lessons`}>
                      <Card key={lesson.id} className="overflow-hidden rounded-md border shadow-sm flex justify-between p-4 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                              {lesson.title}
                            </h3>
                      </Card>
                    </Link>
                  );
                })}
              </div>
          }  
  
        </div>
      </div>
  );
}