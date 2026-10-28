import React from 'react';
import { useStudy } from '../context/StudyContext.tsx';
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Target,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  onNavigateToCode: () => void;
  onNavigateToExams: () => void;
  onNavigateToRoadmaps: () => void;
  onPracticeTopic?: (topic: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  onNavigateToCode,
  onNavigateToExams,
  onNavigateToRoadmaps,
  onPracticeTopic,
}) => {
  const { progress, userLevel, weakAreas, targetExam } = useStudy();

  const totalMockAttempts = progress.mockTestAttempts.length;
  const avgMockAccuracy =
    totalMockAttempts > 0
      ? Math.round(
          progress.mockTestAttempts.reduce((acc, m) => acc + m.accuracy, 0) /
            totalMockAttempts
        )
      : 0;

  // Prepare topic statistics array
  const topicStatsList = Object.entries(progress.topicStats).map(([topic, stat]) => {
    const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    return {
      topic,
      accuracy,
      correct: stat.correct,
      total: stat.total,
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Needs Urgent Practice':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'Review Recommended':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      default:
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: User Level & XP */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Skill Level</span>
            <span className="font-bold text-indigo-400 font-mono">Level {userLevel.level}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white truncate">{userLevel.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              <span className="text-white font-semibold tabular-nums">{progress.xp}</span> Total XP
            </p>
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${userLevel.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{userLevel.currentLevelXp} XP</span>
              <span>Next: {userLevel.nextLevelXp} XP</span>
            </div>
          </div>
        </div>

        {/* Card 2: Streak & Activity */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Study Consistency</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white tabular-nums flex items-baseline gap-1.5">
              <span>{progress.streak}</span>
              <span className="text-xs font-normal text-slate-400">days streak</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Active today · Goal: 2h/day</p>
          </div>
          <div className="flex items-center gap-1 pt-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div
                key={idx}
                className={`flex-1 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                  idx < progress.streak % 7 || idx === 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Problems Solved */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Coding Challenges</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white tabular-nums flex items-baseline gap-1.5">
              <span>{progress.solvedProblemIds.length}</span>
              <span className="text-xs font-normal text-slate-400">completed</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Tested across JavaScript & Python</p>
          </div>
          <div className="pt-2">
            <button
              onClick={onNavigateToCode}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Solve more challenges</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Mock Test Performance */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Exam Diagnostics</span>
            <Award className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white tabular-nums flex items-baseline gap-1.5">
              <span>{avgMockAccuracy}%</span>
              <span className="text-xs font-normal text-slate-400">avg accuracy</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {totalMockAttempts} timed mock tests submitted
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onNavigateToExams}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Take new mock test</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* WEAK AREA DIAGNOSTICS SECTION (Core User Request) */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Personalized Weak Area Diagnosis & Remediation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Algorithmic detector identifying topics with below 70% accuracy across tests and practice.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            <span className="font-bold text-amber-400 tabular-nums">{weakAreas.length}</span> Topics Flagged
          </span>
        </div>

        {weakAreas.length === 0 ? (
          <div className="p-6 bg-slate-900/60 rounded-xl text-center space-y-2 border border-slate-800">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">All Tested Topics Above Mastery Threshold!</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your accuracy is holding strong across all tested modules. Take a full-length mock test to challenge yourself further.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weakAreas.map((area, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-xl border border-slate-800 p-4 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getStatusColor(area.status)}`}>
                      {area.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-400 tabular-nums">
                      {area.accuracyRate}% Accuracy
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{area.topic}</h4>
                  <p className="text-xs text-slate-400">
                    Failed {area.totalAttempts - Math.round((area.accuracyRate * area.totalAttempts) / 100)} of {area.totalAttempts} attempted questions.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={onNavigateToRoadmaps}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Watch Lectures</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onPracticeTopic) {
                        onPracticeTopic(area.topic);
                      } else {
                        onNavigateToCode();
                      }
                    }}
                    className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg font-semibold transition-colors shadow-sm"
                  >
                    Practice Topic
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOPIC MASTERY BREAKDOWN */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>Curriculum Mastery & Question Accuracy Index</span>
        </h3>

        <div className="space-y-3">
          {topicStatsList.map((stat, i) => (
            <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{stat.topic}</span>
                <span className="font-mono tabular-nums text-slate-300">
                  <span className={stat.accuracy < 60 ? 'text-rose-400 font-bold' : stat.accuracy < 75 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {stat.accuracy}%
                  </span>{' '}
                  ({stat.correct}/{stat.total})
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    stat.accuracy < 60
                      ? 'bg-rose-500'
                      : stat.accuracy < 75
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${stat.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
