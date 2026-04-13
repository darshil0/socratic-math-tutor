import { GraduationCap, BookOpen, Trash2 } from "lucide-react";

interface HeaderProps {
  onShowLibrary: () => void;
  onClearSession: () => void;
  canClear: boolean;
}

export function Header({ onShowLibrary, onClearSession, canClear }: HeaderProps) {
  return (
    <header className="p-6 border-b border-[#e8e2d9] flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white shadow-sm">
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-medium text-[#2d2a26]">Socratic Math Tutor</h1>
          <p className="text-xs text-[#8c867e] uppercase tracking-widest font-medium">Patient • Encouraging • Step-by-Step</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {canClear && (
          <button 
            onClick={onClearSession}
            className="p-2 text-[#8c867e] hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Clear Chat History"
          >
            <Trash2 size={18} />
          </button>
        )}
        <button 
          onClick={onShowLibrary}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5A5A40] hover:bg-[#f5f2ed] rounded-full transition-colors"
        >
          <BookOpen size={18} />
          <span className="hidden sm:inline">Concept Library</span>
        </button>
      </div>
    </header>
  );
}
