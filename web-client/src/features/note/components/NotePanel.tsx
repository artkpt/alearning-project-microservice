import { X, Save, PenLine, FileText, Loader2, Calendar } from 'lucide-react';
import { useEffect, useState, type SyntheticEvent } from 'react';
import { useFetcher } from 'react-router';



export function NotePanel({lesson, course}) {
    const [noteMode, setNoteMode] = useState<'hidden' | 'create' | 'view'>('hidden'); 
    const [localNotes, setLocalNotes] = useState<any[]>([]); 
    const [hasLoaded, setHasLoaded] = useState(false)
    const lessonId = lesson.id

    const loadFetcher = useFetcher();
    const submitFetcher = useFetcher();
    const isSubmitting = submitFetcher.state === 'submitting';
    console.log('note panel render')
    console.log("loadFetcher state data",loadFetcher.state, loadFetcher.data)
    console.log("submitFetcher state data",submitFetcher.state, submitFetcher.data)

    useEffect(() => {
      if (noteMode === 'view' && !hasLoaded && loadFetcher.state === 'idle') {
        console.log('load data')
        loadFetcher.load(`/api/lessons/${lessonId}/notes`);
      }
    }, [noteMode, lessonId, hasLoaded, loadFetcher])

    useEffect(() => {
      if (loadFetcher.data && !hasLoaded) {
        console.log('set data')
        setLocalNotes(loadFetcher.data)
        setHasLoaded(true)
      }
    }, [loadFetcher.data, hasLoaded])

    useEffect(() => {
      if (submitFetcher.state === 'idle' && submitFetcher.data?.success) {
        const newNote = submitFetcher.data.note;
        
        if (newNote) {
          setLocalNotes(prevNotes => [newNote, ...prevNotes]); 
        }
        
       
        setNoteMode('view');
      }
    }, [submitFetcher.state, submitFetcher.data])

    function handleSubmit(e: SyntheticEvent){
            console.log('handle submit')
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const noteContent = formData.get("content")
            console.log('form data: ', formData)
            console.log('noteContent: ', noteContent)
    
            const payload = {
                title: `${course.code} - ${course.name} : Lesson ${lessonId}`,
                visibility: "private",
                content: noteContent,
                lesson_id: lessonId,
                description: `This is the note from ${course.code} - ${course.name} : Lesson ${lessonId}`,
                topic_id: []
            }
    
            submitFetcher.submit(payload, {method: "POST", encType: "application/json"})
            
            
        }

    return (
      <div >
        {/* panel control button */}
        <div className='flex'>
          <button 
                    onClick={() => setNoteMode('view')}
                    className="flex items-center gap-2 text-slate-600 font-semibold px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <FileText size={18} /> View notes
          </button>
          <button 
                    onClick={() => setNoteMode('create')}
                    className="flex items-center gap-2 text-blue-600 font-semibold px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <PenLine size={18} /> Save note
          </button>
        </div>
        

        {/* panel content */}
        {noteMode !== 'hidden' && (
          <div className="h-72 bg-white border-t border-slate-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] flex flex-col shrink-0 z-20 animate-in slide-in-from-bottom-5">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {noteMode === 'create' ? <PenLine size={18} className="text-blue-600"/> : <FileText size={18} className="text-blue-600"/>}
                {noteMode === 'create' ? 'Create New Note' : 'My Notes'}
              </h3>
              <button 
                onClick={()=>setNoteMode('hidden')} 
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>
      
            {/* Panel Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
              {noteMode === 'create' ? (
                  <submitFetcher.Form 
                  method="post" 
                  className="flex flex-col h-full gap-4 max-w-5xl mx-auto"
                  onSubmit={handleSubmit}
                  >
                    {lessonId && <input type="hidden" name="lessonId" value={lessonId} />}
                    
                    <textarea 
                      name="content" 
                      required
                      disabled={isSubmitting}
                      className="w-full flex-1 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm shadow-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Type your notes for this lesson here..."
                      autoFocus
                    />
                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-md flex items-center gap-2 font-medium shadow-sm transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Save Note
                          </>
                        )}
                      </button>
                    </div>
                  </submitFetcher.Form>
              ) : localNotes && localNotes.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {localNotes.map((note) => (
                        <div key={note.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2">
                          <p className="text-slate-700 text-sm whitespace-pre-wrap">{note.content}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                            <Calendar size={12} />
                            <span>{new Date(note.createdAt).toString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
                      <FileText size={40} className="opacity-20" />
                      <p className="text-sm">No notes have been saved for this lesson yet.</p>
                    </div>
                  )
              }
            </div>
          </div>
        )}
      </div> 
  );
}