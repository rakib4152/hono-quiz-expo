export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorAccent: string;
  totalQuestions: number;
  difficulties: Difficulty[];
  estimatedMinutes: number;
}

export interface QuizOption {
  id: string;
  text: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  points: number;
}

export interface QuizPayload {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: Difficulty;
  timeLimitSeconds: number; // Time limit per question or whole quiz
  questions: Omit<QuizQuestion, 'correctOptionId' | 'explanation'>[];
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: Record<string, string>; // questionId -> selectedOptionId
  timeSpentSeconds: number;
}

export interface QuestionReviewItem {
  questionId: string;
  question: string;
  codeSnippet?: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  isCorrect: boolean;
  explanation: string;
  options: QuizOption[];
}

export interface SubmitQuizResponse {
  quizId: string;
  title: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  scorePercentage: number;
  pointsEarned: number;
  totalPossiblePoints: number;
  timeSpentSeconds: number;
  passed: boolean; // >= 70%
  completedAt: string;
  review: QuestionReviewItem[];
}
