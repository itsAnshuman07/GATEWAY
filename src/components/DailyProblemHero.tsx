import React from 'react';
import { CodingProblem } from '../types/index.ts';
import { useStudy } from '../context/StudyContext.tsx';
import { CheckCircle2, Code2, ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';

interface DailyProblemHeroProps {
  onSolveProblem: (problem: CodingProblem) => void;
}

export const DailyProblemHero: React.FC<DailyProblemHeroProps> = ({ onSolveProblem }) => {
  const { dailyProblem, isProblemSolved, weakAreas } = useStudy();
  const solved = isProblemSolved(dailyProblem.id);

  // Check if this problem directly matches one of the user's weak areas
  const matchingWeakArea = weakAreas.find(
    (w) =>
      dailyProblem.category.toLowerCase().includes(w.topic.toLowerCase()) ||
      dailyProblem.tags.some((t) => t.toLowerCase().includes(w.topic.toLowerCase()))
  );

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400';
      case 'Intermediate':
        return 'text-amber-400';
      case 'Advanced':
      case 'Hard':
        return 'text-rose-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 sm:p-7 relative overflow-hidden backdrop-blur-sm">
      {/* Background ambient subtle accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          {/* Recommendation rationale tag */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="flex items-center gap-1 text-indigo-400">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Daily Personalized Challenge</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            {matchingWeakArea ? (
              <span className="text-amber-300">
                Addresses Weak Area: {matchingWeakArea.topic} ({matchingWeakArea.accuracyRate}% accuracy)
              </span>
            ) : (
              <span className="text-slate-400">Calibrated to your progress & streak</span>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>{dailyProblem.title}</span>
              {solved && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Solved Today</span>
                </span>
              )}
            </h2>
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {dailyProblem.description}
            </p>
          </div>

          {/* Clean unboxed metadata per Zero-Pill discipline */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
            <span className={`font-semibold ${getDifficultyColor(dailyProblem.difficulty)}`}>
              {dailyProblem.difficulty}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{dailyProblem.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Acceptance: <span className="text-slate-300 tabular-nums">{dailyProblem.acceptanceRate}%</span></span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Reward: <span className="text-indigo-400 font-semibold tabular-nums">+{dailyProblem.xpReward} XP</span></span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSolveProblem(dailyProblem)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <Code2 className="w-4 h-4" />
            <span>{solved ? 'Review Solution' : 'Solve in Code Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
