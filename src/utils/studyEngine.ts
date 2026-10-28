import { CodingProblem, ExamQuestion, WeakAreaItem } from '../types/index.ts';

/**
 * Calculates scores, accuracy, and topic breakdown for a mock test attempt
 */
export function calculateMockTestScore(
  questions: ExamQuestion[],
  answers: Record<string, number>
): {
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number;
  topicBreakdown: Record<string, { correct: number; total: number; attempted: number }>;
} {
  let score = 0;
  let totalMarks = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const topicBreakdown: Record<string, { correct: number; total: number; attempted: number }> = {};

  for (const q of questions) {
    totalMarks += q.marks;
    if (!topicBreakdown[q.topic]) {
      topicBreakdown[q.topic] = { correct: 0, total: 0, attempted: 0 };
    }
    topicBreakdown[q.topic].total += 1;

    const chosenOption = answers[q.id];
    if (chosenOption === undefined || chosenOption === null || chosenOption === -1) {
      unattemptedCount += 1;
    } else {
      topicBreakdown[q.topic].attempted += 1;
      if (chosenOption === q.correctOptionIndex) {
        correctCount += 1;
        score += q.marks;
        topicBreakdown[q.topic].correct += 1;
      } else {
        incorrectCount += 1;
        score -= q.negativeMarks;
      }
    }
  }

  // Bound score below by 0 for display sanity or keep raw negative if desired; standard GATE can be negative
  const cleanScore = Math.max(0, Math.round(score * 100) / 100);
  const attemptedTotal = correctCount + incorrectCount;
  const accuracy = attemptedTotal > 0 ? Math.round((correctCount / attemptedTotal) * 100) : 0;

  return {
    score: cleanScore,
    totalMarks,
    correctCount,
    incorrectCount,
    unattemptedCount,
    accuracy,
    topicBreakdown,
  };
}

/**
 * Identifies weak areas based on cumulative topic statistics
 */
export function identifyWeakAreas(
  topicStats: Record<string, { correct: number; total: number }>,
  minAttempts: number = 2
): WeakAreaItem[] {
  const weakAreas: WeakAreaItem[] = [];

  for (const [topic, stat] of Object.entries(topicStats)) {
    if (stat.total < minAttempts) continue;

    const accuracyRate = Math.round((stat.correct / stat.total) * 100);

    if (accuracyRate < 70) {
      let status: WeakAreaItem['status'] = 'Review Recommended';
      if (accuracyRate < 50) {
        status = 'Needs Urgent Practice';
      } else if (accuracyRate >= 60) {
        status = 'Improving';
      }

      weakAreas.push({
        topic,
        subject: topic,
        totalAttempts: stat.total,
        accuracyRate,
        status,
      });
    }
  }

  // Sort weakest first
  return weakAreas.sort((a, b) => a.accuracyRate - b.accuracyRate);
}

/**
 * Recommends daily coding problems based on weak topics and solved history
 */
export function recommendDailyProblem(
  problems: CodingProblem[],
  solvedProblemIds: string[],
  weakTopics: string[] = []
): CodingProblem {
  if (problems.length === 0) {
    throw new Error('Problem list cannot be empty');
  }

  const unsolved = problems.filter((p) => !solvedProblemIds.includes(p.id));
  const pool = unsolved.length > 0 ? unsolved : problems;

  // 1. Try to find an unsolved problem matching weak topics
  if (weakTopics.length > 0) {
    const weakMatch = pool.find((p) =>
      weakTopics.some((wt) => p.category.toLowerCase().includes(wt.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(wt.toLowerCase())))
    );
    if (weakMatch) return weakMatch;
  }

  // 2. Otherwise recommend based on current user progression:
  // If solved < 3, suggest Beginner/Intermediate; if >= 3, suggest Intermediate/Advanced
  if (solvedProblemIds.length < 3) {
    const beginner = pool.find((p) => p.difficulty === 'Beginner');
    if (beginner) return beginner;
  }

  const intermediate = pool.find((p) => p.difficulty === 'Intermediate');
  if (intermediate) return intermediate;

  return pool[0];
}

/**
 * Calculates user level and title based on accumulated XP
 */
export function calculateXPAndLevel(xp: number): {
  level: number;
  title: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  const safeXp = Math.max(0, xp);
  const xpPerLevel = 250;
  const level = Math.floor(safeXp / xpPerLevel) + 1;
  const currentLevelBase = (level - 1) * xpPerLevel;
  const currentLevelXp = safeXp - currentLevelBase;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / xpPerLevel) * 100));

  const titles = [
    'Novice Programmer',
    'Code Craftsman',
    'Algorithm Adept',
    'Data Structures Specialist',
    'GATE Scholar',
    'Systems Architect',
    'Competitive Grandmaster',
  ];

  const titleIndex = Math.min(titles.length - 1, level - 1);

  return {
    level,
    title: titles[titleIndex],
    currentLevelXp,
    nextLevelXp: xpPerLevel,
    progressPercent,
  };
}

/**
 * Simulates estimated percentile based on exam benchmark distribution
 */
export function calculatePercentileEstimate(score: number, totalMarks: number): number {
  if (totalMarks <= 0) return 50.0;
  const pct = (score / totalMarks) * 100;

  // Bell-curve approximation for GATE/NTPC
  if (pct >= 85) return 99.4;
  if (pct >= 75) return 97.8;
  if (pct >= 65) return 92.5;
  if (pct >= 50) return 81.0;
  if (pct >= 35) return 62.0;
  if (pct >= 25) return 40.0;
  return Math.max(10.0, Math.round((pct / 25) * 40 * 10) / 10);
}
