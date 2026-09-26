import { ArrowLeft, BarChart, Edit2, Loader, MessageCircle, MessageSquare, MoreVertical, PlaySquare, Settings, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { Form, Link, redirect, useNavigation, type ActionFunctionArgs } from "react-router";
import { useState, useEffect, useRef } from "react";
import { createCourse } from "@/features/course/createCourse";

export const createCourseAction = async ({ request }: ActionFunctionArgs) => {
    console.log('action')
    const payload = await request.formData()
    console.log('payload', payload)

    try{
        let newCourse = await createCourse(payload)
        return redirect(`/admin/courses`)
    }
    catch(e){
        console.log(e)
    }
}

export function CreateCoursePage(){
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    
    // 1. เพิ่ม useRef เพื่อเข้าถึง DOM ของ input file โดยตรง
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // 2. ฟังก์ชันจัดการการลบรูปภาพ
    const handleRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // ป้องกันไม่ให้ Form submit หรือเปิดโฟลเดอร์รูปซ้ำ
        e.stopPropagation(); // ป้องกันไม่ให้ Event กระจายไปโดน <label> ที่ครอบอยู่

        // เคลียร์ Memory ทันที
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        // ล้างภาพ Preview ออกจากหน้าจอ
        setPreviewUrl(null);
        
        // ล้างไฟล์ที่ค้างอยู่ใน Input เพื่อให้เลือกไฟล์เดิมซ้ำได้ในอนาคต
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

  return (
    // 💡 ย้าย <Form> มาคลุมระดับนอกสุด และเพิ่ม encType="multipart/form-data" เพื่อให้ส่งไฟล์ภาพได้
    <Form 
      method="post" 
      encType="multipart/form-data" 
      className="flex min-h-screen bg-gray-50 text-slate-900 font-sans w-full"
    >
      
      {/* 1. Sidebar (Left Column) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
        
        {/* Thumbnail Upload Section */}
        <div className="p-6 flex flex-col items-center border-b border-slate-200">
          
          <label 
            htmlFor="thumbnail-upload"
            className="relative w-full aspect-video bg-slate-100 border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center text-slate-400 mb-2 cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-all overflow-hidden"
          >
            {previewUrl ? (
              // แสดงภาพ Preview แบบเต็มกรอบ (ไม่มีปุ่มซ้อนทับแล้ว)
              <img src={previewUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
            ) : (
              // แสดงสถานะว่างเปล่า
              <>
                <ImageIcon size={32} className="mb-2" />
                <span className="text-xs font-medium">Upload Thumbnail</span>
              </>
            )}
          </label>

          <input 
            id="thumbnail-upload"
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {/* ปุ่มลบรูปภาพ แสดงอยู่ด้านล่างอย่างชัดเจน (จะโผล่มาเมื่อมีรูปเท่านั้น) */}
          {previewUrl && (
            <button 
              type="button" 
              onClick={handleRemoveThumbnail}
              className="w-full flex items-center justify-center gap-2 py-2 mb-4 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            >
              <Trash2 size={16} />
              Remove Thumbnail
            </button>
          )}

          <div className="w-full text-left mt-2">
            <p className="text-xs text-slate-500 font-medium">Your course</p>
            <p className="text-sm font-semibold truncate">New Course Draft</p>
          </div>
        </div>

      </aside>

      {/* 2. Main Content (Right Column) */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-white">
        <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
          
          {/* Header Action Bar */}
          <header className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10">
            <h1 className="text-2xl font-bold">Course details</h1>
          </header>

          {/* Form Content */}
          <div className="px-8 pb-12 flex flex-col gap-6 w-full">
            
              {/* Code Input */}
              <div className="relative group w-full">
                  <div className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-500 group-focus-within:text-blue-600 z-10">
                      Code (required)
                  </div>
                  <input 
                    name="courseCode"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none text-sm placeholder:text-transparent"
                    placeholder="Enter code"
                  />
              </div>

              {/* Title Input */}
              <div className="relative group w-full">
                <div className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-500 group-focus-within:text-blue-600 z-10">
                  Name (required)
                </div>
                <input 
                  name="courseName"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none text-sm placeholder:text-transparent"
                  placeholder="Enter name"
                />
              </div>

              {/* Description Input */}
              <div className="relative group w-full">
                <div className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-500 group-focus-within:text-blue-600 z-10">
                  Description
                </div>
                <textarea 
                  name="description"
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none text-sm"
                  placeholder="Add description"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-full transition-colors"
                >
                  {isSubmitting ? <Loader size={16} className="animate-spin" /> : null}
                  Save
                </button>
              </div>

          </div>
        </div>
      </main>
    </Form>
  );
}