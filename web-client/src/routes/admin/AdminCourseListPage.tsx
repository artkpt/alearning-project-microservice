import { Link, useLoaderData } from "react-router";
import { Plus } from "lucide-react";
import courseDefaultPic from "@/assets/course-default-pic.jpg"

export function AdminCourseListPage() {
  const { courses } = useLoaderData() as any;

  return (
    <>
      <header className="flex items-center justify-between px-8 py-6 bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-slate-900">Course content</h1>
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/courses/create"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-sm transition-colors"
          >
            <Plus size={18} />
            CREATE
          </Link>
        </div>
      </header>

      <div className="w-full flex-1 bg-white px-8">
        <table className="w-full text-left border-collapse">
          {/* Header ตามแบบฉบับ Minimal */}
          <thead className="border-y border-slate-200 text-slate-500 text-[13px] font-medium">
            <tr>
              <th className="py-3 pr-6 font-medium w-7/12">Course</th>
              <th className="py-3 px-6 font-medium w-2/12">
                <div className="flex items-center gap-1">
                  Created
                </div>
              </th>
              <th className="py-3 px-6 font-medium w-2/12">Updated</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 text-slate-900 text-sm">
            {courses.map((course: any) => (
              <tr key={course.id} className="hover:bg-gray-50/80 transition-colors group">
                
                {/* คอลัมน์ Thumbnail & Details */}
                <td className="py-3 pr-6 align-top">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail ขนาดย่อส่วนและขอบมนเล็กน้อย */}
                    <div className="w-[120px] aspect-video shrink-0 bg-slate-100 rounded-[4px] overflow-hidden border border-slate-200 flex items-center justify-center">
                      {course.thumbnailUrl ? (
                        <img src={`/uploads/images/${course.thumbnailUrl}`} alt={course.code} className="w-full h-full object-cover" />
                      ) : (
                        <img src={courseDefaultPic} alt={course.code} className="w-full h-full object-cover" />
                      )}
                    </div>
                    
                    {/* Course Code, Name & Description */}
                    <Link to={`/admin/courses/${course.id}/lessons`}>
                        <div className="flex flex-col min-w-0 max-w-[400px] xl:max-w-[500px]">
                        <span className="font-normal text-[14px] text-slate-900 truncate">
                            {course.code} {course.name}
                        </span>
                        <span className="text-[12px] text-slate-500 mt-1 whitespace-normal line-clamp-2 leading-relaxed">
                            {course.description}
                        </span>
                        </div>
                    </Link>
                  </div>
                </td>

                {/* คอลัมน์ Created At (จัดรูปแบบวันที่และ Subtext ใต้ภาพ) */}
                <td className="py-3 px-6 align-top">
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[13px] text-slate-900">{course.createdAt}</span>
                    <span className="text-[12px] text-slate-500 mt-0.5">Created</span>
                  </div>
                </td>

                {/* คอลัมน์ Updated At */}
                <td className="py-3 px-6 align-top">
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[13px] text-slate-900">{course.updatedAt}</span>
                    <span className="text-[12px] text-slate-500 mt-0.5">Updated</span>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="p-16 text-center text-slate-500 text-sm">
            No courses found. Click "CREATE" to get started.
          </div>
        )}
      </div>
    </>
  );
}