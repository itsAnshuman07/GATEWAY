import React from 'react';
import { useStudy } from '../context/StudyContext.tsx';
import { ExamType } from '../types/index.ts';
import { Flame, Award, BookOpen, Terminal, CheckCircle2, Trophy, BarChart3 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'code' | 'exams' | 'roadmaps' | 'leaderboard';
  setActiveTab: (tab: 'dashboard' | 'code' | 'exams' | 'roadmaps' | 'leaderboard') => void;
  onOpenExam?: (testId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { progress, setTargetExam, targetExam, userLevel } = useStudy();

  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetExam(e.target.value as ExamType);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single element Brand Wordmark */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-indigo-400 transition-colors focus:outline-none"
            aria-label="CodeMaster Study Hub Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm">
              <Terminal className="w-4 h-4" />
            </div>
            <span>CodeMaster <span className="text-indigo-400 font-semibold text-sm">StudyHub</span></span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeTab === 'dashboard'
                  ? 'text-white border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeTab === 'code'
                  ? 'text-white border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Daily Challenges
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeTab === 'exams'
                  ? 'text-white border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              GATE & NTPC Mocks
            </button>
            <button
              onClick={() => setActiveTab('roadmaps')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeTab === 'roadmaps'
                  ? 'text-white border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Roadmaps & Books
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activeTab === 'leaderboard'
                  ? 'text-white border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Peer Leaderboard
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action & Target Selector */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Streak & XP counters */}
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 border-r border-slate-800 pr-3">
              <div className="flex items-center gap-1 text-amber-400" title="Daily Study Streak">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="font-semibold tabular-nums text-white">{progress.streak}d streak</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1 text-indigo-300" title="Total XP">
                <Award className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold tabular-nums text-white">{progress.xp} XP</span>
              </div>
            </div>

            {/* Target Exam Switcher */}
            <label htmlFor="target-exam-select" className="sr-only">Select Target Exam</label>
            <select
              id="target-exam-select"
              value={targetExam}
              onChange={handleExamChange}
              className="bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="GATE_CS">Target: GATE CS</option>
              <option value="NTPC_EXAM">Target: NTPC Executive</option>
              <option value="CODING_DSA">Target: DSA & Tech Roles</option>
            </select>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 text-xs text-slate-400 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'dashboard' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'code' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Practice
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'exams' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Mocks
          </button>
          <button
            onClick={() => setActiveTab('roadmaps')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'roadmaps' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Roadmaps
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'leaderboard' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Rankings
          </button>
        </div>
      </div>
    </header>
  );
};
