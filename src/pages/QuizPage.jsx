import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import QuizGenerator from '../components/quiz/QuizGenerator';
import QuizCard from '../components/quiz/QuizCard';
import QuizResults from '../components/quiz/QuizResults';
import QuizHistory from '../components/quiz/QuizHistory';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useQuiz } from '../hooks/useQuiz';

export default function QuizPage() {
  const {
    questions, quizStats, currentIndex, currentQuestion, answers, results, generating,
    generate, answerQuestion, nextQuestion, prevQuestion, submitQuiz, getHistory, reset, isComplete,
  } = useQuiz();

  const [phase, setPhase] = useState('generate'); // 'generate' | 'quiz' | 'results'

  const handleGenerate = useCallback(async (text, maxQ) => {
    const { questions: q } = await generate(text, maxQ);
    if (q.length > 0) setPhase('quiz');
  }, [generate]);

  const handleSubmit = useCallback(() => {
    submitQuiz();
    setPhase('results');
  }, [submitQuiz]);

  const handleRetry = useCallback(() => {
    setPhase('quiz');
    // Reset answers but keep questions
  }, []);

  const handleNewQuiz = useCallback(() => {
    reset();
    setPhase('generate');
  }, [reset]);

  const history = getHistory();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">AI Quiz Generator</h1>
        <p className="text-surface-500 text-sm mt-1">Generate practice quizzes from your study notes using AI</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Generate Phase */}
          {phase === 'generate' && (
            <>
              <QuizGenerator onGenerate={handleGenerate} generating={generating} />
              {generating && <LoadingSpinner text="Analyzing your notes and generating questions..." />}
            </>
          )}

          {/* Quiz Phase */}
          {phase === 'quiz' && currentQuestion && (
            <div className="space-y-4">
              {/* Quiz stats bar */}
              {quizStats && (
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">{quizStats.fillBlank} Fill-in-blank</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">{quizStats.trueFalse} True/False</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">{quizStats.mcq} Multiple Choice</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                <QuizCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onAnswer={answerQuestion}
                  questionNumber={currentIndex + 1}
                  total={questions.length}
                />
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={prevQuestion} disabled={currentIndex === 0} icon={HiOutlineArrowLeft}>
                  Previous
                </Button>

                {currentIndex === questions.length - 1 ? (
                  <Button onClick={handleSubmit} disabled={!isComplete} variant={isComplete ? 'primary' : 'secondary'}>
                    Submit Quiz ({Object.keys(answers).length}/{questions.length})
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} icon={HiOutlineArrowRight} iconPosition="right">
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Results Phase */}
          {phase === 'results' && (
            <QuizResults results={results} onRetry={handleRetry} onNewQuiz={handleNewQuiz} />
          )}
        </div>

        {/* Sidebar - History */}
        <div>
          <QuizHistory history={history} />
        </div>
      </div>
    </div>
  );
}
