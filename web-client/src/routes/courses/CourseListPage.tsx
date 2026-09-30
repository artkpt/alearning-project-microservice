import { CourseCard } from "@/features/course/components/CourseCard";
import type { Course } from "@/features/course/types/course.types";
import { Link, useLoaderData } from "react-router";


export function CourseListPage(){
    const {courses} = useLoaderData() 
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {courses.map((course: Course) => (
        <Link to={`/courses/${course.id}`}>
          <CourseCard 
            key={course.id} 
            course={course}
          />
        </Link>
      ))}
    </div>
    
  )
}