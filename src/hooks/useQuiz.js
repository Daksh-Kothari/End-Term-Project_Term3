import { useState, useCallback } from 'react';
import { generateQuiz, scoreQuiz } from '../utils/quizEngine';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { useAuth } from './useAuth';

/**
 * Custom hook for AI quiz generation, taking, and history
 */
export function useQuiz() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [quizStats, setQuizStats] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [generating, setGenerating] = useState(false);

  const generate = useCallback(async (text, maxQuestions = 10) => {
    setGenerating(true);
    // Simulate processing delay for UX
    await new Promise((r) => setTimeout(r, 1200));

    const { questions: generated, stats } = generateQuiz(text, maxQuestions);
    setQuestions(generated);
    setQuizStats(stats);
    setCurrentIndex(0);
    setAnswers({});
    setResults(null);
    setGenerating(false);

    return { questions: generated, stats };
  }, []);

  const answerQuestion = useCallback((questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const prevQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const submitQuiz = useCallback(() => {
    const answered = questions.map((q) => ({
      ...q,
      userAnswer: answers[q.id] || '',
    }));

    const scored = scoreQuiz(answered);
    setResults(scored);

    // Save to history
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
    history.unshift({
      id: generateId(),
      userId: user?.uid,
      title: `Quiz - ${new Date().toLocaleDateString()}`,
      score: scored.score,
      total: scored.total,
      percentage: scored.percentage,
      questionsCount: questions.length,
      completedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(history));

    return scored;
  }, [questions, answers, user]);

  const getHistory = useCallback(() => {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
    return history.filter((q) => q.userId === user?.uid);
  }, [user]);

  const reset = useCallback(() => {
    setQuestions([]);
    setQuizStats(null);
    setCurrentIndex(0);
    setAnswers({});
    setResults(null);
  }, []);

  return {
    questions,
    quizStats,
    currentIndex,
    currentQuestion: questions[currentIndex] || null,
    answers,
    results,
    generating,
    generate,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    getHistory,
    reset,
    isComplete: Object.keys(answers).length === questions.length && questions.length > 0,
  };
}
