import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type {
  QuizCategory,
  QuizQuestion,
  QuizPayload,
  SubmitQuizRequest,
  SubmitQuizResponse,
  QuestionReviewItem,
} from '../types/quiz';

// Question Bank
const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  'react-native': [
    {
      id: 'rn-1',
      category: 'react-native',
      difficulty: 'easy',
      question: 'Which component in React Native is used to provide touch feedback on modern iOS & Android?',
      options: [
        { id: 'opt-a', label: 'A', text: '<Pressable>' },
        { id: 'opt-b', label: 'B', text: '<Div>' },
        { id: 'opt-c', label: 'C', text: '<TouchContainer>' },
        { id: 'opt-d', label: 'D', text: '<Clickable>' },
      ],
      correctOptionId: 'opt-a',
      explanation: '<Pressable> is the core component intended for interacting with touches in React Native. It replaces older Touchable components with direct press state hooks.',
      points: 10,
    },
    {
      id: 'rn-2',
      category: 'react-native',
      difficulty: 'medium',
      question: 'In NativeWind v4, what compile-time engine powers the styling directly onto React Native yoga primitives?',
      codeSnippet: `// tailwind.config.js
module.exports = {
  presets: [require("nativewind/preset")],
};`,
      options: [
        { id: 'opt-a', label: 'A', text: 'Tailwind CSS v4 Oxide compiler via PostCSS & Babel preset' },
        { id: 'opt-b', label: 'B', text: 'Runtime CSS-in-JS emotion parser' },
        { id: 'opt-c', label: 'C', text: 'WebKit Layout Engine' },
        { id: 'opt-d', label: 'D', text: 'Android View XML Generator' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'NativeWind v4 uses the modern Tailwind v4 compilation pipeline to precompile Tailwind utilities directly into native StyleSheet objects at build time for near-zero runtime overhead.',
      points: 20,
    },
    {
      id: 'rn-3',
      category: 'react-native',
      difficulty: 'hard',
      question: 'What is the primary benefit of the React Native New Architecture (Fabric + TurboModules) using JSI?',
      options: [
        { id: 'opt-a', label: 'A', text: 'Synchronous C++ JavaScript Interface eliminating async JSON bridge serializations' },
        { id: 'opt-b', label: 'B', text: 'It converts JavaScript into WebAssembly automatically' },
        { id: 'opt-c', label: 'C', text: 'It runs Python in the native thread' },
        { id: 'opt-d', label: 'D', text: 'It forces all state into Redux store' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'The JavaScript Interface (JSI) allows JavaScript to hold direct references to C++ Host Objects, removing the JSON message serialization bottleneck across the asynchronous bridge.',
      points: 30,
    },
    {
      id: 'rn-4',
      category: 'react-native',
      difficulty: 'medium',
      question: 'In Expo Router, how do you retrieve dynamic route parameters such as /quiz/[id]?',
      codeSnippet: `// app/quiz/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Quiz ID: {id}</Text>;
}`,
      options: [
        { id: 'opt-a', label: 'A', text: 'useLocalSearchParams() hook from expo-router' },
        { id: 'opt-b', label: 'B', text: 'window.location.search' },
        { id: 'opt-c', label: 'C', text: 'props.navigation.getParam()' },
        { id: 'opt-d', label: 'D', text: 'useRouterQuery()' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'Expo Router provides useLocalSearchParams<T>() to access statically typed route segments matching dynamic filenames like [id].tsx.',
      points: 20,
    },
  ],
  typescript: [
    {
      id: 'ts-1',
      category: 'typescript',
      difficulty: 'easy',
      question: 'Which TypeScript utility type constructs a type with all properties of Type set to optional?',
      options: [
        { id: 'opt-a', label: 'A', text: 'Partial<T>' },
        { id: 'opt-b', label: 'B', text: 'Optional<T>' },
        { id: 'opt-c', label: 'C', text: 'Nullable<T>' },
        { id: 'opt-d', label: 'D', text: 'PickOptional<T>' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'Partial<T> marks all properties of type T as optional by applying the ? modifier to each key.',
      points: 10,
    },
    {
      id: 'ts-2',
      category: 'typescript',
      difficulty: 'medium',
      question: 'What does the `satisfies` operator introduced in TypeScript 4.9 accomplish?',
      codeSnippet: `const palette = {
  primary: '#0284c7',
  secondary: [255, 100, 50],
} satisfies Record<string, string | number[]>;

// palette.secondary can safely call .slice()!`,
      options: [
        { id: 'opt-a', label: 'A', text: 'Validates type conformity while retaining literal inferred specific types' },
        { id: 'opt-b', label: 'B', text: 'Casts the variable to any' },
        { id: 'opt-c', label: 'C', text: 'Forces runtime schema validation like Zod' },
        { id: 'opt-d', label: 'D', text: 'Converts objects into JSON strings' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'The satisfies operator verifies that an expression matches a type, but preserves the most specific type for the expression instead of widening it.',
      points: 20,
    },
    {
      id: 'ts-3',
      category: 'typescript',
      difficulty: 'hard',
      question: 'How does Hono achieve end-to-end type safety between backend and frontend without code generation?',
      codeSnippet: `// Backend
const app = new Hono().get('/api/users', (c) => c.json({ users: [] }));
export type AppType = typeof app;

// Frontend
import { hc } from 'hono/client';
const client = hc<AppType>('https://api.example.com');`,
      options: [
        { id: 'opt-a', label: 'A', text: 'By exporting TypeScript typeof AppType and chaining RPC type definitions through hc<AppType>' },
        { id: 'opt-b', label: 'B', text: 'By running an external GraphQL compiler in a cron job' },
        { id: 'opt-c', label: 'C', text: 'Through protobuf binary contracts generated at runtime' },
        { id: 'opt-d', label: 'D', text: 'By downloading swagger.json on every mobile app boot' },
      ],
      correctOptionId: 'opt-a',
      explanation: "Hono's builder pattern captures route paths, request schemas, and response types in the router instance type. The client `hc<AppType>` maps these into typed method calls with zero build-step code generation.",
      points: 30,
    },
  ],
  'hono-edge': [
    {
      id: 'hn-1',
      category: 'hono-edge',
      difficulty: 'easy',
      question: 'What runtime environments does Hono natively support with zero changes?',
      options: [
        { id: 'opt-a', label: 'A', text: 'Cloudflare Workers, Fastly, Deno, Bun, Node.js, and Vercel' },
        { id: 'opt-b', label: 'B', text: 'Only standard Apache HTTP server' },
        { id: 'opt-c', label: 'C', text: 'Only Windows Server IIS' },
        { id: 'opt-d', label: 'D', text: 'Only Python ASGI' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'Hono is built strictly on standard Web Fetch APIs (Request, Response, URL, Headers), enabling it to run seamlessly on modern Edge runtimes like Cloudflare, Deno, Bun, and Node.js.',
      points: 10,
    },
    {
      id: 'hn-2',
      category: 'hono-edge',
      difficulty: 'medium',
      question: 'What is the router algorithm used by Hono that delivers ultra-fast route matching?',
      options: [
        { id: 'opt-a', label: 'A', text: 'RegExpRouter and SmartRouter (combining Trie and compiled RegExp)' },
        { id: 'opt-b', label: 'B', text: 'Linear array search O(N)' },
        { id: 'opt-c', label: 'C', text: 'B-Tree disk index' },
        { id: 'opt-d', label: 'D', text: 'Red-Black tree with async locking' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'Hono employs RegExpRouter, which compiles multiple route patterns into a single unified regular expression, drastically outperforming traditional router implementations.',
      points: 20,
    },
  ],
  'tanstack-query': [
    {
      id: 'tq-1',
      category: 'tanstack-query',
      difficulty: 'easy',
      question: 'What parameter in TanStack Query controls how long fetched data is considered fresh before refetching in the background?',
      options: [
        { id: 'opt-a', label: 'A', text: 'staleTime' },
        { id: 'opt-b', label: 'B', text: 'gcTime' },
        { id: 'opt-c', label: 'C', text: 'timeoutMs' },
        { id: 'opt-d', label: 'D', text: 'cacheExpiration' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'staleTime specifies the duration in milliseconds that fetched data remains fresh. As long as data is fresh, TanStack Query returns it without sending network requests.',
      points: 10,
    },
    {
      id: 'tq-2',
      category: 'tanstack-query',
      difficulty: 'medium',
      question: 'Which method on queryClient is used to trigger background re-fetching after a mutation finishes?',
      codeSnippet: `const mutation = useMutation({
  mutationFn: submitQuizAnswers,
  onSuccess: () => {
    // Re-fetch quiz history!
    queryClient.invalidateQueries({ queryKey: ['quiz-history'] });
  }
});`,
      options: [
        { id: 'opt-a', label: 'A', text: 'queryClient.invalidateQueries({ queryKey: [...] })' },
        { id: 'opt-b', label: 'B', text: 'queryClient.deleteCache()' },
        { id: 'opt-c', label: 'C', text: 'queryClient.reloadWindow()' },
        { id: 'opt-d', label: 'D', text: 'queryClient.forceFlush()' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'invalidateQueries marks matched query caches as stale and actively triggers a background refetch for components currently mounted and observing that key.',
      points: 20,
    },
  ],
  'mobile-perf': [
    {
      id: 'mp-1',
      category: 'mobile-perf',
      difficulty: 'medium',
      question: 'Why should complex animations in React Native run via React Native Reanimated worklets on the UI thread?',
      options: [
        { id: 'opt-a', label: 'A', text: 'To maintain 60/120fps even if heavy business logic blocks the JS thread' },
        { id: 'opt-b', label: 'B', text: 'Because iOS prohibits JavaScript execution entirely' },
        { id: 'opt-c', label: 'C', text: 'To encrypt animations for app store submission' },
        { id: 'opt-d', label: 'D', text: 'To reduce battery usage by turning off GPU acceleration' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'Reanimated compiles worklets into native C++ hooks running synchronously on the UI thread, preventing dropped animation frames when the JS thread is busy.',
      points: 20,
    },
  ],
  'system-design': [
    {
      id: 'sd-1',
      category: 'system-design',
      difficulty: 'hard',
      question: 'When implementing offline-first quiz submissions in a mobile app, which pattern best guarantees zero lost user answers?',
      options: [
        { id: 'opt-a', label: 'A', text: 'Persist attempts to SQLite / MMKV with an idempotent outbox queue and background retry worker' },
        { id: 'opt-b', label: 'B', text: 'Store answers in volatile React memory state only' },
        { id: 'opt-c', label: 'C', text: 'Block the screen with an infinite alert until Wi-Fi reconnects' },
        { id: 'opt-d', label: 'D', text: 'Save answers in temporary URL hash parameters' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'An idempotent persistent transactional outbox pattern ensures answers survive app crashes or network loss, syncing safely when connectivity resumes.',
      points: 30,
    },
  ],
};

const CATEGORIES: QuizCategory[] = [
  {
    id: 'react-native',
    title: 'React Native & Expo Ecosystem',
    description: 'Master Expo SDK 51, NativeWind v4, Fabric architecture, and navigation.',
    iconName: 'Smartphone',
    colorAccent: 'emerald',
    totalQuestions: QUESTION_BANK['react-native'].length,
    difficulties: ['easy', 'medium', 'hard'],
    estimatedMinutes: 5,
  },
  {
    id: 'typescript',
    title: 'TypeScript & Type Gymnastics',
    description: 'Advanced types, satisfies operator, utility generics, and RPC inference.',
    iconName: 'Code2',
    colorAccent: 'blue',
    totalQuestions: QUESTION_BANK['typescript'].length,
    difficulties: ['easy', 'medium', 'hard'],
    estimatedMinutes: 4,
  },
  {
    id: 'hono-edge',
    title: 'Hono & Modern Edge APIs',
    description: 'RegExpRouter, Web standards, hc RPC clients, and edge middleware.',
    iconName: 'Flame',
    colorAccent: 'amber',
    totalQuestions: QUESTION_BANK['hono-edge'].length,
    difficulties: ['easy', 'medium'],
    estimatedMinutes: 3,
  },
  {
    id: 'tanstack-query',
    title: 'TanStack React Query & Caching',
    description: 'Optimistic updates, cache invalidation, stale-while-revalidate, and mutations.',
    iconName: 'Zap',
    colorAccent: 'violet',
    totalQuestions: QUESTION_BANK['tanstack-query'].length,
    difficulties: ['easy', 'medium'],
    estimatedMinutes: 3,
  },
  {
    id: 'mobile-perf',
    title: 'Mobile Performance & UI Threads',
    description: 'Reanimated worklets, memory leaks, FlatList windowing, and frame budgeting.',
    iconName: 'Gauge',
    colorAccent: 'rose',
    totalQuestions: QUESTION_BANK['mobile-perf'].length,
    difficulties: ['medium'],
    estimatedMinutes: 3,
  },
  {
    id: 'system-design',
    title: 'Mobile System Design & Offline Sync',
    description: 'Outbox queues, idempotency keys, conflict resolution, and battery optimization.',
    iconName: 'Layers',
    colorAccent: 'cyan',
    totalQuestions: QUESTION_BANK['system-design'].length,
    difficulties: ['hard'],
    estimatedMinutes: 4,
  },
];

// Initialize and chain Hono router for RPC type inference
const app = new Hono()
  .use('*', logger())
  .use('*', cors())
  .basePath('/api')
  .get('/health', (c) => {
    return c.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      service: 'QuizPulse Hono Backend',
    });
  })
  .get('/categories', (c) => {
    const difficulty = c.req.query('difficulty');

    let filtered = CATEGORIES;
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      filtered = CATEGORIES.filter((cat) => cat.difficulties.includes(difficulty as any));
    }

    return c.json({
      success: true,
      data: filtered,
      total: filtered.length,
      timestamp: new Date().toISOString(),
    });
  })
  .get('/quizzes/:id', (c) => {
    const id = c.req.param('id');
    const category = CATEGORIES.find((cat) => cat.id === id);

    if (!category) {
      return c.json(
        {
          success: false,
          error: `Quiz category '${id}' not found.`,
        },
        404
      );
    }

    const rawQuestions = QUESTION_BANK[id] || [];
    if (rawQuestions.length === 0) {
      return c.json(
        {
          success: false,
          error: `No questions available for quiz '${id}'.`,
        },
        404
      );
    }

    const quizPayload: QuizPayload = {
      id: category.id,
      title: category.title,
      category: category.id,
      description: category.description,
      difficulty: category.difficulties[0],
      timeLimitSeconds: rawQuestions.length * 25,
      questions: rawQuestions.map((q) => ({
        id: q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        codeSnippet: q.codeSnippet,
        options: q.options,
        points: q.points,
      })),
    };

    const feedbackKey: Record<string, string> = {};
    rawQuestions.forEach((q) => {
      feedbackKey[q.id] = q.correctOptionId;
    });

    return c.json({
      success: true,
      data: quizPayload,
      feedbackKey,
    });
  })
  .post('/quizzes/submit', async (c) => {
    const body = (await c.req.json()) as SubmitQuizRequest;
    const { quizId, answers = {}, timeSpentSeconds = 0 } = body;

    const category = CATEGORIES.find((cat) => cat.id === quizId);
    const questions = QUESTION_BANK[quizId] || [];

    if (!category || questions.length === 0) {
      return c.json(
        {
          success: false,
          error: `Invalid quizId '${quizId}' submitted.`,
        },
        400
      );
    }

    let correctCount = 0;
    let incorrectCount = 0;
    let pointsEarned = 0;
    let totalPossiblePoints = 0;

    const review: QuestionReviewItem[] = questions.map((q) => {
      const selectedOptionId = answers[q.id] || null;
      const isCorrect = selectedOptionId === q.correctOptionId;
      totalPossiblePoints += q.points;

      if (isCorrect) {
        correctCount++;
        pointsEarned += q.points;
      } else {
        incorrectCount++;
      }

      return {
        questionId: q.id,
        question: q.question,
        codeSnippet: q.codeSnippet,
        selectedOptionId,
        correctOptionId: q.correctOptionId,
        isCorrect,
        explanation: q.explanation,
        options: q.options,
      };
    });

    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= 70;

    const response: SubmitQuizResponse = {
      quizId: category.id,
      title: category.title,
      totalQuestions,
      answeredCount,
      correctCount,
      incorrectCount,
      scorePercentage,
      pointsEarned,
      totalPossiblePoints,
      timeSpentSeconds,
      passed,
      completedAt: new Date().toISOString(),
      review,
    };

    return c.json({
      success: true,
      data: response,
    });
  });

export { app };
export type AppType = typeof app;
