export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Hard';

export type ProgrammingLanguage = 'javascript' | 'python' | 'cpp' | 'java';

export type ExamType = 'GATE_CS' | 'NTPC_EXAM' | 'CODING_DSA';

export interface TestCase {
  input: string;
  expectedOutput: string;
  isPrivate?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode: Record<ProgrammingLanguage, string>;
  solutionCode?: Record<ProgrammingLanguage, string>;
  testCases: TestCase[];
  timeLimitMs: number;
  xpReward: number;
  hints: string[];
  acceptanceRate: number;
}

export interface ExamQuestion {
  id: string;
  exam: ExamType;
  subject: string;
  topic: string;
  year?: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number; // 0-based
  explanation: string;
  marks: number;
  negativeMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface MockTest {
  id: string;
  exam: ExamType;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  questions: ExamQuestion[];
}

export interface MockTestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  exam: ExamType;
  timestamp: number;
  score: number;
  totalMarks: number;
  accuracy: number;
  timeSpentSeconds: number;
  answers: Record<string, number>; // questionId -> chosenOptionIndex
  topicBreakdown: Record<string, { correct: number; total: number }>;
}

export interface FreeBook {
  id: string;
  title: string;
  author: string;
  description: string;
  pdfUrl: string; // Guaranteed direct .pdf link
  alternateDownloadUrl?: string;
  fileSize: string;
  pageCount: number;
  badge?: string;
  subject: string;
  chapters: Array<{
    chapterNumber: number;
    title: string;
    summary: string;
  }>;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  keyConcepts: string[];
  youtubeLectures: Array<{
    title: string;
    channel: string;
    duration: string;
    youtubeId: string;
    url: string;
  }>;
  freeBooks: FreeBook[];
  questionBankUrl?: string;
  questionBankCount: number;
}

export interface RoadmapSection {
  id: string;
  title: string;
  examTarget: ExamType;
  topics: RoadmapTopic[];
}

export interface PeerUser {
  id: string;
  name: string;
  avatar: string;
  collegeOrOrg: string;
  xp: number;
  rank: number;
  problemsSolved: number;
  mockTestsTaken: number;
  accuracy: number;
  streakDays: number;
  badges: string[];
}

export interface WeakAreaItem {
  topic: string;
  subject: string;
  totalAttempts: number;
  accuracyRate: number; // 0 to 100
  status: 'Needs Urgent Practice' | 'Review Recommended' | 'Improving';
  recommendedProblemId?: string;
  recommendedLectureUrl?: string;
}

export interface UserProgress {
  userId: string;
  name: string;
  targetExam: ExamType;
  streak: number;
  lastActiveDate: string;
  xp: number;
  solvedProblemIds: string[];
  mockTestAttempts: MockTestAttempt[];
  completedTopicIds: string[];
  bookmarkedResourceIds: string[];
  topicStats: Record<string, { correct: number; total: number }>;
}
