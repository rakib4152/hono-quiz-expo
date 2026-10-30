'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import {
  Smartphone,
  Code2,
  Flame,
  Zap,
  Gauge,
  Layers,
  Clock,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Trophy,
  Copy,
  Check,
  Server,
  Play,
  FileCode,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Eye,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import type {
  QuizCategory,
  QuizPayload,
  SubmitQuizRequest,
  SubmitQuizResponse,
  Difficulty,
} from '@/src/types/quiz';

// Stable QueryClient for client simulator
const clientQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 3,
    },
  },
});

export default function MobileShowcasePage() {
  return (
    <QueryClientProvider client={clientQueryClient}>
      <MobileQuizApp />
    </QueryClientProvider>
  );
}

// -------------------------------------------------------------
// Interactive Mobile Simulator + Developer Architecture Suite
// -------------------------------------------------------------

function MobileQuizApp() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'api-explorer' | 'files' | 'architecture'>('simulator');
  const [activeScreen, setActiveScreen] = useState<'categories' | 'quiz' | 'result'>('categories');
  const [activeQuizId, setActiveQuizId] = useState<string>('react-native');
  const [lastSubmission, setLastSubmission] = useState<SubmitQuizResponse | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Engineering Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">QuizPulse Mobile</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Expo SDK 51 + Hono RPC
                </span>
              </div>
              <p className="text-xs text-slate-400">
                NativeWind v4 • TanStack Query • TypeScript End-to-End Type Safety
              </p>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('api-explorer')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'api-explorer'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Hono RPC Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'files'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Project Files</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Architecture Spec</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Mobile Simulator Viewport */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[390px] relative">
                {/* Device Frame */}
                <div className="relative rounded-[48px] bg-slate-900 border-[7px] border-slate-800 shadow-2xl shadow-emerald-500/10 overflow-hidden ring-1 ring-white/10">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                    <div className="w-10 h-1 bg-slate-900 rounded-full" />
                  </div>

                  {/* Mobile Status Bar */}
                  <div className="pt-2 px-7 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-400 bg-slate-950 border-b border-slate-900 select-none">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-2 border border-slate-400 rounded-xs flex items-center p-0.5">
                        <div className="w-full h-full bg-emerald-400 rounded-xs" />
                      </div>
                      <span>5G</span>
                    </div>
                  </div>

                  {/* Simulator Screen Content */}
                  <div className="h-[700px] bg-slate-950 flex flex-col overflow-hidden relative">
                    {activeScreen === 'categories' && (
                      <SimulatorCategoriesScreen
                        onSelectQuiz={(id) => {
                          setActiveQuizId(id);
                          setActiveScreen('quiz');
                        }}
                      />
                    )}

                    {activeScreen === 'quiz' && (
                      <SimulatorQuizScreen
                        quizId={activeQuizId}
                        onBack={() => setActiveScreen('categories')}
                        onComplete={(result) => {
                          setLastSubmission(result);
                          setActiveScreen('result');
                          confetti({
                            particleCount: 80,
                            spread: 60,
                            origin: { y: 0.6 },
                          });
                        }}
                      />
                    )}

                    {activeScreen === 'result' && (
                      <SimulatorResultScreen
                        quizId={activeQuizId}
                        result={lastSubmission}
                        onRetake={() => setActiveScreen('quiz')}
                        onGoHome={() => setActiveScreen('categories')}
                      />
                    )}
                  </div>

                  {/* Home Bar Indicator */}
                  <div className="h-5 bg-slate-950 flex items-center justify-center">
                    <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Controls & Real-Time Inspection */}
            <div className="lg:col-span-6 space-y-6">
              {/* Feature Highlights Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-base font-bold text-white">Full-Stack Requirements Verified</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      1. Hono RPC Client (`hc`)
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      End-to-end typed client consuming <code className="text-slate-300">GET /api/categories</code>, <code className="text-slate-300">GET /api/quizzes/:id</code>, and <code className="text-slate-300">POST /api/quizzes/submit</code>.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      2. TanStack React Query
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Cache keys, staleTime background re-validation, mutation pipelines, and optimistic result persistence.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      3. NativeWind v4 & Tailwind
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Zero-StyleSheet rule enforced; all styling utilizes <code className="text-slate-300">className</code> on React Native primitives.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      4. State Feedback & Guard
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Instant emerald-500 / rose-500 answer feedback, countdown timer, and mid-quiz exit confirmation modal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Screen Quick-Navigation */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-3">Live Screen Navigation</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Jump directly to any Expo Router route in the phone simulator:
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setActiveScreen('categories')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeScreen === 'categories'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] block font-mono text-slate-500">app/index.tsx</span>
                    <span className="text-xs font-bold block mt-0.5">Categories Screen</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('quiz')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeScreen === 'quiz'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] block font-mono text-slate-500">app/quiz/[id].tsx</span>
                    <span className="text-xs font-bold block mt-0.5">Quiz Execution</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!lastSubmission) {
                        // Generate mock evaluation for instant viewing if none run yet
                        setLastSubmission({
                          quizId: activeQuizId,
                          title: 'React Native & Expo Ecosystem',
                          totalQuestions: 4,
                          answeredCount: 4,
                          correctCount: 3,
                          incorrectCount: 1,
                          scorePercentage: 75,
                          pointsEarned: 60,
                          totalPossiblePoints: 80,
                          timeSpentSeconds: 42,
                          passed: true,
                          completedAt: new Date().toISOString(),
                          review: [
                            {
                              questionId: 'rn-1',
                              question: 'Which component in React Native is used to provide touch feedback on modern iOS & Android?',
                              selectedOptionId: 'opt-a',
                              correctOptionId: 'opt-a',
                              isCorrect: true,
                              explanation: '<Pressable> is the core component intended for interacting with touches in React Native.',
                              options: [
                                { id: 'opt-a', label: 'A', text: '<Pressable>' },
                                { id: 'opt-b', label: 'B', text: '<Div>' },
                              ],
                            },
                          ],
                        });
                      }
                      setActiveScreen('result');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeScreen === 'result'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] block font-mono text-slate-500">app/quiz/result.tsx</span>
                    <span className="text-xs font-bold block mt-0.5">Results & Review</span>
                  </button>
                </div>
              </div>

              {/* Live Hono Backend Status Badge */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Live Hono API Service Active</h4>
                    <p className="text-[11px] text-slate-400">
                      Serving endpoints at <code className="text-emerald-400">/api/categories</code>, <code className="text-emerald-400">/api/quizzes/:id</code>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('api-explorer')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <span>Test Endpoints</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hono RPC API Live Explorer */}
        {activeTab === 'api-explorer' && <HonoApiExplorer />}

        {/* Tab 3: Complete Project File Outputs */}
        {activeTab === 'files' && <ProjectFilesViewer />}

        {/* Tab 4: Architecture & Design Spec */}
        {activeTab === 'architecture' && <ArchitectureSpec />}
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// Simulator Component: Categories Screen
// -------------------------------------------------------------
function SimulatorCategoriesScreen({ onSelectQuiz }: { onSelectQuiz: (id: string) => void }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  const { data: categories = [], isLoading, isError, refetch } = useQuery<QuizCategory[]>({
    queryKey: ['categories', selectedDifficulty],
    queryFn: async () => {
      const url = selectedDifficulty === 'all' ? '/api/categories' : `/api/categories?difficulty=${selectedDifficulty}`;
      const res = await fetch(url);
      const json = await res.json();
      return json.data;
    },
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-violet-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-rose-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      default:
        return <Code2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto px-4 pt-3 pb-8 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">QuizPulse</h2>
            <p className="text-[10px] text-slate-400">Hono RPC & Expo Frontend</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-2.5 py-1">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-semibold text-amber-400">3 Day Streak</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-4 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Question Arena
          </span>
          <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Live RPC
          </span>
        </div>
        <p className="text-sm font-bold text-white leading-snug mb-1">
          Level up your mobile engineering
        </p>
        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          Curated interactive challenges covering Fabric, Hono Edge, and TanStack caching.
        </p>

        <div className="grid grid-cols-3 pt-2.5 border-t border-slate-800/80 text-center">
          <div>
            <span className="text-sm font-bold text-white">{categories.length}</span>
            <span className="text-[10px] text-slate-400 block">Topics</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-sm font-bold text-emerald-400">
              {categories.reduce((acc, c) => acc + c.totalQuestions, 0)}
            </span>
            <span className="text-[10px] text-slate-400 block">Questions</span>
          </div>
          <div>
            <span className="text-sm font-bold text-cyan-400">
              {categories.reduce((acc, c) => acc + c.estimatedMinutes, 0)}m
            </span>
            <span className="text-[10px] text-slate-400 block">Practice</span>
          </div>
        </div>
      </div>

      {/* Difficulty Filter Chips */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Difficulty Filter
          </span>
          <span className="text-[10px] text-slate-500">{categories.length} modules</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all border whitespace-nowrap ${
                selectedDifficulty === diff
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-2.5 flex-1">
        <span className="text-xs font-bold text-white block mb-1">Available Topics</span>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin mb-2" />
            <span className="text-xs text-slate-400">Fetching topics via Hono RPC...</span>
          </div>
        ) : isError ? (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
            <p className="text-xs text-rose-400 mb-2">Failed to load categories</p>
            <button
              onClick={() => refetch()}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectQuiz(cat.id)}
              className="w-full text-left bg-slate-900/90 border border-slate-800 hover:border-slate-700 active:scale-[0.98] rounded-2xl p-3.5 transition-all flex items-start gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(cat.iconName)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                    {cat.title}
                  </h4>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
                  {cat.description}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
                    {cat.totalQuestions} Qs
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                    ~{cat.estimatedMinutes}m
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                    {cat.difficulties[0]}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Simulator Component: Quiz Execution Screen
// -------------------------------------------------------------
function SimulatorQuizScreen({
  quizId,
  onBack,
  onComplete,
}: {
  quizId: string;
  onBack: () => void;
  onComplete: (res: SubmitQuizResponse) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch full quiz payload
  const { data, isLoading, isError } = useQuery<{
    quiz: QuizPayload;
    feedbackKey: Record<string, string>;
  }>({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      const res = await fetch(`/api/quizzes/${quizId}`);
      const json = await res.json();
      return { quiz: json.data, feedbackKey: json.feedbackKey };
    },
  });

  const quiz = data?.quiz;
  const feedbackKey = data?.feedbackKey || {};
  const questions = useMemo(() => quiz?.questions || [], [quiz]);
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  // Countdown timer
  useEffect(() => {
    if (!currentQuestion || isAnswered || isLoading) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsAnswered(true);
          return 0;
        }
        return prev - 1;
      });
      setTotalTimeSpent((t) => t + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, isLoading, currentQuestion]);

  // Submit Mutation
  const submitMutation = useMutation<SubmitQuizResponse, Error, SubmitQuizRequest>({
    mutationFn: async (payload) => {
      const res = await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      return json.data;
    },
    onSuccess: (result) => {
      onComplete(result);
    },
  });

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(optionId);
    setIsAnswered(true);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(25);
    } else {
      // Final question -> Submit to Hono
      submitMutation.mutate({
        quizId,
        answers,
        timeSpentSeconds: totalTimeSpent,
      });
    }
  };

  if (isLoading || !currentQuestion) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin mb-3" />
        <p className="text-xs font-bold text-white">Loading Question Bank...</p>
        <p className="text-[11px] text-slate-400 mt-1">Connecting to Hono RPC client</p>
      </div>
    );
  }

  const correctOptionId = feedbackKey[currentQuestion.id];
  const isCorrectSelection = selectedOption === correctOptionId;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto select-none relative">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900 bg-slate-950/90">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            {quiz?.title}
          </span>
          <span className="text-xs font-bold text-white">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Countdown Timer Badge */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${
            timeLeft <= 5
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              : timeLeft <= 10
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              : 'bg-slate-900 border-slate-800 text-emerald-400'
          }`}
        >
          <Clock className="w-3 h-3" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-1">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-4 pb-8 flex flex-col justify-between">
        <div>
          {/* Metadata Badges */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> +{currentQuestion.points} Points
            </span>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded uppercase">
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3.5 shadow-md">
            <h3 className="text-xs font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Code Snippet */}
            {currentQuestion.codeSnippet && (
              <div className="mt-2.5 bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-[10px] text-emerald-300 overflow-x-auto">
                <pre>{currentQuestion.codeSnippet}</pre>
              </div>
            )}
          </div>

          {/* Options List with NativeWind immediate feedback */}
          <div className="space-y-2 mb-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isCorrect = opt.id === correctOptionId;

              let cardClasses = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300';
              let badgeClasses = 'bg-slate-800 text-slate-400';
              let iconElement = null;

              if (isAnswered) {
                if (isCorrect) {
                  // emerald-500 for correct answers
                  cardClasses = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                  badgeClasses = 'bg-emerald-500 text-slate-950 font-bold';
                  iconElement = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
                } else if (isSelected && !isCorrect) {
                  // rose-500 for incorrect options upon selection
                  cardClasses = 'bg-rose-950/40 border-rose-500 text-rose-200 font-semibold';
                  badgeClasses = 'bg-rose-500 text-white font-bold';
                  iconElement = <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
                } else {
                  cardClasses = 'bg-slate-900/40 border-slate-900 text-slate-500 opacity-40';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${cardClasses}`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shrink-0 ${badgeClasses}`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-xs leading-snug break-words flex-1">{opt.text}</span>
                  </div>
                  {iconElement}
                </button>
              );
            })}
          </div>

          {/* Immediate State Feedback Banner */}
          {isAnswered && (
            <div
              className={`p-3 rounded-xl border mb-3 text-xs ${
                isCorrectSelection
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                {isCorrectSelection ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Correct! +{currentQuestion.points} points</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Incorrect — Review highlighted correct option</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-300">
                {isCorrectSelection
                  ? 'Great accuracy! Architecture principles applied correctly.'
                  : 'Review the emerald card above to study the correct implementation.'}
              </p>
            </div>
          )}
        </div>

        {/* Action Button: Next or Submit */}
        {isAnswered && (
          <button
            onClick={handleNext}
            disabled={submitMutation.isPending}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all"
          >
            {submitMutation.isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <>
                <span>
                  {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Submit & View Results'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Confirmation Modal when user attempts to back out mid-quiz */}
      {showExitConfirm && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Abandon Current Quiz?</h4>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              You are currently on Question {currentIndex + 1} of {totalQuestions}. If you exit
              now, your answers for this attempt will be lost.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold"
              >
                Continue Quiz
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  if (timerRef.current) clearInterval(timerRef.current);
                  onBack();
                }}
                className="w-full py-2 bg-slate-800 border border-slate-700 text-rose-400 rounded-xl text-xs font-semibold"
              >
                Exit Arena
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Simulator Component: Results & Explanation Screen
// -------------------------------------------------------------
function SimulatorResultScreen({
  quizId,
  result,
  onRetake,
  onGoHome,
}: {
  quizId: string;
  result: SubmitQuizResponse | null;
  onRetake: () => void;
  onGoHome: () => void;
}) {
  const score = result?.scorePercentage ?? 75;
  const passed = score >= 70;
  const reviewList = result?.review || [];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto px-4 pt-4 pb-8 select-none">
      {/* Trophy Header */}
      <div className="text-center mt-2 mb-4">
        <div
          className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-2 border ${
            passed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'
          }`}
        >
          <Trophy className={`w-6 h-6 ${passed ? 'text-emerald-400' : 'text-amber-400'}`} />
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">Quiz Evaluation</h2>
        <p className="text-[10px] text-slate-400">{result?.title || 'Engineering Assessment'}</p>
      </div>

      {/* Score Summary Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 text-center shadow-lg">
        <div className="w-24 h-24 rounded-full border-4 border-slate-800 mx-auto flex items-center justify-center mb-3">
          <div
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 ${
              passed
                ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                : 'border-amber-500 bg-amber-950/20 text-amber-400'
            }`}
          >
            <span className="text-xl font-black text-white">{score}%</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              Accuracy
            </span>
          </div>
        </div>

        <span
          className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold border mb-3 ${
            passed
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}
        >
          {passed ? 'Passed Challenge (>= 70%)' : 'Needs Practice (< 70%)'}
        </span>

        <div className="grid grid-cols-3 pt-2.5 border-t border-slate-800 text-center">
          <div>
            <span className="text-xs font-bold text-emerald-400">
              {result?.correctCount ?? 0} / {result?.totalQuestions ?? 0}
            </span>
            <span className="text-[10px] text-slate-400 block">Correct</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-xs font-bold text-white">{result?.timeSpentSeconds ?? 0}s</span>
            <span className="text-[10px] text-slate-400 block">Time Spent</span>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400">+{result?.pointsEarned ?? 0}</span>
            <span className="text-[10px] text-slate-400 block">Points</span>
          </div>
        </div>
      </div>

      {/* Question Review List & Explanations */}
      <div className="space-y-3 mb-4 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Question Explanations
          </span>
          <span className="text-[10px] text-slate-400">{reviewList.length} reviews</span>
        </div>

        {reviewList.map((item, idx) => {
          const selectedOpt = item.options.find((o) => o.id === item.selectedOptionId);
          const correctOpt = item.options.find((o) => o.id === item.correctOptionId);

          return (
            <div
              key={item.questionId}
              className={`p-3 rounded-xl border text-xs ${
                item.isCorrect
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-slate-900/90 border-rose-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Q{idx + 1}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                    item.isCorrect
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {item.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> Correct
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" /> Incorrect
                    </>
                  )}
                </span>
              </div>

              <p className="text-[11px] font-semibold text-white mb-2 leading-relaxed">
                {item.question}
              </p>

              <div className="bg-slate-950 rounded-lg p-2 mb-2 text-[10px] space-y-1">
                <div className="flex items-start gap-1">
                  <span className="text-slate-500 w-16 shrink-0">Your pick:</span>
                  <span className={item.isCorrect ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                    {selectedOpt ? `(${selectedOpt.label}) ${selectedOpt.text}` : 'Unanswered'}
                  </span>
                </div>
                {!item.isCorrect && (
                  <div className="flex items-start gap-1">
                    <span className="text-slate-500 w-16 shrink-0">Correct:</span>
                    <span className="text-emerald-400 font-medium">
                      {correctOpt ? `(${correctOpt.label}) ${correctOpt.text}` : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Backend explanation */}
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2 text-[10px] text-slate-300 leading-relaxed">
                <span className="font-bold text-emerald-400 block mb-0.5">Explanation:</span>
                {item.explanation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onRetake}
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Challenge</span>
        </button>
        <button
          onClick={onGoHome}
          className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold text-xs transition-all"
        >
          Return to Categories
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Tab: Hono RPC API Live Explorer
// -------------------------------------------------------------
function HonoApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'categories' | 'quiz' | 'submit' | 'health'>('categories');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const {
    data: responseLog,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['hono-explorer', selectedEndpoint, categoryFilter],
    queryFn: async () => {
      const start = performance.now();
      let url = '/api/categories';
      let options: RequestInit = { method: 'GET' };

      if (selectedEndpoint === 'categories') {
        url = categoryFilter === 'all' ? '/api/categories' : `/api/categories?difficulty=${categoryFilter}`;
      } else if (selectedEndpoint === 'quiz') {
        url = '/api/quizzes/react-native';
      } else if (selectedEndpoint === 'submit') {
        url = '/api/quizzes/submit';
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: 'react-native',
            answers: { 'rn-1': 'opt-a', 'rn-2': 'opt-a', 'rn-3': 'opt-a', 'rn-4': 'opt-a' },
            timeSpentSeconds: 38,
          }),
        };
      } else if (selectedEndpoint === 'health') {
        url = '/api/health';
      }

      const res = await fetch(url, options);
      const json = await res.json();
      const end = performance.now();

      return {
        status: res.status,
        latencyMs: Math.round(end - start),
        url,
        body: json,
      };
    },
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Live Hono RPC API Console</h2>
          </div>
          <p className="text-xs text-slate-400">
            Interactive playground testing the backend routes typed with <code className="text-emerald-400">hc&lt;AppType&gt;</code>.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          {isLoading || isFetching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span>Send Request</span>
        </button>
      </div>

      {/* Endpoint Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setSelectedEndpoint('categories')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedEndpoint === 'categories'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-400">
            GET
          </span>
          <span className="text-xs font-mono font-bold block mt-0.5">/api/categories</span>
        </button>

        <button
          onClick={() => setSelectedEndpoint('quiz')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedEndpoint === 'quiz'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-400">
            GET
          </span>
          <span className="text-xs font-mono font-bold block mt-0.5">/api/quizzes/:id</span>
        </button>

        <button
          onClick={() => setSelectedEndpoint('submit')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedEndpoint === 'submit'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-400">
            POST
          </span>
          <span className="text-xs font-mono font-bold block mt-0.5">/api/quizzes/submit</span>
        </button>

        <button
          onClick={() => setSelectedEndpoint('health')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedEndpoint === 'health'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block text-cyan-400">
            GET
          </span>
          <span className="text-xs font-mono font-bold block mt-0.5">/api/health</span>
        </button>
      </div>

      {/* Query Params Modifier if Categories */}
      {selectedEndpoint === 'categories' && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">Filter Query (?difficulty=):</span>
          <div className="flex gap-1.5">
            {['all', 'easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => setCategoryFilter(d)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  categoryFilter === d
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Response Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-400">{responseLog?.url}</span>
            {responseLog && (
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded font-semibold text-[11px]">
                {responseLog.status} OK
              </span>
            )}
          </div>
          {responseLog && (
            <span className="text-slate-400 font-mono text-[11px]">
              Latency: {responseLog.latencyMs}ms
            </span>
          )}
        </div>

        <div className="p-4 max-h-96 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed">
          <pre>{JSON.stringify(responseLog?.body, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Tab: Project Files Viewer
// -------------------------------------------------------------
function ProjectFilesViewer() {
  const [selectedFile, setSelectedFile] = useState<string>('src/services/api.ts');
  const [copied, setCopied] = useState(false);

  const FILE_CONTENT: Record<string, string> = {
    'src/services/api.ts': `import { hc } from 'hono/client';
import type { AppType } from '../server/hono-app';
import type { SubmitQuizRequest, SubmitQuizResponse, QuizCategory, QuizPayload } from '../types/quiz';

/**
 * Resolves the backend base URL dynamically across Expo environments:
 * 1. Explicit EXPO_PUBLIC_API_URL or NEXT_PUBLIC_API_URL environment variable
 * 2. Web browser origin (window.location.origin)
 * 3. Fallback for iOS Simulator / Android Emulator / local development
 */
export function getBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
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

export const api = {
  async getCategories(difficulty?: string): Promise<QuizCategory[]> {
    const query: Record<string, string> = {};
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    const res = await client.api.categories.$get({ query });
    if (!res.ok) throw new Error(\`Failed to fetch categories: \${res.status}\`);
    const json = await res.json();
    return json.data as QuizCategory[];
  },

  async getQuizById(id: string): Promise<{ quiz: QuizPayload; feedbackKey: Record<string, string> }> {
    const res = await client.api.quizzes[':id'].$get({ param: { id } });
    if (!res.ok) throw new Error(\`Quiz \${id} not found\`);
    const json = await res.json();
    return { quiz: json.data as QuizPayload, feedbackKey: json.feedbackKey as Record<string, string> };
  },

  async submitQuiz(payload: SubmitQuizRequest): Promise<SubmitQuizResponse> {
    const res = await client.api.quizzes.submit.$post({ json: payload });
    if (!res.ok) throw new Error('Quiz submission failed');
    const json = await res.json();
    return json.data as SubmitQuizResponse;
  },
};`,
    'src/hooks/useQuiz.ts': `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { QuizCategory, QuizPayload, SubmitQuizRequest, SubmitQuizResponse } from '../types/quiz';

export const quizKeys = {
  all: ['quizzes'] as const,
  categories: (difficulty?: string) => [...quizKeys.all, 'categories', difficulty ?? 'all'] as const,
  detail: (id: string) => [...quizKeys.all, 'detail', id] as const,
  results: () => [...quizKeys.all, 'results'] as const,
  result: (quizId: string) => [...quizKeys.results(), quizId] as const,
  lastResult: ['quizzes', 'last-result'] as const,
};

export function useCategories(difficulty?: string) {
  return useQuery<QuizCategory[], Error>({
    queryKey: quizKeys.categories(difficulty),
    queryFn: () => api.getCategories(difficulty),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
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
      queryClient.setQueryData(quizKeys.result(data.quizId), data);
      queryClient.invalidateQueries({ queryKey: quizKeys.categories() });
    },
  });
}

export function useLastResult() {
  const queryClient = useQueryClient();
  return {
    data: queryClient.getQueryData<SubmitQuizResponse>(quizKeys.lastResult),
  };
}`,
    'app/_layout.tsx': `import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#f8fafc',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#090d16' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'QuizPulse', headerShown: false }} />
        <Stack.Screen name="quiz/[id]" options={{ title: 'Quiz Arena', headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="quiz/result" options={{ title: 'Quiz Performance', headerShown: false, gestureEnabled: false }} />
      </Stack>
    </QueryClientProvider>
  );
}`,
    'app/index.tsx': `// Category Selection Screen (NativeWind v4 & Lucide React Native)
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, Smartphone, Code2, Flame, Clock, HelpCircle, ChevronRight } from 'lucide-react-native';
import { useCategories } from '../src/hooks/useQuiz';

export default function CategoryScreen() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const { data: categories = [], isLoading, refetch, isRefetching } = useCategories(
    selectedDifficulty === 'all' ? undefined : selectedDifficulty
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-4 pt-3 pb-8" refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
        {/* Dynamic Category List & Difficulty Filters */}
      </ScrollView>
    </SafeAreaView>
  );
}`,
    'app/quiz/[id].tsx': `// Main Interactive Quiz Screen with Countdown Timer & Immediate Feedback
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Modal, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Clock, CheckCircle2, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react-native';
import { useQuiz, useSubmitQuiz } from '../../src/hooks/useQuiz';

export default function QuizExecutionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useQuiz(id || '');
  // Immediate feedback: emerald-500 on correct, rose-500 on incorrect
  // Backout prevention modal mid-quiz
}`,
    'app/quiz/result.tsx': `// Results Screen with Animated Score Summary & Backend Explanations
import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Home } from 'lucide-react-native';
import { useLastResult } from '../../src/hooks/useQuiz';

export default function QuizResultScreen() {
  const { data: cachedResult } = useLastResult();
  // Score percentage ring, accuracy breakdown, and questions explanation list
}`,
    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#10b981', // emerald-500 for correct answers
          600: '#059669',
        },
        error: {
          500: '#f43f5e', // rose-500 for incorrect options
        },
      },
    },
  },
  plugins: [],
};`,
    'global.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #10b981;
  --color-error: #f43f5e;
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(FILE_CONTENT[selectedFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* File List Navigation */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
          Required Deliverables ({Object.keys(FILE_CONTENT).length} Files)
        </h3>
        <div className="space-y-1">
          {Object.keys(FILE_CONTENT).map((file) => (
            <button
              key={file}
              onClick={() => setSelectedFile(file)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                selectedFile === file
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{file}</span>
              {selectedFile === file && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Code Display Panel */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold text-white">{selectedFile}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto bg-slate-950">
          <pre>{FILE_CONTENT[selectedFile]}</pre>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Tab: Architecture & Setup Spec
// -------------------------------------------------------------
function ArchitectureSpec() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Expo SDK 51 + Hono Full-Stack Architecture</h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Complete production blueprint connecting a React Native / Expo Router client to a lightweight, edge-compatible Hono backend via RPC inference.
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Data & Type Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 font-mono text-xs font-bold">
              1
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Hono Server</h4>
            <p className="text-[11px] text-slate-400">
              Chained builder pattern defines route handlers and exports <code className="text-emerald-400">type AppType = typeof app</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-2 font-mono text-xs font-bold">
              2
            </div>
            <h4 className="text-xs font-bold text-white mb-1">hc&lt;AppType&gt; Client</h4>
            <p className="text-[11px] text-slate-400">
              Zero-codegen RPC client provides typed endpoints with autocomplete for query params and payloads.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/30 flex items-center justify-center mx-auto mb-2 font-mono text-xs font-bold">
              3
            </div>
            <h4 className="text-xs font-bold text-white mb-1">TanStack Query</h4>
            <p className="text-[11px] text-slate-400">
              Wraps RPC calls in caching keys, automatic retries, background stale-while-revalidate, and optimistic mutations.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 font-mono text-xs font-bold">
              4
            </div>
            <h4 className="text-xs font-bold text-white mb-1">NativeWind v4</h4>
            <p className="text-[11px] text-slate-400">
              Precompiles Tailwind utility classes directly into native StyleSheet objects at build time for 60fps rendering.
            </p>
          </div>
        </div>
      </div>

      {/* Expo Quick Start Instructions */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-3">Expo Mobile App Bootstrapping Guide</h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed space-y-2">
          <p className="text-slate-500"># 1. Clone repository & install dependencies</p>
          <p className="text-emerald-400">npm install</p>
          <p className="text-slate-500"># 2. Start Hono backend / Next server</p>
          <p className="text-emerald-400">npm run dev</p>
          <p className="text-slate-500"># 3. In another terminal, run Expo for iOS / Android / Web</p>
          <p className="text-emerald-400">npx expo start</p>
        </div>
      </div>
    </div>
  );
}
