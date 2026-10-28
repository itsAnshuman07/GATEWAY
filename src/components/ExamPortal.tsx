import React, { useState, useEffect, useId } from 'react';
import { ExamQuestion, MockTest, MockTestAttempt, ExamType } from '../types/index.ts';
import { MOCK_TESTS, EXAM_QUESTIONS } from '../data/examQuestions.ts';
import { useStudy } from '../context/StudyContext.tsx';
import {
  calculateMockTestScore,
  calculatePercentileEstimate,
} from '../utils/studyEngine.ts';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Trophy,
  BookOpen,
  ArrowRight,
  FileSpreadsheet,
  BarChart2,
} from 'lucide-react';

interface ExamPortalProps {
  initialTestId?: string;
  onNavigateToRoadmaps?: () => void;
}

export const ExamPortal: React.FC<ExamPortalProps> = ({ initialTestId, onNavigateToRoadmaps }) => {
  const { recordMockTestAttempt, targetExam } = useStudy();

  const [activeMode, setActiveMode] = useState<'catalog' | 'active_test' | 'scorecard' | 'question_bank'>('catalog');
  const [selectedMock, setSelectedMock] = useState<MockTest>(() => {
    if (initialTestId) {
      const match = MOCK_TESTS.find((m) => m.id === initialTestId);
      if (match) return match;
    }
    return MOCK_TESTS[0];
  });

  // Active Test Execution State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(15 * 60);
  const [testStartTime, setTestStartTime] = useState<number>(Date.now());
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Scorecard State
  const [latestAttempt, setLatestAttempt] = useState<MockTestAttempt | null>(null);

  // Question Bank Filter
  const [bankExamFilter, setBankExamFilter] = useState<ExamType>(targetExam);
  const [bankSubjectFilter, setBankSubjectFilter] = useState<string>('All');

  // Timer interval during test
  useEffect(() => {
    if (activeMode !== 'active_test') return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMode]);

  // Mark current question visited
  useEffect(() => {
    if (activeMode === 'active_test' && selectedMock) {
      const currentQ = selectedMock.questions[currentQuestionIndex];
      if (currentQ) {
        setVisitedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
      }
    }
  }, [currentQuestionIndex, activeMode, selectedMock]);

  const startTest = (test: MockTest) => {
    setSelectedMock(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({ [test.questions[0].id]: true });
    setTimeRemainingSeconds(test.durationMinutes * 60);
    setTestStartTime(Date.now());
    setActiveMode('active_test');
    setShowSubmitModal(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleClearResponse = (questionId: string) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitTest = (forceAutoSubmit = false) => {
    if (!selectedMock) return;

    const timeSpent = Math.max(10, Math.floor((Date.now() - testStartTime) / 1000));
    const scoreResult = calculateMockTestScore(selectedMock.questions, userAnswers);

    const attempt: MockTestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: selectedMock.id,
      testTitle: selectedMock.title,
      exam: selectedMock.exam,
      timestamp: Date.now(),
      score: scoreResult.score,
      totalMarks: scoreResult.totalMarks,
      accuracy: scoreResult.accuracy,
      timeSpentSeconds: timeSpent,
      answers: userAnswers,
      topicBreakdown: scoreResult.topicBreakdown,
    };

    recordMockTestAttempt(attempt);
    setLatestAttempt(attempt);
    setShowSubmitModal(false);
    setActiveMode('scorecard');
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Question bank list
  const filteredBankQuestions = EXAM_QUESTIONS.filter((q) => {
    const matchExam = q.exam === bankExamFilter;
    const matchSubject = bankSubjectFilter === 'All' || q.subject === bankSubjectFilter;
    return matchExam && matchSubject;
  });

  const availableBankSubjects = Array.from(
    new Set(EXAM_QUESTIONS.filter((q) => q.exam === bankExamFilter).map((q) => q.subject))
  );

  return (
    <div className="space-y-6">
      {/* Top Navigation Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMode('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'catalog'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Mock Tests Directory
          </button>
          <button
            onClick={() => setActiveMode('question_bank')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'question_bank'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Specialized Question Banks
          </button>
          {latestAttempt && (
            <button
              onClick={() => setActiveMode('scorecard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeMode === 'scorecard'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              Latest Scorecard
            </button>
          )}
        </div>

        {activeMode === 'active_test' && (
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono font-bold tabular-nums ${
                timeRemainingSeconds < 180
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800 animate-pulse'
                  : 'bg-slate-900 text-amber-400 border border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Time Remaining: {formatTimer(timeRemainingSeconds)}</span>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              Submit Test
            </button>
          </div>
        )}
      </div>

      {/* MODE 1: Catalog of Available Mock Tests */}
      {activeMode === 'catalog' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              GATE & NTPC Official Pattern Mock Tests
            </h2>
            <p className="text-xs text-slate-400">
              Simulated exam experience featuring official negative marking rules, timer, and detailed weak area diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_TESTS.map((test) => {
              const isGate = test.exam === 'GATE_CS';
              return (
                <div
                  key={test.id}
                  className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 flex flex-col justify-between hover:border-slate-600 transition-all shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-indigo-400">
                        {isGate ? 'GATE CS & IT' : 'NTPC Executive Trainee'}
                      </span>
                      <span className="tabular-nums">{test.durationMinutes} mins</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {test.description}
                    </p>

                    {/* Unboxed clean metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-700/60">
                      <span className="text-slate-200 tabular-nums">{test.totalQuestions} Questions</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-200 tabular-nums">{test.totalMarks} Marks</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-rose-400">{isGate ? '-0.33 / -0.66' : '-0.25 Neg'}</span>
                    </div>
                  </div>

                  <div className="pt-5">
                    <button
                      onClick={() => startTest(test)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Start Timed Mock</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: Active Timed Examination */}
      {activeMode === 'active_test' && selectedMock && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Display (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-700/90 p-6 space-y-6">
            {(() => {
              const q = selectedMock.questions[currentQuestionIndex];
              const selectedOption = userAnswers[q.id];
              const isMarked = markedForReview[q.id];

              return (
                <div className="space-y-6">
                  {/* Question Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="font-bold text-white text-sm">Question {currentQuestionIndex + 1}</span>
                      <span>of {selectedMock.questions.length}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-indigo-400">{q.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{q.topic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-semibold tabular-nums">+{q.marks}</span>
                      <span className="text-rose-400 font-semibold tabular-nums">-{q.negativeMarks}</span>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="text-sm text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                    {q.question}
                  </div>

                  {/* Options List */}
                  <div className="space-y-3 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOption === optIdx;
                      const optLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
                            isChosen
                              ? 'bg-indigo-950/70 border-indigo-500 text-white font-medium'
                              : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-700/60'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                              isChosen
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {optLabel}
                          </span>
                          <span className="pt-0.5 leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation & Question Action Controls */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleReview(q.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                          isMarked
                            ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                      </button>

                      {selectedOption !== undefined && (
                        <button
                          onClick={() => handleClearResponse(q.id)}
                          className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-40 flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>

                      {currentQuestionIndex < selectedMock.questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>Save & Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowSubmitModal(true)}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>Complete & Submit</span>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Question Palette Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Question Palette</h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-600" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-700" />
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border border-slate-600" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Question buttons matrix */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {selectedMock.questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isVisited = visitedQuestions[q.id];

                let btnBg = 'bg-slate-900 border-slate-700 text-slate-400';
                if (isMarked) {
                  btnBg = 'bg-amber-600 text-white font-bold border-amber-500';
                } else if (isAnswered) {
                  btnBg = 'bg-emerald-600 text-white font-bold border-emerald-500';
                } else if (isVisited) {
                  btnBg = 'bg-slate-700 text-slate-200 border-slate-600';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-mono border transition-all ${btnBg} ${
                      isCurrent ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-2">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Submit Mock Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmitModal && selectedMock && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Submit Mock Examination?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have answered{' '}
              <span className="font-bold text-white tabular-nums">
                {Object.keys(userAnswers).length}
              </span>{' '}
              of <span className="font-bold text-white tabular-nums">{selectedMock.questions.length}</span> questions.
              Time remaining: <span className="font-mono text-amber-400">{formatTimer(timeRemainingSeconds)}</span>.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={() => handleSubmitTest(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: Scorecard & Detailed Solutions */}
      {activeMode === 'scorecard' && latestAttempt && selectedMock && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 sm:p-7 relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Your Score</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {latestAttempt.score} <span className="text-sm font-normal text-slate-400">/ {latestAttempt.totalMarks}</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">Official negative marking applied</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Accuracy</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tabular-nums">
                  {latestAttempt.accuracy}%
                </div>
                <span className="text-xs text-slate-400">Correct answers / Attempted</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Est. Percentile</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
                  {calculatePercentileEstimate(latestAttempt.score, latestAttempt.totalMarks)}%ile
                </div>
                <span className="text-xs text-slate-400">Benchmark comparison</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Time Spent</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-200 tabular-nums">
                  {Math.floor(latestAttempt.timeSpentSeconds / 60)}m {latestAttempt.timeSpentSeconds % 60}s
                </div>
                <span className="text-xs text-slate-400">Paced completion</span>
              </div>
            </div>
          </div>

          {/* Topic Performance Breakdown (Identifies Weak Areas from this test) */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              <span>Section & Topic Mastery Analysis</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(latestAttempt.topicBreakdown).map(([topic, stat]) => {
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                const isWeak = pct < 60;
                return (
                  <div key={topic} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{topic}</span>
                      <span className={`font-mono font-bold ${isWeak ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {pct}% ({stat.correct}/{stat.total})
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isWeak ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {isWeak && (
                      <div className="text-[11px] text-amber-300 flex items-center justify-between pt-1">
                        <span>Flagged as Weak Area for revision</span>
                        {onNavigateToRoadmaps && (
                          <button
                            onClick={onNavigateToRoadmaps}
                            className="underline hover:text-white"
                          >
                            Watch Lectures
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question-by-Question Solution Explanations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Detailed Solutions & Step-by-Step Explanations</h3>
            {selectedMock.questions.map((q, idx) => {
              const userChosen = latestAttempt.answers[q.id];
              const isCorrect = userChosen === q.correctOptionIndex;
              const isUnattempted = userChosen === undefined;

              return (
                <div
                  key={q.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Question {idx + 1}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        isCorrect
                          ? 'bg-emerald-950 text-emerald-300'
                          : isUnattempted
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-rose-950 text-rose-300'
                      }`}
                    >
                      {isCorrect ? 'Correct (+Marks)' : isUnattempted ? 'Unattempted (0)' : 'Incorrect (-Negative Marks)'}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 font-medium whitespace-pre-line">{q.question}</p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctOptionIndex;
                      const isOptionChosen = userChosen === optIdx;

                      let optClass = 'bg-slate-950 border-slate-800 text-slate-300';
                      if (isOptionCorrect) {
                        optClass = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-semibold';
                      } else if (isOptionChosen && !isOptionCorrect) {
                        optClass = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                      }

                      return (
                        <div key={optIdx} className={`p-2.5 rounded-lg border flex items-center justify-between ${optClass}`}>
                          <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                          {isOptionCorrect && <span className="text-[10px] text-emerald-400 font-bold">Official Answer</span>}
                          {isOptionChosen && !isOptionCorrect && <span className="text-[10px] text-rose-400 font-bold">Your Response</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-slate-300 space-y-1">
                    <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px]">Explanation & Formula</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setActiveMode('catalog')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Back to Mock Tests Directory
            </button>
          </div>
        </div>
      )}

      {/* MODE 4: Specialized Question Bank Explorer */}
      {activeMode === 'question_bank' && (
        <div className="space-y-5">
          {/* Filters */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Exam:</span>
              <button
                onClick={() => {
                  setBankExamFilter('GATE_CS');
                  setBankSubjectFilter('All');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  bankExamFilter === 'GATE_CS' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                GATE CS & IT
              </button>
              <button
                onClick={() => {
                  setBankExamFilter('NTPC_EXAM');
                  setBankSubjectFilter('All');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  bankExamFilter === 'NTPC_EXAM' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                NTPC Exam
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Subject:</span>
              <select
                value={bankSubjectFilter}
                onChange={(e) => setBankSubjectFilter(e.target.value)}
                className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="All">All Subjects ({availableBankSubjects.length})</option>
                {availableBankSubjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredBankQuestions.map((q, idx) => (
              <div key={q.id} className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">#{idx + 1}</span>
                    <span className="text-indigo-400 font-medium">{q.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.topic}</span>
                    {q.year && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-300 font-mono">{q.year}</span>
                      </>
                    )}
                  </div>
                  <span className="text-slate-300 tabular-nums">+{q.marks} Marks</span>
                </div>

                <p className="text-sm text-slate-100 font-medium leading-relaxed">{q.question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-lg border text-xs ${
                        oIdx === q.correctOptionIndex
                          ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-semibold">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-300">
                  <span className="font-bold text-indigo-400 text-[10px] uppercase">Solution Details</span>
                  <p className="mt-1 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
