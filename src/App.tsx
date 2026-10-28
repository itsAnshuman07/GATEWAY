import React, { useState } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { DailyProblemHero } from './components/DailyProblemHero.tsx';
import { CodingWorkspace } from './components/CodingWorkspace.tsx';
import { ExamPortal } from './components/ExamPortal.tsx';
import { RoadmapsView } from './components/RoadmapsView.tsx';
import { AnalyticsDashboard } from './components/AnalyticsDashboard.tsx';
import { LeaderboardView } from './components/LeaderboardView.tsx';
import { CodingProblem } from './types/index.ts';
import { CODING_PROBLEMS } from './data/codingProblems.ts';
import {
  BookOpen,
  Terminal,
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'code' | 'exams' | 'roadmaps' | 'leaderboard'>('dashboard');
  const [selectedCodingProblemId, setSelectedCodingProblemId] = useState<string | undefined>(undefined);
  const [selectedExamMockId, setSelectedExamMockId] = useState<string | undefined>(undefined);

  const { resetProgress } = useStudy();

  const handleSolveDailyProblem = (problem: CodingProblem) => {
    setSelectedCodingProblemId(problem.id);
    setActiveTab('code');
  };

  const handleOpenExamMock = (testId: string) => {
    setSelectedExamMockId(testId);
    setActiveTab('exams');
  };

  const handlePracticeTopic = (topic: string) => {
    const matchingCodeProblem = CODING_PROBLEMS.find(
      (p) =>
        p.category.toLowerCase().includes(topic.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(topic.toLowerCase()))
    );
    if (matchingCodeProblem) {
      setSelectedCodingProblemId(matchingCodeProblem.id);
      setActiveTab('code');
    } else {
      setActiveTab('exams');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* 3-Zone Standard Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExam={handleOpenExamMock}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Daily Personalized Coding Challenge Banner */}
            <DailyProblemHero onSolveProblem={handleSolveDailyProblem} />

            {/* Quick Action Hub */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('code')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/70 text-left transition-all group flex items-start justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center font-bold">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Daily Coding Practice
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Personalized algorithmic challenges across Beginner to Hard with live test case runner.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </button>

              <button
                onClick={() => setActiveTab('exams')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/70 text-left transition-all group flex items-start justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    GATE & NTPC Mock Tests
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Official timed mock tests with negative marking, question palette, and detailed explanations.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </button>

              <button
                onClick={() => setActiveTab('roadmaps')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/70 text-left transition-all group flex items-start justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-violet-950 border border-violet-800 text-violet-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Roadmaps & Free Books
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Topic-wise video lectures from top faculty, standard textbooks (CLRS, OSTEP), and question banks.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </button>
            </div>

            {/* Comprehensive Weak Area Diagnostics & Performance Tracker */}
            <AnalyticsDashboard
              onNavigateToCode={() => setActiveTab('code')}
              onNavigateToExams={() => setActiveTab('exams')}
              onNavigateToRoadmaps={() => setActiveTab('roadmaps')}
              onPracticeTopic={handlePracticeTopic}
            />
          </div>
        )}

        {/* CODE STUDIO TAB */}
        {activeTab === 'code' && (
          <CodingWorkspace initialProblemId={selectedCodingProblemId} />
        )}

        {/* EXAM PORTAL TAB */}
        {activeTab === 'exams' && (
          <ExamPortal
            initialTestId={selectedExamMockId}
            onNavigateToRoadmaps={() => setActiveTab('roadmaps')}
          />
        )}

        {/* ROADMAPS & FREE BOOKS TAB */}
        {activeTab === 'roadmaps' && (
          <RoadmapsView
            onStartPracticeQuestion={(topic) => {
              setActiveTab('exams');
            }}
          />
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && <LeaderboardView />}
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">CodeMaster & ExamPrep Study Hub</span>
            <span aria-hidden="true">·</span>
            <span>Structured learning for Software Engineering, GATE CS & NTPC PSU Recruitment</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (confirm('Reset your study plan progress to default seed state?')) {
                  resetProgress();
                }
              }}
              className="hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Progress</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <StudyProvider>
      <MainApp />
    </StudyProvider>
  );
}
