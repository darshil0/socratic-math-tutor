import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap,
  ChevronRight,
  BookOpen,
  Search,
  ArrowLeft,
  Info,
  Send,
  Loader2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { searchConcepts, Concept } from "./ConceptService";

interface ConceptLibraryProps {
  onClose: () => void;
  onTryProblem: (problem: string) => void;
}

export function ConceptLibrary({ onClose, onTryProblem }: ConceptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  
  // Interactive state
  const [analogyStep, setAnalogyStep] = useState(0);
  const [showConceptHint, setShowConceptHint] = useState(false);
  const [showQuizHint, setShowQuizHint] = useState(false);
  const [quizState, setQuizState] = useState<{ questionIdx: number; selectedOption: number | null; isCorrect: boolean | null }>({
    questionIdx: 0,
    selectedOption: null,
    isCorrect: null
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchConcepts(searchQuery);
      setConcepts(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const resetInteractive = () => {
    setAnalogyStep(0);
    setShowConceptHint(false);
    setShowQuizHint(false);
    setQuizState({ questionIdx: 0, selectedOption: null, isCorrect: null });
  };

  const handleSelectConcept = (concept: Concept) => {
    setSelectedConcept(concept);
    resetInteractive();
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (!selectedConcept) return;
    const currentQuestion = selectedConcept.interactiveQuiz[quizState.questionIdx];
    const isCorrect = optionIdx === currentQuestion.correctIndex;
    setQuizState(prev => ({ ...prev, selectedOption: optionIdx, isCorrect }));
  };

  const nextQuizQuestion = () => {
    setShowQuizHint(false);
    setQuizState(prev => ({
      questionIdx: prev.questionIdx + 1,
      selectedOption: null,
      isCorrect: null
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-[#fcfaf7] z-20 flex flex-col"
    >
      <header className="p-6 border-b border-[#e8e2d9] flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-[#f5f2ed] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-serif text-2xl font-medium text-[#2d2a26]">Concept Library</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {selectedConcept ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-6 pb-12"
          >
            <button 
              onClick={() => setSelectedConcept(null)}
              className="text-sm font-medium text-[#5A5A40] flex items-center gap-1 hover:underline"
            >
              <ArrowLeft size={14} /> Back to results
            </button>
            <div className="bg-white p-8 rounded-3xl border border-[#e8e2d9] shadow-sm">
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-widest">{selectedConcept.category}</span>
              <h3 className="font-serif text-3xl text-[#2d2a26] mt-2 mb-6">{selectedConcept.title}</h3>
              
              <div className="prose prose-stone max-w-none mb-6">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {selectedConcept.content}
                </ReactMarkdown>
              </div>

              {/* Concept Hint Section */}
              <div className="mb-12">
                <button 
                  onClick={() => setShowConceptHint(!showConceptHint)}
                  className="flex items-center gap-2 text-sm font-medium text-[#5A5A40] hover:text-[#4a4a34] transition-colors"
                >
                  <Info size={16} />
                  {showConceptHint ? "Hide Concept Hint" : "Need a hint about this concept?"}
                </button>
                <AnimatePresence>
                  {showConceptHint && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-4 bg-[#f5f2ed] rounded-xl text-sm text-[#5c5751] italic border-l-4 border-[#5A5A40]">
                        {selectedConcept.hint}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive Analogy Section */}
              <div className="mb-12 p-6 bg-[#fcfaf7] rounded-2xl border border-[#e8e2d9]">
                <h4 className="font-serif text-xl text-[#2d2a26] mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#5A5A40]" />
                  Interactive Analogy
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    {selectedConcept.interactiveAnalogy.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full transition-colors ${i <= analogyStep ? "bg-[#5A5A40]" : "bg-[#e8e2d9]"}`}
                      />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={analogyStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="min-h-[120px]"
                    >
                      <h5 className="font-bold text-[#2d2a26] mb-2">{selectedConcept.interactiveAnalogy[analogyStep].title}</h5>
                      <p className="text-[#5c5751] leading-relaxed">{selectedConcept.interactiveAnalogy[analogyStep].description}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex justify-between pt-4">
                    <button 
                      disabled={analogyStep === 0}
                      onClick={() => setAnalogyStep(prev => prev - 1)}
                      className="px-4 py-2 text-sm font-medium text-[#5A5A40] disabled:opacity-30"
                    >
                      Previous
                    </button>
                    <button 
                      disabled={analogyStep === selectedConcept.interactiveAnalogy.length - 1}
                      onClick={() => setAnalogyStep(prev => prev + 1)}
                      className="px-6 py-2 bg-[#5A5A40] text-white rounded-full text-sm font-medium hover:bg-[#4a4a34] transition-all disabled:opacity-30"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Quiz Section */}
              <div className="mb-12 p-6 bg-white rounded-2xl border-2 border-[#f5f2ed]">
                <h4 className="font-serif text-xl text-[#2d2a26] mb-4 flex items-center gap-2">
                  <GraduationCap size={20} className="text-[#5A5A40]" />
                  Check Your Understanding
                </h4>
                {quizState.questionIdx < selectedConcept.interactiveQuiz.length ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-medium text-[#2d2a26]">{selectedConcept.interactiveQuiz[quizState.questionIdx].question}</p>
                      <button 
                        onClick={() => setShowQuizHint(!showQuizHint)}
                        className="flex-shrink-0 p-2 text-[#8c867e] hover:text-[#5A5A40] transition-colors"
                        title="Get a hint"
                      >
                        <Info size={18} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {showQuizHint && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-3 bg-[#f5f2ed] rounded-lg text-xs text-[#5c5751] italic border border-[#e8e2d9]"
                        >
                          <strong>Hint:</strong> {selectedConcept.interactiveQuiz[quizState.questionIdx].hint}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid gap-3">
                      {selectedConcept.interactiveQuiz[quizState.questionIdx].options.map((option, i) => (
                        <button
                          key={i}
                          disabled={quizState.selectedOption !== null}
                          onClick={() => handleQuizAnswer(i)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            quizState.selectedOption === i
                              ? quizState.isCorrect ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
                              : "bg-white border-[#e8e2d9] hover:border-[#5A5A40]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizState.selectedOption !== null && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl ${quizState.isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                      >
                        <p className="text-sm font-bold mb-1">{quizState.isCorrect ? "Correct!" : "Not quite..."}</p>
                        <p className="text-sm">{selectedConcept.interactiveQuiz[quizState.questionIdx].explanation}</p>
                        <button 
                          onClick={nextQuizQuestion}
                          className="mt-4 px-6 py-2 bg-[#5A5A40] text-white rounded-full text-xs font-bold uppercase tracking-widest"
                        >
                          {quizState.questionIdx === selectedConcept.interactiveQuiz.length - 1 ? "Finish Quiz" : "Next Question"}
                        </button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap size={32} />
                    </div>
                    <h5 className="font-serif text-2xl text-[#2d2a26] mb-2">Quiz Complete!</h5>
                    <p className="text-[#5c5751] mb-6">You've mastered the basics of this concept.</p>
                    <button 
                      onClick={() => setQuizState({ questionIdx: 0, selectedOption: null, isCorrect: null })}
                      className="px-6 py-2 border border-[#5A5A40] text-[#5A5A40] rounded-full text-sm font-medium hover:bg-[#f5f2ed] transition-all"
                    >
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>

              {/* Example Problems Section */}
              <div className="mt-12 pt-8 border-t border-[#e8e2d9]">
                <h4 className="font-serif text-xl text-[#2d2a26] mb-4 flex items-center gap-2">
                  <ChevronRight size={20} className="text-[#5A5A40]" />
                  Practice Problems
                </h4>
                <div className="grid gap-4">
                  {selectedConcept.exampleProblems.map((ex, i) => (
                    <div key={i} className="p-5 bg-[#fcfaf7] rounded-2xl border border-[#e8e2d9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h5 className="font-medium text-[#2d2a26] mb-1">{ex.title}</h5>
                        <div className="text-sm text-[#5c5751] font-mono bg-white/50 p-2 rounded border border-[#e8e2d9]/50">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {ex.problem}
                          </ReactMarkdown>
                        </div>
                      </div>
                      <button 
                        onClick={() => onTryProblem(ex.problem)}
                        className="whitespace-nowrap px-4 py-2 bg-[#5A5A40] text-white rounded-full text-sm font-medium hover:bg-[#4a4a34] transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        Try in Chat
                        <Send size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for a concept (e.g., Derivatives, Fractions)..."
                className="w-full pl-12 pr-6 py-4 bg-white border border-[#e8e2d9] rounded-full shadow-sm focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c867e]" size={20} />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#5A5A40] text-white rounded-full font-medium hover:bg-[#4a4a34] transition-all disabled:opacity-50"
              >
                {isSearching ? <Loader2 size={18} className="animate-spin" /> : "Search"}
              </button>
            </div>

            <div className="grid gap-4">
              {concepts.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => handleSelectConcept(concept)}
                  className="text-left p-6 bg-white border border-[#e8e2d9] rounded-2xl hover:border-[#5A5A40] hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#8c867e] uppercase tracking-widest">{concept.category}</span>
                      <h4 className="font-serif text-xl text-[#2d2a26] group-hover:text-[#5A5A40] transition-colors">{concept.title}</h4>
                      <p className="text-sm text-[#5c5751] mt-1 line-clamp-2">{concept.description}</p>
                    </div>
                    <ChevronRight className="text-[#e8e2d9] group-hover:text-[#5A5A40] transition-colors" />
                  </div>
                </button>
              ))}
              {concepts.length === 0 && !isSearching && (
                <div className="text-center py-12 text-[#8c867e]">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Search for a topic to explore our library of mathematical concepts.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
