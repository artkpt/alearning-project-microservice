import { X, Save, PenLine, FileText, Loader2, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { useFetcher } from 'react-router';

interface NotePanelProps {
  mode: 'create' | 'view';
  onClose: () => void;
  lessonId: number
}

export function NotePanel({ mode, onClose, lessonId }: NotePanelProps) {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === 'submitting'
    const notes = fetcher.data

    useEffect(() => {
    if (mode === 'view' && fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load(`/api/lessons/1/notes`);
    }
  }, [mode, lessonId, fetcher]);

    return (
    <div className="h-72 bg-white border-t border-slate-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] flex flex-col shrink-0 z-20 animate-in slide-in-from-bottom-5">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 px-6 border-b">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          {mode === 'create' ? <PenLine size={18} className="text-blue-600"/> : <FileText size={18} className="text-blue-600"/>}
          {mode === 'create' ? 'Create New Note' : 'My Notes'}
        </h3>
        <button 
          onClick={onClose} 
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-md transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Panel Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
        {mode === 'create' ? (
            <fetcher.Form 
            method="post" 
            className="flex flex-col h-full gap-4 max-w-5xl mx-auto"
          >
            {lessonId && <input type="hidden" name="lessonId" value={lessonId} />}
            
            <textarea 
              name="content" 
              required
              disabled={isSubmitting}
              className="w-full flex-1 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm shadow-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
              placeholder="Type your notes for this lesson here..."
              autoFocus
            ></textarea>
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
          </fetcher.Form>
        ) : notes && notes.length > 0 ? (
              <div className="flex flex-col gap-3">
                {notes.map((note) => (
                  <div key={note.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2">
                    <p className="text-slate-700 text-sm whitespace-pre-wrap">{note.content}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                      <Calendar size={12} />
                      <span>{new Date(note.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
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
  );
}