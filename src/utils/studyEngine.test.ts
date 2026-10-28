import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMockTestScore,
  identifyWeakAreas,
  recommendDailyProblem,
  calculateXPAndLevel,
  calculatePercentileEstimate,
} from './studyEngine.ts';
import { CodingProblem, ExamQuestion } from '../types/index.ts';

test('calculateMockTestScore calculates correct, incorrect, negative marks and accuracy', () => {
  const dummyQuestions: ExamQuestion[] = [
    {
      id: 'q1',
      exam: 'GATE_CS',
      subject: 'Algorithms',
      topic: 'Sorting',
      question: 'Time complexity of QuickSort average?',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
      correctOptionIndex: 1,
      explanation: 'QuickSort runs in O(n log n) average time.',
      marks: 2,
      negativeMarks: 0.66,
      difficulty: 'Medium',
    },
    {
      id: 'q2',
      exam: 'GATE_CS',
      subject: 'Operating Systems',
      topic: 'Paging',
      question: 'Page table is used for?',
      options: ['Virtual to physical translation', 'Process scheduling', 'Disk caching', 'I/O bus'],
      correctOptionIndex: 0,
      explanation: 'Maps virtual to physical frames.',
      marks: 1,
      negativeMarks: 0.33,
      difficulty: 'Easy',
    },
    {
      id: 'q3',
      exam: 'GATE_CS',
      subject: 'Operating Systems',
      topic: 'Paging',
      question: 'TLB miss causes?',
      options: ['Page fault', 'Page table lookup in memory', 'Process termination', 'Context switch'],
      correctOptionIndex: 1,
      explanation: 'TLB miss requires looking in page table.',
      marks: 1,
      negativeMarks: 0.33,
      difficulty: 'Medium',
    },
  ];

  // User answers q1 correctly (1), q2 incorrectly (2), q3 unattempted (-1)
  const answers = {
    q1: 1,
    q2: 2,
    q3: -1,
  };

  const result = calculateMockTestScore(dummyQuestions, answers);
  assert.equal(result.correctCount, 1);
  assert.equal(result.incorrectCount, 1);
  assert.equal(result.unattemptedCount, 1);
  // score = 2 - 0.33 = 1.67
  assert.equal(result.score, 1.67);
  assert.equal(result.totalMarks, 4);
  // Accuracy = 1 / 2 = 50%
  assert.equal(result.accuracy, 50);

  // Check topic breakdown
  assert.equal(result.topicBreakdown['Sorting'].correct, 1);
  assert.equal(result.topicBreakdown['Paging'].correct, 0);
  assert.equal(result.topicBreakdown['Paging'].attempted, 1);
  assert.equal(result.topicBreakdown['Paging'].total, 2);
});

test('identifyWeakAreas detects topics with <70% accuracy and ranks them by weakness', () => {
  const stats = {
    'Dynamic Programming': { correct: 1, total: 5 }, // 20%
    'Binary Trees': { correct: 3, total: 5 }, // 60%
    'Arrays': { correct: 5, total: 5 }, // 100% -> not weak
    'SQL Joins': { correct: 0, total: 1 }, // total < 2 -> excluded
  };

  const weak = identifyWeakAreas(stats, 2);
  assert.equal(weak.length, 2);
  assert.equal(weak[0].topic, 'Dynamic Programming');
  assert.equal(weak[0].status, 'Needs Urgent Practice');
  assert.equal(weak[0].accuracyRate, 20);

  assert.equal(weak[1].topic, 'Binary Trees');
  assert.equal(weak[1].status, 'Improving');
  assert.equal(weak[1].accuracyRate, 60);
});

test('recommendDailyProblem matches weak topics or adjusts by user progression', () => {
  const mockProblems: CodingProblem[] = [
    {
      id: 'p1',
      title: 'Two Sum',
      slug: 'two-sum',
      difficulty: 'Beginner',
      category: 'Arrays & Hashing',
      tags: ['array', 'hashmap'],
      description: 'Find two indices.',
      examples: [{ input: '[2,7,11,15], target = 9', output: '[0,1]' }],
      constraints: ['2 <= nums.length <= 10^4'],
      starterCode: { javascript: '', python: '', cpp: '', java: '' },
      testCases: [{ input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' }],
      timeLimitMs: 1000,
      xpReward: 50,
      hints: ['Use map'],
      acceptanceRate: 85,
    },
    {
      id: 'p2',
      title: 'Climbing Stairs',
      slug: 'climbing-stairs',
      difficulty: 'Intermediate',
      category: 'Dynamic Programming',
      tags: ['dp'],
      description: 'Ways to reach top.',
      examples: [{ input: 'n = 3', output: '3' }],
      constraints: ['1 <= n <= 45'],
      starterCode: { javascript: '', python: '', cpp: '', java: '' },
      testCases: [{ input: '3', expectedOutput: '3' }],
      timeLimitMs: 1000,
      xpReward: 100,
      hints: ['Fibonacci pattern'],
      acceptanceRate: 62,
    },
  ];

  // If user has 'Dynamic Programming' as a weak area, recommend p2
  const recWeak = recommendDailyProblem(mockProblems, [], ['Dynamic Programming']);
  assert.equal(recWeak.id, 'p2');

  // If user has no weak areas and solved < 3, recommend Beginner p1
  const recBeginner = recommendDailyProblem(mockProblems, [], []);
  assert.equal(recBeginner.id, 'p1');
});

test('calculateXPAndLevel calculates appropriate level, nextLevelXP, and title', () => {
  const level1 = calculateXPAndLevel(120);
  assert.equal(level1.level, 1);
  assert.equal(level1.currentLevelXp, 120);
  assert.equal(level1.nextLevelXp, 250);
  assert.equal(level1.title, 'Novice Programmer');

  const level3 = calculateXPAndLevel(600);
  assert.equal(level3.level, 3);
  assert.equal(level3.currentLevelXp, 100);
  assert.equal(level3.title, 'Algorithm Adept');
});

test('calculatePercentileEstimate maps score ratio to realistic percentile', () => {
  assert.equal(calculatePercentileEstimate(88, 100), 99.4);
  assert.equal(calculatePercentileEstimate(50, 100), 81.0);
  assert.equal(calculatePercentileEstimate(20, 100), 32.0);
});
