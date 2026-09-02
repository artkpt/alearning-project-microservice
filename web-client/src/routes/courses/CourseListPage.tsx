import { Card, CardContent } from "@/components/ui/card";
import { CourseCard } from "@/features/course/CourseCard";
import { Link, useLoaderData } from "react-router";

export function CourseListPage(){
    const {courses} = useLoaderData() 
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {courses.map((course) => (
        <Link to={`/courses/${course.id}`}>
          <CourseCard 
            key={course.id} 
            code={course.code} 
            name={course.name}
          />
        </Link>
      ))}
    </div>
    
  )
}