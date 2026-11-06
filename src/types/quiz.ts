export type JobType = 'bcs' | 'bank' | 'govt' | 'private';

export interface QuizCategory {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  iconName: string;
  colorAccent: string;
  totalQuestions: number;
  durationMinutes: number;
  candidateCount: number;
}

export interface QuizOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuizQuestion {
  id: string;
  subject: 'bangla' | 'english' | 'gk' | 'math';
  subjectNameBn: string;
  questionNumber: number;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  marks: number;
}

export interface QuizPayload {
  id: string;
  title: string;
  category: JobType;
  description: string;
  totalMarks: number;
  negativeMarkPerWrong: number;
  timeLimitSeconds: number;
  questions: Omit<QuizQuestion, 'correctOptionId' | 'explanation'>[];
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: Record<string, string>; // questionId -> optionId
  timeSpentSeconds: number;
}

export interface QuestionReviewItem {
  questionId: string;
  questionNumber: number;
  subject: 'bangla' | 'english' | 'gk' | 'math';
  subjectNameBn: string;
  question: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  isCorrect: boolean;
  isSkipped: boolean;
  explanation: string;
  options: QuizOption[];
}

export interface SubmitQuizResponse {
  quizId: string;
  title: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  rawScore: number;
  negativeMarks: number;
  netScore: number;
  accuracyPercentage: number;
  timeSpentSeconds: number;
  meritRank: number;
  completedAt: string;
  pieChart: {
    correctPercentage: number;
    wrongPercentage: number;
    skippedPercentage: number;
  };
  review: QuestionReviewItem[];
}

export interface MeritStudent {
  rank: number;
  name: string;
  avatar: string;
  institution: string;
  score: number;
  totalMarks: number;
  timeTaken: string;
  accuracy: number;
  jobTarget: string;
}

export interface FacebookFriend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  status: 'invited' | 'joined' | 'pending';
  rewardEarnedTk: number;
}

export interface UserProfile {
  name: string;
  email: string;
  institution: string;
  jobType: JobType;
  attemptedQuizCount: number;
  totalMarksScored: number;
  averageAccuracy: number;
  affiliateEarningsTk: number;
  referralCode: string;
}
