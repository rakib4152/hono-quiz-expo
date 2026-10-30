import { hc } from 'hono/client';
import type { AppType } from '../server/hono-app';
import type { SubmitQuizRequest, SubmitQuizResponse, QuizCategory, QuizPayload } from '../types/quiz';

/**
 * Resolves the backend base URL dynamically across Expo environments:
 * 1. Explicit EXPO_PUBLIC_API_URL or NEXT_PUBLIC_API_URL environment variable
 * 2. Web browser origin (window.location.origin)
 * 3. Fallback for iOS Simulator / Android Emulator / local development
 */
export function getBaseUrl(): string {
  // 1. Environment variable override (e.g. production Cloud Run / Vercel or custom LAN IP)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '');
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }

  // 2. Client-side browser / Web preview runtime
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  // 3. Fallback for standard development port
  return 'http://localhost:3000';
}

/**
 * End-to-end typed Hono RPC Client instance
 */
export const client = hc<AppType>(getBaseUrl(), {
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': 'expo-mobile',
  },
});

/**
 * Direct typed API helper functions wrapping Hono RPC calls.
 * Provides resilient error handling, JSON unwrapping, and network status checks.
 */
export const api = {
  /**
   * Fetches quiz categories with optional difficulty filter
   */
  async getCategories(difficulty?: string): Promise<QuizCategory[]> {
    const query: Record<string, string> = {};
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }

    const res = await client.api.categories.$get({
      query,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to fetch categories (${res.status}): ${errText}`);
    }

    const json = await res.json();
    return json.data as QuizCategory[];
  },

  /**
   * Fetches quiz questions and metadata by quiz / category ID
   */
  async getQuizById(id: string): Promise<{ quiz: QuizPayload; feedbackKey: Record<string, string> }> {
    const res = await client.api.quizzes[':id'].$get({
      param: { id },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: 'Quiz not found' }));
      throw new Error((errData as any).error || `Failed to fetch quiz ${id}`);
    }

    const json = await res.json();
    return {
      quiz: json.data as QuizPayload,
      feedbackKey: json.feedbackKey as Record<string, string>,
    };
  },

  /**
   * Submits user answers for server-side evaluation, score calculation, and explanations
   */
  async submitQuiz(payload: SubmitQuizRequest): Promise<SubmitQuizResponse> {
    const res = await client.api.quizzes.submit.$post({
      json: payload,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: 'Quiz submission failed' }));
      throw new Error((errData as any).error || 'Failed to submit quiz');
    }

    const json = await res.json();
    return json.data as SubmitQuizResponse;
  },

  /**
   * Healthcheck endpoint
   */
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const res = await client.api.health.$get();
    return (await res.json()) as { status: string; timestamp: string };
  },
};
