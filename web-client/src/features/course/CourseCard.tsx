import { Card, CardContent } from "@/components/ui/card";

export function CourseCard({course}){
    return (
        <Card 
          className="overflow-hidden flex flex-col rounded-sm border shadow-sm hover:shadow-md transition-shadow"
        >
          {course.thumbnailUrl ?
            <img src={`/images/${course.thumbnailUrl}`} alt="course thumpnail" />
            : <img src="/course-default-pic.jpg" alt="course thumpnail" />
          }

          <CardContent className="p-4 flex-1 bg-[#f9fafb]">
            <p className="text-[13px] font-semibold text-slate-700 line-clamp-2 leading-relaxed">
              {course.code} - {course.name}
            </p>
          </CardContent>

        </Card>
    )
}