import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type {
  QuizCategory,
  QuizPayload,
  SubmitQuizRequest,
  SubmitQuizResponse,
  MeritStudent,
  UserProfile,
} from '../types/quiz';

export const quizKeys = {
  all: ['quizzes'] as const,
  categories: () => [...quizKeys.all, 'categories'] as const,
  detail: (id: string) => [...quizKeys.all, 'detail', id] as const,
  meritList: () => [...quizKeys.all, 'merit-list'] as const,
  affiliate: () => [...quizKeys.all, 'affiliate'] as const,
  profile: () => [...quizKeys.all, 'profile'] as const,
  lastResult: ['quizzes', 'last-result'] as const,
};

export function useCategories() {
  return useQuery<QuizCategory[], Error>({
    queryKey: quizKeys.categories(),
    queryFn: () => api.getCategories(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useQuiz(id: string) {
  return useQuery<{ quiz: QuizPayload; feedbackKey: Record<string, string> }, Error>({
    queryKey: quizKeys.detail(id),
    queryFn: () => api.getQuizById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2,
  });
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  return useMutation<SubmitQuizResponse, Error, SubmitQuizRequest>({
    mutationFn: (payload: SubmitQuizRequest) => api.submitQuiz(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(quizKeys.lastResult, data);
      queryClient.invalidateQueries({ queryKey: quizKeys.profile() });
      queryClient.invalidateQueries({ queryKey: quizKeys.meritList() });
    },
  });
}

export function useLastResult() {
  const queryClient = useQueryClient();
  return {
    data: queryClient.getQueryData<SubmitQuizResponse>(quizKeys.lastResult),
  };
}

export function useMeritList() {
  return useQuery<{ list: MeritStudent[]; userRank: number }, Error>({
    queryKey: quizKeys.meritList(),
    queryFn: () => api.getMeritList(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useAffiliateData() {
  return useQuery({
    queryKey: quizKeys.affiliate(),
    queryFn: () => api.getAffiliateData(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useUserProfile() {
  return useQuery<UserProfile, Error>({
    queryKey: quizKeys.profile(),
    queryFn: () => api.getUserProfile(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation<UserProfile, Error, Partial<UserProfile>>({
    mutationFn: (updates) => api.updateUserProfile(updates),
    onSuccess: (data) => {
      queryClient.setQueryData(quizKeys.profile(), data);
    },
  });
}
