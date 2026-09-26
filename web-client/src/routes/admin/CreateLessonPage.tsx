import { ArrowLeft, Loader, Upload, Video, Trash2, RefreshCw } from "lucide-react";
import { Form, Link, redirect, useNavigation, useParams, type ActionFunctionArgs } from "react-router";
import { useState, useEffect, useRef } from "react";
import { createLesson } from "@/features/course/createLesson";

export const createLessonAction = async ({ request, params }: ActionFunctionArgs) => {
    const courseId = params.courseId as string
    const payload = await request.formData();

    try {
        let newLesson = await createLesson(courseId, payload);

        return redirect(`/admin/courses/${courseId}/lessons`);
    } catch(e) {
        console.error(e);
    }
}

export function CreateLessonPage() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const { courseId } = useParams()
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const triggerFileInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

  return (
    <Form 
      method="post" 
      encType="multipart/form-data" 
      className="flex min-h-screen bg-gray-50 text-slate-900 font-sans w-full"
    >
      {/* 1. Sidebar (Left Column) - สำหรับอัปโหลดวิดีโอ */}
      <aside className="w-80 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
        
        {/* Back Navigation */}
        <div className="p-4 border-b border-slate-100">
            <Link to={`/admin/courses/${courseId}/lessons`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
                <ArrowLeft size={16} /> Back to Course
            </Link>
        </div>

        {/* Video Upload Section */}
        <div className="p-6 flex flex-col items-center border-b border-slate-200">
          
          {previewUrl ? (
            // โหมดแสดงวิดีโอ (แยกออกจาก <label> เพื่อไม่ให้ปุ่ม Play ไปทับซ้อนกับการเปิดไฟล์)
            <div className="w-full mb-4">
              <div className="w-full aspect-video bg-black rounded-md overflow-hidden shadow-sm">
                <video src={previewUrl} controls className="w-full h-full object-contain" />
              </div>
              
              <div className="flex gap-2 mt-3">
                <button 
                  type="button" 
                  onClick={triggerFileInput}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <RefreshCw size={14} /> Change
                </button>
                <button 
                  type="button" 
                  onClick={handleRemoveVideo}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ) : (
            // โหมดว่างเปล่า (รออัปโหลด)
            <label 
              htmlFor="video-upload"
              className="relative w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center text-slate-500 mb-4 cursor-pointer hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all overflow-hidden"
            >
                <Upload size={32} className="mb-2" />
                <span className="text-sm font-medium">Select video file</span>
                <span className="text-xs mt-1 text-slate-400">MP4, WebM (Max 2GB)</span>
            </label>
          )}

          <input 
            id="video-upload"
            type="file"
            name="file"
            accept="video/mp4,video/webm,video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            required={!previewUrl} // บังคับว่าต้องมีไฟล์ถึงจะ Submit ได้
          />

          <div className="w-full text-left mt-2">
            <p className="text-xs text-slate-500 font-medium">Uploading to</p>
            <p className="text-sm font-semibold truncate">Course ID: {courseId}</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Content (Right Column) - สำหรับกรอกรายละเอียด Lesson */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-white">
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
          
          <header className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10">
            <h1 className="text-2xl font-bold">Lesson Details</h1>
          </header>

          <div className="px-8 pb-12 flex flex-col gap-6 w-full">
            
              {/* Title Input */}
              <div className="relative group w-full">
                <div className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-500 group-focus-within:text-blue-600 z-10">
                  Title (required)
                </div>
                <input 
                  name="title"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none text-sm placeholder:text-transparent"
                  placeholder="Enter lesson title"
                />
              </div>


              <div className="flex justify-end mt-4 pt-6 border-t border-slate-100">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-sm transition-colors"
                >
                  {isSubmitting ? <Loader size={16} className="animate-spin" /> : null}
                  {isSubmitting ? 'Uploading...' : 'Save Lesson'}
                </button>
              </div>

          </div>
        </div>
      </main>
    </Form>
  );
}