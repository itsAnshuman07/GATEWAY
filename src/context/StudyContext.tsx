import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  CodingProblem,
  ExamType,
  MockTestAttempt,
  UserProgress,
  WeakAreaItem,
} from '../types/index.ts';
import { CODING_PROBLEMS } from '../data/codingProblems.ts';
import {
  calculateXPAndLevel,
  identifyWeakAreas,
  recommendDailyProblem,
} from '../utils/studyEngine.ts';

interface StudyContextType {
  progress: UserProgress;
  targetExam: ExamType;
  setTargetExam: (exam: ExamType) => void;
  userLevel: ReturnType<typeof calculateXPAndLevel>;
  weakAreas: WeakAreaItem[];
  dailyProblem: CodingProblem;
  isProblemSolved: (problemId: string) => boolean;
  markProblemSolved: (problemId: string, customXp?: number) => void;
  recordMockTestAttempt: (attempt: MockTestAttempt) => void;
  toggleTopicCompletion: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  toggleBookmark: (resourceId: string) => void;
  isBookmarked: (resourceId: string) => boolean;
  resetProgress: () => void;
}

const STORAGE_KEY = 'codemaster_study_progress_v2';

const DEFAULT_INITIAL_PROGRESS: UserProgress = {
  userId: 'user-default',
  name: 'Pradip (You)',
  targetExam: 'GATE_CS',
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 450,
  solvedProblemIds: ['prob-1'],
  mockTestAttempts: [
    {
      id: 'initial-att-1',
      testId: 'mock-gate-algo-os',
      testTitle: 'GATE CS Systems & Algorithms Mastery Sprint',
      exam: 'GATE_CS',
      timestamp: Date.now() - 86400000 * 2,
      score: 4.34,
      totalMarks: 6,
      accuracy: 75,
      timeSpentSeconds: 480,
      answers: { 'gate-cs-1': 1, 'gate-cs-2': 0 },
      topicBreakdown: {
        'Divide & Conquer': { correct: 1, total: 1 },
        'Virtual Memory & Paging': { correct: 1, total: 1 },
        'Process Synchronization & Semaphores': { correct: 0, total: 2 },
      },
    },
  ],
  completedTopicIds: ['topic-dsa-1'],
  bookmarkedResourceIds: ['topic-gate-os'],
  topicStats: {
    'Arrays & Hashing': { correct: 8, total: 9 },
    'Stack': { correct: 5, total: 6 },
    'Divide & Conquer': { correct: 4, total: 5 },
    'Process Synchronization & Semaphores': { correct: 1, total: 4 }, // 25% weak
    'Virtual Memory & Paging': { correct: 2, total: 5 }, // 40% weak
    'Dynamic Programming': { correct: 2, total: 6 }, // 33% weak
    'Indian Power Sector & Thermal Energy': { correct: 3, total: 4 },
  },
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback to initial
    }
    return DEFAULT_INITIAL_PROGRESS;
  });

  // Save progress updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage full or disabled
    }
  }, [progress]);

  // Compute User Level & XP
  const userLevel = useMemo(() => {
    return calculateXPAndLevel(progress.xp);
  }, [progress.xp]);

  // Compute Weak Areas
  const weakAreas = useMemo(() => {
    return identifyWeakAreas(progress.topicStats, 2);
  }, [progress.topicStats]);

  // Compute Daily Recommended Coding Problem
  const dailyProblem = useMemo(() => {
    const weakTopicNames = weakAreas.map((w) => w.topic);
    return recommendDailyProblem(CODING_PROBLEMS, progress.solvedProblemIds, weakTopicNames);
  }, [progress.solvedProblemIds, weakAreas]);

  const targetExam = progress.targetExam;

  const setTargetExam = (exam: ExamType) => {
    setProgress((prev) => ({ ...prev, targetExam: exam }));
  };

  const isProblemSolved = (problemId: string) => {
    return progress.solvedProblemIds.includes(problemId);
  };

  const markProblemSolved = (problemId: string, customXp?: number) => {
    setProgress((prev) => {
      const alreadySolved = prev.solvedProblemIds.includes(problemId);
      const problem = CODING_PROBLEMS.find((p) => p.id === problemId);
      const xpEarned = customXp ?? (problem?.xpReward || 50);

      // Category / topic stats update
      const newTopicStats = { ...prev.topicStats };
      if (problem) {
        const cat = problem.category;
        const current = newTopicStats[cat] || { correct: 0, total: 0 };
        newTopicStats[cat] = {
          correct: current.correct + 1,
          total: current.total + 1,
        };
      }

      if (alreadySolved) {
        return {
          ...prev,
          topicStats: newTopicStats,
        };
      }

      return {
        ...prev,
        solvedProblemIds: [...prev.solvedProblemIds, problemId],
        xp: prev.xp + xpEarned,
        streak: prev.streak + 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        topicStats: newTopicStats,
      };
    });
  };

  const recordMockTestAttempt = (attempt: MockTestAttempt) => {
    setProgress((prev) => {
      const updatedTopicStats = { ...prev.topicStats };
      for (const [topic, stat] of Object.entries(attempt.topicBreakdown)) {
        const current = updatedTopicStats[topic] || { correct: 0, total: 0 };
        updatedTopicStats[topic] = {
          correct: current.correct + stat.correct,
          total: current.total + stat.total,
        };
      }

      const earnedXp = Math.max(50, Math.round(attempt.score * 30));

      return {
        ...prev,
        xp: prev.xp + earnedXp,
        streak: prev.streak + 1,
        mockTestAttempts: [attempt, ...prev.mockTestAttempts],
        topicStats: updatedTopicStats,
      };
    });
  };

  const toggleTopicCompletion = (topicId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedTopicIds.includes(topicId);
      return {
        ...prev,
        completedTopicIds: isCompleted
          ? prev.completedTopicIds.filter((id) => id !== topicId)
          : [...prev.completedTopicIds, topicId],
        xp: isCompleted ? prev.xp : prev.xp + 40,
      };
    });
  };

  const isTopicCompleted = (topicId: string) => {
    return progress.completedTopicIds.includes(topicId);
  };

  const toggleBookmark = (resourceId: string) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedResourceIds.includes(resourceId);
      return {
        ...prev,
        bookmarkedResourceIds: isBookmarked
          ? prev.bookmarkedResourceIds.filter((id) => id !== resourceId)
          : [...prev.bookmarkedResourceIds, resourceId],
      };
    });
  };

  const isBookmarked = (resourceId: string) => {
    return progress.bookmarkedResourceIds.includes(resourceId);
  };

  const resetProgress = () => {
    setProgress(DEFAULT_INITIAL_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <StudyContext.Provider
      value={{
        progress,
        targetExam,
        setTargetExam,
        userLevel,
        weakAreas,
        dailyProblem,
        isProblemSolved,
        markProblemSolved,
        recordMockTestAttempt,
        toggleTopicCompletion,
        isTopicCompleted,
        toggleBookmark,
        isBookmarked,
        resetProgress,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
