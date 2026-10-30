import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { QuizCategory, QuizPayload, SubmitQuizRequest, SubmitQuizResponse } from '../types/quiz';

/**
 * React Query cache keys factory for consistent cache management
 */
export const quizKeys = {
  all: ['quizzes'] as const,
  categories: (difficulty?: string) => [...quizKeys.all, 'categories', difficulty ?? 'all'] as const,
  detail: (id: string) => [...quizKeys.all, 'detail', id] as const,
  results: () => [...quizKeys.all, 'results'] as const,
  result: (quizId: string) => [...quizKeys.results(), quizId] as const,
  lastResult: ['quizzes', 'last-result'] as const,
};

/**
 * Hook to fetch quiz categories with optional difficulty filter
 */
export function useCategories(difficulty?: string) {
  return useQuery<QuizCategory[], Error>({
    queryKey: quizKeys.categories(difficulty),
    queryFn: () => api.getCategories(difficulty),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    retry: 2,
  });
}

/**
 * Hook to fetch full quiz payload by category ID
 */
export function useQuiz(id: string) {
  return useQuery<{ quiz: QuizPayload; feedbackKey: Record<string, string> }, Error>({
    queryKey: quizKeys.detail(id),
    queryFn: () => api.getQuizById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2, // 2 minutes fresh
    retry: 1,
  });
}

/**
 * Hook to submit quiz answers and receive score evaluation
 */
export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  return useMutation<SubmitQuizResponse, Error, SubmitQuizRequest>({
    mutationFn: (payload: SubmitQuizRequest) => api.submitQuiz(payload),
    onSuccess: (data) => {
      // Store the latest result in cache for instant access on result screen
      queryClient.setQueryData(quizKeys.lastResult, data);
      queryClient.setQueryData(quizKeys.result(data.quizId), data);

      // Invalidate relevant queries to keep counts and stats updated
      queryClient.invalidateQueries({ queryKey: quizKeys.categories() });
    },
  });
}

/**
 * Hook to read the most recently submitted quiz result from cache
 */
export function useLastResult() {
  const queryClient = useQueryClient();
  return {
    data: queryClient.getQueryData<SubmitQuizResponse>(quizKeys.lastResult),
  };
}
