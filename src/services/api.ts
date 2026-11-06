import { hc } from 'hono/client';
import type { AppType } from '../server/hono-app';
import type {
  SubmitQuizRequest,
  SubmitQuizResponse,
  QuizCategory,
  QuizPayload,
  MeritStudent,
  FacebookFriend,
  UserProfile,
} from '../types/quiz';

export function getBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return 'http://localhost:3000';
}

export const client = hc<AppType>(getBaseUrl(), {
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': 'expo-mobile',
  },
});

export const api = {
  async getCategories(): Promise<QuizCategory[]> {
    const res = await client.api.categories.$get();
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    const json = await res.json();
    return json.data as QuizCategory[];
  },

  async getQuizById(id: string): Promise<{ quiz: QuizPayload; feedbackKey: Record<string, string> }> {
    const res = await client.api.quizzes[':id'].$get({ param: { id } });
    if (!res.ok) throw new Error(`Quiz ${id} not found`);
    const json = await res.json();
    return { quiz: json.data as QuizPayload, feedbackKey: json.feedbackKey as Record<string, string> };
  },

  async submitQuiz(payload: SubmitQuizRequest): Promise<SubmitQuizResponse> {
    const res = await client.api.quizzes.submit.$post({ json: payload });
    if (!res.ok) throw new Error('Quiz submission failed');
    const json = await res.json();
    return json.data as SubmitQuizResponse;
  },

  async getMeritList(): Promise<{ list: MeritStudent[]; userRank: number }> {
    const res = await client.api['merit-list'].$get();
    if (!res.ok) throw new Error('Failed to load merit list');
    const json = await res.json();
    return { list: json.data as MeritStudent[], userRank: json.userRank as number };
  },

  async getAffiliateData(): Promise<{
    referralCode: string;
    referralLink: string;
    totalEarnedTk: number;
    pendingTk: number;
    successfulReferrals: number;
    fbFriends: FacebookFriend[];
  }> {
    const res = await client.api.affiliate.$get();
    if (!res.ok) throw new Error('Failed to load affiliate details');
    const json = await res.json();
    return json.data as any;
  },

  async getUserProfile(): Promise<UserProfile> {
    const res = await client.api['user-profile'].$get();
    if (!res.ok) throw new Error('Failed to load user profile');
    const json = await res.json();
    return json.data as UserProfile;
  },

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const res = await client.api['user-profile'].update.$post({ json: updates });
    if (!res.ok) throw new Error('Failed to update profile');
    const json = await res.json();
    return json.data as UserProfile;
  },
};
