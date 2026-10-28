import React, { useState } from 'react';
import { PEER_LEADERBOARD } from '../data/leaderboardData.ts';
import { useStudy } from '../context/StudyContext.tsx';
import { PeerUser } from '../types/index.ts';
import {
  Trophy,
  Medal,
  Flame,
  Award,
  Search,
  Users,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { progress, userLevel } = useStudy();

  const [activeCategory, setActiveCategory] = useState<'global' | 'weekly' | 'college'>('global');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [cheeredUserIds, setCheeredUserIds] = useState<Record<string, boolean>>({});

  const currentUserPeer: PeerUser = {
    id: progress.userId,
    name: progress.name,
    avatar: 'YOU',
    collegeOrOrg: 'Your Engineering Batch',
    xp: progress.xp,
    rank: 9,
    problemsSolved: progress.solvedProblemIds.length,
    mockTestsTaken: progress.mockTestAttempts.length,
    accuracy: 85.0,
    streakDays: progress.streak,
    badges: [userLevel.title, `${progress.streak}-Day Streak`],
  };

  const handleCheer = (userId: string) => {
    setCheeredUserIds((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const filteredPeers = PEER_LEADERBOARD.filter((peer) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      peer.name.toLowerCase().includes(q) ||
      peer.collegeOrOrg.toLowerCase().includes(q) ||
      peer.badges.some((b) => b.toLowerCase().includes(q))
    );
  });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center font-bold text-xs">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 rounded-full bg-slate-400/20 text-slate-300 border border-slate-400/50 flex items-center justify-center font-bold text-xs">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-600 border border-amber-700/50 flex items-center justify-center font-bold text-xs">
            🥉
          </div>
        );
      default:
        return (
          <span className="font-mono font-bold text-slate-400 text-xs tabular-nums">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Category Selector */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>Community Peer Leaderboard</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Encourage friendly competition, track peer study streaks, and benchmark your rank across colleges.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveCategory('global')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === 'global' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All-Time Global
            </button>
            <button
              onClick={() => setActiveCategory('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === 'weekly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly Sprint
            </button>
            <button
              onClick={() => setActiveCategory('college')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === 'college' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Colleges & Batches
            </button>
          </div>
        </div>

        {/* Current User Standings Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-slate-900 border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
              YOU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{currentUserPeer.name}</h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Rank #{currentUserPeer.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentUserPeer.collegeOrOrg} · {userLevel.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300 font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] font-sans">Total XP</span>
              <span className="text-white font-bold tabular-nums">{progress.xp} XP</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-sans">Solved</span>
              <span className="text-white font-bold tabular-nums">{currentUserPeer.problemsSolved}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-sans">Streak</span>
              <span className="text-amber-400 font-bold tabular-nums">{progress.streak}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search student name, college or institute..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 tabular-nums">
          Showing {filteredPeers.length} peers
        </span>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700/80">
              <tr>
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Student & College</th>
                <th className="py-3 px-4 text-right">Total XP</th>
                <th className="py-3 px-4 text-center">Solved</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-center">Accuracy</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-center">Kudos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredPeers.map((peer) => {
                const isCheered = cheeredUserIds[peer.id];
                return (
                  <tr
                    key={peer.id}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-center font-bold">
                      <div className="flex justify-center">{getRankBadge(peer.rank)}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700 text-slate-200 font-bold flex items-center justify-center text-xs shrink-0">
                          {peer.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{peer.name}</div>
                          <div className="text-[11px] text-slate-400">{peer.collegeOrOrg}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-indigo-300 tabular-nums">
                      {peer.xp.toLocaleString()} XP
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-200 tabular-nums">
                      {peer.problemsSolved}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 font-mono text-amber-400 tabular-nums font-semibold">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{peer.streakDays}d</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-emerald-400 tabular-nums font-semibold">
                      {peer.accuracy}%
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {peer.badges.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 whitespace-nowrap"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleCheer(peer.id)}
                        className={`p-1.5 rounded-lg border text-xs transition-colors ${
                          isCheered
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title="Send friendly peer cheer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
