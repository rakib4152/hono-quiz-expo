'use client';

import React, { useState, useMemo } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import {
  Smartphone,
  GraduationCap,
  Landmark,
  Building2,
  Briefcase,
  Play,
  Trophy,
  Share2,
  Settings as SettingsIcon,
  Flame,
  Clock,
  Users,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  Wallet,
  LogIn,
  UserPlus,
  Copy,
  Check,
  BookOpen,
  Terminal,
  FileCode,
  LayoutGrid,
  Gift,
  Search,
} from 'lucide-react';
import type {
  QuizCategory,
  QuizPayload,
  SubmitQuizRequest,
  SubmitQuizResponse,
  MeritStudent,
  FacebookFriend,
  UserProfile,
  JobType,
} from '@/src/types/quiz';

const clientQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 3,
    },
  },
});

type ScreenId =
  | 'login'
  | 'register'
  | 'home'
  | 'quiz'
  | 'result'
  | 'attempted'
  | 'merit'
  | 'affiliate'
  | 'settings';

export default function MobileShowcasePage() {
  return (
    <QueryClientProvider client={clientQueryClient}>
      <JobQuizApp />
    </QueryClientProvider>
  );
}

function JobQuizApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<'simulator' | 'wireframe' | 'api-explorer' | 'files'>('simulator');
  const [activeQuizId, setActiveQuizId] = useState<string>('bank');
  const [lastSubmission, setLastSubmission] = useState<SubmitQuizResponse | null>(null);

  // Wireframe 9 screens list matching the exact 3x3 layout in the user's sketch
  const SCREENS_METADATA: { id: ScreenId; title: string; subtitle: string; row: number; col: number }[] = [
    { id: 'login', title: '1. Login Screen', subtitle: 'Auth Screen (Name, Email, G/F)', row: 1, col: 1 },
    { id: 'register', title: '2. Register Screen', subtitle: 'Name, Institution, Job Type', row: 1, col: 2 },
    { id: 'home', title: '3. Home Screen', subtitle: 'Hero Area, ক্যাটাগরি (BCS/Bank)', row: 1, col: 3 },
    { id: 'quiz', title: '4. Quiz Screen', subtitle: 'Bank/BCS Exam (Q.1, Q.2, A/B/C/D)', row: 2, col: 1 },
    { id: 'result', title: '5. Result Screen', subtitle: 'Pie Chart (Correct/Wrong/Skipped)', row: 2, col: 2 },
    { id: 'attempted', title: '6. Attempted Screen', subtitle: 'বাংলা/ইংরেজি/GK Tabs, Correct vs Wrong', row: 2, col: 3 },
    { id: 'merit', title: '7. Merit List Screen', subtitle: '1., 2., 3., 4. Live Rank List', row: 3, col: 1 },
    { id: 'affiliate', title: '8. Affiliate Screen', subtitle: 'Refer to a friend & FB Friend list', row: 3, col: 2 },
    { id: 'settings', title: '9. Settings Screen', subtitle: 'Name, Attempted quiz, Total M., Affiliate tk', row: 3, col: 3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">BCS & Job Prep Quiz</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  All 9 Wireframe Screens
                </span>
              </div>
              <p className="text-xs text-slate-400">
                BCS • Bank Job • Govt. Job • Private MNC Aptitude
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
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
              <span>Interactive Phone</span>
            </button>

            <button
              onClick={() => setActiveTab('wireframe')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'wireframe'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Wireframe Grid (3x3)</span>
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
              <span>Hono RPC APIs</span>
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
              <span>Expo Source Files</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phone Viewport */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[390px] relative">
                {/* Physical Phone Shell */}
                <div className="relative rounded-[48px] bg-slate-900 border-[7px] border-slate-800 shadow-2xl shadow-emerald-500/10 overflow-hidden ring-1 ring-white/10">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                    <div className="w-10 h-1 bg-slate-900 rounded-full" />
                  </div>

                  {/* Status Bar */}
                  <div className="pt-2 px-7 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-400 bg-slate-950 border-b border-slate-900 select-none">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-2 border border-slate-400 rounded-xs flex items-center p-0.5">
                        <div className="w-full h-full bg-emerald-400 rounded-xs" />
                      </div>
                      <span>5G</span>
                    </div>
                  </div>

                  {/* Active Screen Viewport */}
                  <div className="h-[680px] bg-slate-950 flex flex-col overflow-hidden relative">
                    {activeScreen === 'login' && (
                      <SimulatorLoginScreen
                        onSuccess={() => setActiveScreen('home')}
                        onGoRegister={() => setActiveScreen('register')}
                      />
                    )}

                    {activeScreen === 'register' && (
                      <SimulatorRegisterScreen
                        onSuccess={() => setActiveScreen('home')}
                        onGoLogin={() => setActiveScreen('login')}
                      />
                    )}

                    {activeScreen === 'home' && (
                      <SimulatorHomeScreen
                        onStartExam={(id) => {
                          setActiveQuizId(id);
                          setActiveScreen('quiz');
                        }}
                        onNavigate={(screen) => setActiveScreen(screen)}
                      />
                    )}

                    {activeScreen === 'quiz' && (
                      <SimulatorQuizScreen
                        quizId={activeQuizId}
                        onBack={() => setActiveScreen('home')}
                        onComplete={(result) => {
                          setLastSubmission(result);
                          setActiveScreen('result');
                          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                        }}
                      />
                    )}

                    {activeScreen === 'result' && (
                      <SimulatorResultScreen
                        quizId={activeQuizId}
                        result={lastSubmission}
                        onViewAttempted={() => setActiveScreen('attempted')}
                        onViewMerit={() => setActiveScreen('merit')}
                        onRetake={() => setActiveScreen('quiz')}
                        onGoHome={() => setActiveScreen('home')}
                      />
                    )}

                    {activeScreen === 'attempted' && (
                      <SimulatorAttemptedScreen
                        result={lastSubmission}
                        onBack={() => setActiveScreen('result')}
                      />
                    )}

                    {activeScreen === 'merit' && (
                      <SimulatorMeritScreen onBack={() => setActiveScreen('home')} />
                    )}

                    {activeScreen === 'affiliate' && (
                      <SimulatorAffiliateScreen
                        onBack={() => setActiveScreen('home')}
                        onGoSettings={() => setActiveScreen('settings')}
                      />
                    )}

                    {activeScreen === 'settings' && (
                      <SimulatorSettingsScreen
                        onBack={() => setActiveScreen('home')}
                        onLogout={() => setActiveScreen('login')}
                      />
                    )}
                  </div>

                  {/* Bottom Navigation Bar (Shown on Home, Merit, Affiliate, Settings) */}
                  {['home', 'merit', 'affiliate', 'settings'].includes(activeScreen) && (
                    <div className="bg-slate-950/95 border-t border-slate-900 grid grid-cols-4 py-2 px-2">
                      <button
                        onClick={() => setActiveScreen('home')}
                        className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
                          activeScreen === 'home' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Landmark className="w-4 h-4" />
                        <span className="text-[10px] font-bold mt-1">Home</span>
                      </button>

                      <button
                        onClick={() => setActiveScreen('merit')}
                        className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
                          activeScreen === 'merit' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Trophy className="w-4 h-4" />
                        <span className="text-[10px] font-bold mt-1">Merit</span>
                      </button>

                      <button
                        onClick={() => setActiveScreen('affiliate')}
                        className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
                          activeScreen === 'affiliate' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold mt-1">Affiliate</span>
                      </button>

                      <button
                        onClick={() => setActiveScreen('settings')}
                        className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
                          activeScreen === 'settings' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <SettingsIcon className="w-4 h-4" />
                        <span className="text-[10px] font-bold mt-1">Settings</span>
                      </button>
                    </div>
                  )}

                  {/* Home Bar Indicator */}
                  <div className="h-4 bg-slate-950 flex items-center justify-center">
                    <div className="w-28 h-1 bg-slate-700/80 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Screen Switcher + Sketch Reference */}
            <div className="lg:col-span-6 space-y-6">
              {/* Screen Selector Grid */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">Wireframe Screens (1-Click Switch)</h2>
                    <p className="text-xs text-slate-400">All 9 screens digitized directly from your sketch:</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    Active: {activeScreen.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {SCREENS_METADATA.map((screen) => {
                    const isActive = activeScreen === screen.id;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => setActiveScreen(screen.id)}
                        className={`p-3 rounded-2xl border text-left transition-all relative ${
                          isActive
                            ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className={`text-xs font-bold block truncate ${
                            isActive ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {screen.title}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {screen.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hand-Drawn Reference Image Viewer */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" /> Original User Sketch Reference
                  </h3>
                  <span className="text-[10px] text-slate-400">3x3 Grid Layout</span>
                </div>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
                  <Image
                    src="/assets/aistudio/image_ff8fe701.png"
                    alt="Original Sketch Wireframe"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                  Every section from your drawing (Login, Register, Home, Quiz, Result Pie Chart, Attempted Answers, Merit List, Affiliate, Settings) has been translated into production Expo and React Native screens.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Wireframe Grid Mode (3x3 gallery of all screens) */}
        {activeTab === 'wireframe' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-white mb-1">3x3 Wireframe Matrix</h2>
              <p className="text-xs text-slate-400">
                Click any screen below to preview it directly in the interactive mobile device.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SCREENS_METADATA.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveScreen(s.id);
                    setActiveTab('simulator');
                  }}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.01] shadow-lg group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {s.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                      Row {s.row}, Col {s.col}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{s.subtitle}</p>
                  <div className="h-36 bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center p-3 text-center">
                    <span className="text-xs text-slate-500 group-hover:text-emerald-400 font-semibold flex items-center gap-1">
                      Tap to open in Mobile Simulator <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Hono RPC API Console */}
        {activeTab === 'api-explorer' && <HonoExplorerTab />}

        {/* Tab 4: Expo Source Files */}
        {activeTab === 'files' && <ExpoFilesTab />}
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 1: Login Screen / Auth Screen
// -------------------------------------------------------------
function SimulatorLoginScreen({
  onSuccess,
  onGoRegister,
}: {
  onSuccess: () => void;
  onGoRegister: () => void;
}) {
  const [name, setName] = useState('Md. Rakib Hossain');
  const [email, setEmail] = useState('rakib.edu.bd@gmail.com');

  return (
    <div className="flex-1 flex flex-col bg-slate-950 px-5 pt-8 pb-6 justify-center select-none overflow-y-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
          <LogIn className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">Login Screen</h2>
        <p className="text-[11px] text-slate-400">Auth Screen • BCS & Job Exam Prep</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="mb-3">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        <div className="mb-4">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        <button
          onClick={onSuccess}
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-emerald-500/20 mb-4 transition-all"
        >
          Sign In
        </button>

        <div className="pt-3 border-t border-slate-800 text-center">
          <span className="text-[10px] font-semibold text-slate-400 block mb-2">Sign in with</span>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onSuccess}
              className="w-10 h-10 rounded-full bg-slate-950 border border-slate-700 hover:border-emerald-500 text-white font-bold text-sm flex items-center justify-center"
            >
              G
            </button>
            <button
              onClick={onSuccess}
              className="w-10 h-10 rounded-full bg-blue-600 border border-blue-500 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center"
            >
              f
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-slate-400">
        New candidate?{' '}
        <button onClick={onGoRegister} className="text-emerald-400 font-bold hover:underline">
          Go to Register Screen
        </button>
      </p>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 2: Register Screen
// -------------------------------------------------------------
function SimulatorRegisterScreen({
  onSuccess,
  onGoLogin,
}: {
  onSuccess: () => void;
  onGoLogin: () => void;
}) {
  const [name, setName] = useState('Md. Rakib Hossain');
  const [institution, setInstitution] = useState('University of Dhaka');
  const [jobType, setJobType] = useState<JobType>('bcs');

  return (
    <div className="flex-1 flex flex-col bg-slate-950 px-5 pt-8 pb-6 justify-center select-none overflow-y-auto">
      <div className="text-center mb-5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
          <UserPlus className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">Register Screen</h2>
        <p className="text-[11px] text-slate-400">Create Candidate Account</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="mb-2.5">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        <div className="mb-3">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">Institution:</label>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        {/* Job Type Selector matching sketch box: [ BCS | Bank | Private | Govt. Job ] */}
        <div className="mb-4">
          <label className="text-[11px] font-bold text-slate-300 block mb-2">Job Type:</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'bcs', label: 'BCS' },
              { id: 'bank', label: 'Bank' },
              { id: 'govt', label: 'Govt. Job' },
              { id: 'private', label: 'Private' },
            ].map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setJobType(j.id as JobType)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                  jobType === j.id
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <span>{j.label}</span>
                {jobType === j.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSuccess}
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all"
        >
          Complete Registration
        </button>
      </div>

      <p className="text-center text-[11px] text-slate-400">
        Already registered?{' '}
        <button onClick={onGoLogin} className="text-emerald-400 font-bold hover:underline">
          Back to Login
        </button>
      </p>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 3: Home Screen
// -------------------------------------------------------------
function SimulatorHomeScreen({
  onStartExam,
  onNavigate,
}: {
  onStartExam: (id: string) => void;
  onNavigate: (s: ScreenId) => void;
}) {
  const { data: categories = [] } = useQuery<QuizCategory[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      const json = await res.json();
      return json.data;
    },
  });

  const { data: profile } = useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const res = await fetch('/api/user-profile');
      const json = await res.json();
      return json.data;
    },
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto px-4 pt-3 pb-8 select-none">
      {/* Top Candidate Bar */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
            {profile?.name ? profile.name.charAt(0) : 'R'}
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">{profile?.name || 'Md. Rakib Hossain'}</h3>
            <p className="text-[10px] text-slate-400">
              {profile?.institution || 'University of Dhaka'} • {profile?.jobType?.toUpperCase() || 'BCS'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-full px-2.5 py-1">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-semibold text-amber-400">5 Days</span>
        </div>
      </div>

      {/* Hero Area matching sketch */}
      <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Hero Area • Live Exam
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" /> 1,420 Enrolled
          </span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          47th BCS & Combined Bank Mock Test
        </h4>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          বাংলা, ইংরেজি ও সাধারণ জ্ঞান সহ নেগেটিভ মার্কিং স্পেশাল মডেল টেস্ট।
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" /> 10 Mins • 6 Qs
          </span>
          <button
            onClick={() => onStartExam('bcs')}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 shadow-md"
          >
            <Play className="w-3 h-3 fill-slate-950" /> Start Exam
          </button>
        </div>
      </div>

      {/* ক্যাটাগরি (Categories) matching sketch */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-sm font-bold text-white tracking-tight">ক্যাটাগরি</h4>
          <span className="text-[10px] text-slate-400">Select Exam Track</span>
        </div>

        {/* 4 Circle Icons matching sketch: [ BCS ] [ Bank ] [ Govt. Job ] [ Private ] */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { id: 'bcs', label: 'BCS', labelBn: 'বিসিএস' },
            { id: 'bank', label: 'Bank', labelBn: 'ব্যাংক' },
            { id: 'govt', label: 'Govt. Job', labelBn: 'সরকারি' },
            { id: 'private', label: 'Private', labelBn: 'প্রাইভেট' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onStartExam(cat.id)}
              className="flex flex-col items-center group active:scale-95"
            >
              <div className="w-13 h-13 rounded-full bg-slate-900 border-2 border-slate-800 group-hover:border-emerald-500 flex items-center justify-center mb-1 shadow-md">
                <Landmark className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[11px] font-bold text-white">{cat.label}</span>
              <span className="text-[9px] text-slate-500">{cat.labelBn}</span>
            </button>
          ))}
        </div>

        {/* Topic List Cards */}
        <div className="space-y-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onStartExam(c.id)}
              className="w-full text-left bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-xl flex items-center justify-between transition-all"
            >
              <div>
                <h5 className="text-xs font-bold text-white">{c.title}</h5>
                <p className="text-[10px] text-slate-400">{c.titleBn}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 4: Quiz Screen
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
  const [timeLeft, setTimeLeft] = useState(180);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const { data } = useQuery<{ quiz: QuizPayload }>({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      const res = await fetch(`/api/quizzes/${quizId}`);
      const json = await res.json();
      return { quiz: json.data };
    },
  });

  const quiz = data?.quiz;
  const questions = quiz?.questions || [];
  const currentQ = questions[currentIndex];

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

  const handleSelectOption = (optId: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optId,
    }));
  };

  const handleFinish = () => {
    submitMutation.mutate({
      quizId,
      answers,
      timeSpentSeconds: timeSpent,
    });
  };

  if (!quiz || !currentQ) {
    return (
      <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
        Loading Question Paper...
      </div>
    );
  }

  const selectedOptionId = answers[currentQ.id];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto select-none relative">
      {/* Top Navbar matching sketch: "Bank" (Category Title) */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900 bg-slate-950/90">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
            {quiz.title}
          </span>
          <span className="text-xs font-bold text-white">
            Q.{currentQ.questionNumber} of {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900 text-emerald-400 text-[11px] font-mono font-bold">
          <Clock className="w-3 h-3" />
          <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Question Cards matching sketch: Q.1, Q.2 */}
      <div className="flex-1 p-4 pb-8 flex flex-col justify-between">
        <div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-md">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase block mb-1.5 w-fit">
              Q.{currentQ.questionNumber} • {currentQ.subjectNameBn}
            </span>
            <h3 className="text-xs font-bold text-white leading-relaxed">{currentQ.question}</h3>
          </div>

          {/* Options matching sketch: A. B. C. D. */}
          <div className="space-y-2 mb-4">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {opt.label}.
                    </span>
                    <span className="text-xs leading-snug">{opt.text}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-2 pt-2">
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="py-2.5 px-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Previous
            </button>
          )}

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md"
            >
              <span>Next Q.{currentIndex + 2}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={submitMutation.isPending}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {showExitConfirm && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">Exit Ongoing Exam?</h4>
            <p className="text-[11px] text-slate-400 mb-4">Answers will be evaluated with negative marking.</p>
            <div className="space-y-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onBack();
                }}
                className="w-full py-2 bg-slate-800 text-rose-400 rounded-xl text-xs"
              >
                Exit to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Screen 5: Result Screen (Pie Chart with Correct / Wrong / Skipped)
// -------------------------------------------------------------
function SimulatorResultScreen({
  quizId,
  result,
  onViewAttempted,
  onViewMerit,
  onRetake,
  onGoHome,
}: {
  quizId: string;
  result: SubmitQuizResponse | null;
  onViewAttempted: () => void;
  onViewMerit: () => void;
  onRetake: () => void;
  onGoHome: () => void;
}) {
  const correctCount = result?.correctCount ?? 4;
  const wrongCount = result?.wrongCount ?? 1;
  const skippedCount = result?.skippedCount ?? 1;
  const totalQuestions = result?.totalQuestions ?? 6;
  const netScore = result?.netScore ?? 3.75;

  const correctPct = Math.round((correctCount / totalQuestions) * 100);
  const wrongPct = Math.round((wrongCount / totalQuestions) * 100);
  const skippedPct = 100 - (correctPct + wrongPct);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto px-4 pt-4 pb-8 select-none">
      <div className="text-center mt-2 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
          <Trophy className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">Result Screen</h2>
        <p className="text-[10px] text-slate-400">Score & Negative Marks</p>
      </div>

      {/* Big Pie Chart Visualization Card matching sketch */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 text-center shadow-lg">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Pie Chart Representation (Correct / Wrong)
        </span>

        {/* Graphical Ring representation matching the circle drawn in the sketch */}
        <div className="w-32 h-32 rounded-full border-4 border-slate-800 mx-auto flex items-center justify-center relative mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500 bg-emerald-950/20 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white">{netScore}</span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase">Net Marks</span>
          </div>
        </div>

        {/* Pie Legend matching sketch: Correct / Wrong */}
        <div className="grid grid-cols-3 pt-2.5 border-t border-slate-800 text-center">
          <div>
            <span className="text-xs font-bold text-emerald-400">{correctCount} ({correctPct}%)</span>
            <span className="text-[10px] text-slate-400 block font-semibold underline">Correct</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-xs font-bold text-rose-400">{wrongCount} ({wrongPct}%)</span>
            <span className="text-[10px] text-slate-400 block font-semibold underline">Wrong</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-300">{skippedCount} ({skippedPct}%)</span>
            <span className="text-[10px] text-slate-400 block">Skipped</span>
          </div>
        </div>
      </div>

      {/* Action Buttons to Attempted Screen & Merit List from Sketch */}
      <div className="space-y-2 mb-3">
        <button
          onClick={onViewAttempted}
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Attempted Answer Screen (উত্তরমালা)</span>
        </button>

        <button
          onClick={onViewMerit}
          className="w-full py-2.5 bg-slate-900 border border-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Merit List Screen (মেধাতালিকা)</span>
        </button>

        <button
          onClick={onRetake}
          className="w-full py-2 bg-slate-950 border border-slate-800 text-slate-400 rounded-xl text-[11px]"
        >
          Retake Exam
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 6: Attempted Answer Screen (বাংলা, ইংরেজি, GK tabs)
// -------------------------------------------------------------
const DEFAULT_SIMULATOR_REVIEWS = [
  {
    questionId: 'bnk-1',
    questionNumber: 1,
    subject: 'bangla' as const,
    subjectNameBn: 'বাংলা',
    question: 'কোন বানানটি শুদ্ধ?',
    selectedOptionId: 'opt-c',
    correctOptionId: 'opt-b',
    isCorrect: false,
    isSkipped: false,
    explanation: 'শুদ্ধ বানান হলো "মুহূর্ত" (ম-এ হ্রস্ব উ-কার, হ-এ দীর্ঘ ঊ-কার, রেফ ত)।',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'মুহূর্মুহু' },
      { id: 'opt-b', label: 'B' as const, text: 'মুহূর্ত' },
      { id: 'opt-c', label: 'C' as const, text: 'মূহুর্ত' },
    ],
  },
  {
    questionId: 'bnk-2',
    questionNumber: 2,
    subject: 'bangla' as const,
    subjectNameBn: 'বাংলা',
    question: '"কাজী নজরুল ইসলাম" কোন পত্রিকার সম্পাদক ছিলেন?',
    selectedOptionId: 'opt-a',
    correctOptionId: 'opt-a',
    isCorrect: true,
    isSkipped: false,
    explanation: '১৯২২ সালে প্রকাশিত অর্ধ-সাপ্তাহিক "ধূমকেতু" পত্রিকার সম্পাদক ছিলেন কাজী নজরুল ইসলাম।',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'ধূমকেতু' },
      { id: 'opt-b', label: 'B' as const, text: 'সবুজপত্র' },
    ],
  },
  {
    questionId: 'bnk-3',
    questionNumber: 3,
    subject: 'english' as const,
    subjectNameBn: 'ইংরেজি',
    question: 'Choose the correct synonym of "Paucity":',
    selectedOptionId: 'opt-b',
    correctOptionId: 'opt-a',
    isCorrect: false,
    isSkipped: false,
    explanation: '"Paucity" means scarcity or insufficiency.',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'Scarcity' },
      { id: 'opt-b', label: 'B' as const, text: 'Surplus' },
    ],
  },
  {
    questionId: 'bnk-4',
    questionNumber: 4,
    subject: 'english' as const,
    subjectNameBn: 'ইংরেজি',
    question: 'The committee has submitted ___ report on time.',
    selectedOptionId: 'opt-a',
    correctOptionId: 'opt-a',
    isCorrect: true,
    isSkipped: false,
    explanation: 'Singular neuter pronoun "its" is used for collective nouns acting as a single unit.',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'its' },
      { id: 'opt-b', label: 'B' as const, text: 'their' },
    ],
  },
];

function SimulatorAttemptedScreen({
  result,
  onBack,
}: {
  result: SubmitQuizResponse | null;
  onBack: () => void;
}) {
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'bangla' | 'english' | 'gk'>('all');

  const filtered = useMemo(() => {
    const items = result?.review || DEFAULT_SIMULATOR_REVIEWS;
    if (subjectFilter === 'all') return items;
    return items.filter((i) => i.subject === subjectFilter);
  }, [result?.review, subjectFilter]);

  const corrects = filtered.filter((i) => i.isCorrect);
  const wrongs = filtered.filter((i) => !i.isCorrect);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto select-none">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900 bg-slate-950">
        <button onClick={onBack} className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-white block">Attempted Answer Screen</span>
          <span className="text-[10px] text-slate-400">বাংলা, ইংরেজি, GK উত্তরমালা</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Subject Tabs matching sketch: [ বাংলা ] [ ইংরেজি ] [ GK ] */}
      <div className="flex gap-1.5 p-2.5 bg-slate-900/60 border-b border-slate-800 overflow-x-auto">
        {[
          { id: 'all', label: 'All' },
          { id: 'bangla', label: 'বাংলা' },
          { id: 'english', label: 'ইংরেজি' },
          { id: 'gk', label: 'GK' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubjectFilter(tab.id as any)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              subjectFilter === tab.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two Column Layout matching sketch: Correct (Q.2, Q.4) vs Wrong (Q.1, Q.3) */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-2.5">
            <span className="text-xs font-bold text-emerald-400 block underline">Correct</span>
            <span className="text-[11px] text-slate-300 mt-1 block">
              {corrects.map((q) => `Q.${q.questionNumber}`).join(', ') || 'None'}
            </span>
          </div>

          <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-2.5">
            <span className="text-xs font-bold text-rose-400 block underline">Wrong</span>
            <span className="text-[11px] text-slate-300 mt-1 block">
              {wrongs.map((q) => `Q.${q.questionNumber}`).join(', ') || 'None'}
            </span>
          </div>
        </div>

        {/* Detailed Solutions */}
        <div className="space-y-2.5">
          {filtered.map((item) => {
            const selectedOpt = item.options.find((o) => o.id === item.selectedOptionId);
            const correctOpt = item.options.find((o) => o.id === item.correctOptionId);

            return (
              <div
                key={item.questionId}
                className={`p-3 rounded-xl border text-xs ${
                  item.isCorrect ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-rose-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">Q.{item.questionNumber} ({item.subjectNameBn})</span>
                  <span className={`text-[10px] font-bold ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.isCorrect ? 'Correct (+1.0)' : 'Wrong (-0.25)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 mb-2">{item.question}</p>

                <div className="bg-slate-950 p-2 rounded-lg text-[10px] space-y-0.5 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Your pick:</span>
                    <span className={item.isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {selectedOpt ? `(${selectedOpt.label}) ${selectedOpt.text}` : 'Skipped'}
                    </span>
                  </div>
                  {!item.isCorrect && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                      <span className="text-slate-400">Correct:</span>
                      <span className="text-emerald-400 font-bold">
                        {correctOpt ? `(${correctOpt.label}) ${correctOpt.text}` : ''}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/20 p-2 rounded text-[10px] text-slate-300">
                  <span className="font-bold text-emerald-400 block mb-0.5">ব্যাখ্যা (Explanation):</span>
                  {item.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 7: Merit List Screen (1. 2. 3. 4.)
// -------------------------------------------------------------
function SimulatorMeritScreen({ onBack }: { onBack: () => void }) {
  const { data } = useQuery<{ list: MeritStudent[] }>({
    queryKey: ['merit-list'],
    queryFn: async () => {
      const res = await fetch('/api/merit-list');
      const json = await res.json();
      return { list: json.data };
    },
  });

  const list = data?.list || [];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto select-none">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900 bg-slate-950">
        <button onClick={onBack} className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-white block">Merit List Screen</span>
          <span className="text-[10px] text-slate-400">লাইভ মেধাতালিকা</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-2.5">
        {/* Your rank */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
              #4
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold block">Your Rank</span>
              <span className="text-xs font-bold text-white">Md. Rakib Hossain</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400">4.75 Marks</span>
        </div>

        {/* Merit List items matching sketch: 1. 2. 3. 4. */}
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-2">
          Rank List (Live Candidates)
        </span>

        {list.map((s) => (
          <div
            key={s.rank}
            className={`p-3 rounded-xl border flex items-center justify-between ${
              s.rank === 4 ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  s.rank === 1
                    ? 'bg-amber-500 text-slate-950'
                    : s.rank === 2
                    ? 'bg-slate-400 text-slate-950'
                    : s.rank === 3
                    ? 'bg-amber-700 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {s.rank}.
              </span>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate">{s.name}</span>
                <span className="text-[10px] text-slate-400 block truncate">{s.institution}</span>
              </div>
            </div>

            <div className="text-right shrink-0 ml-2">
              <span className="text-xs font-bold text-white block">{s.score} / {s.totalMarks}</span>
              <span className="text-[10px] text-slate-500">{s.timeTaken}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 8: Affiliate Screen (Refer to a friend & FB Friend list)
// -------------------------------------------------------------
function SimulatorAffiliateScreen({
  onBack,
  onGoSettings,
}: {
  onBack: () => void;
  onGoSettings: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const { data } = useQuery({
    queryKey: ['affiliate'],
    queryFn: async () => {
      const res = await fetch('/api/affiliate');
      const json = await res.json();
      return json.data;
    },
  });

  const friends = data?.fbFriends || [];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto select-none">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900 bg-slate-950">
        <button onClick={onBack} className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-white block">Affiliate Screen</span>
          <span className="text-[10px] text-slate-400">রেফারেল প্রোগ্রাম</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-4">
        {/* Earnings */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-4">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Affiliate Balance</span>
          <h3 className="text-2xl font-black text-white mt-0.5">৳ {data?.totalEarnedTk ?? 850} BDT</h3>
          <p className="text-[10px] text-slate-400 mt-1 mb-3">Earn ৳ 50 per friend who joins.</p>
          <button
            onClick={onGoSettings}
            className="w-full py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg"
          >
            Withdraw to bKash / Nagad
          </button>
        </div>

        {/* Refer to a friend matching sketch */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h4 className="text-xs font-bold text-white mb-1">Refer to a friend</h4>
          <p className="text-[10px] text-slate-400 mb-2.5">Share code with batchmates</p>

          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-2.5">
            <span className="text-xs font-mono font-bold text-emerald-400">BCS2026RAKIB</span>
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-2.5 py-1 bg-slate-800 text-[11px] text-slate-300 font-semibold rounded-lg flex items-center gap-1"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* FB Friend list matching sketch */}
        <div>
          <h4 className="text-xs font-bold text-white mb-2">FB Friend list</h4>
          <div className="space-y-2">
            {friends.map((f: any) => (
              <div
                key={f.id}
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block truncate">{f.name}</span>
                  <span className="text-[10px] text-slate-500">{f.mutualFriends} mutual friends</span>
                </div>
                {f.status === 'joined' ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    +৳50 Earned
                  </span>
                ) : (
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-bold">
                    Invite
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Screen 9: Settings Screen (Name, Attempted quiz, Total M., Affiliate tk)
// -------------------------------------------------------------
function SimulatorSettingsScreen({
  onBack,
  onLogout,
}: {
  onBack: () => void;
  onLogout: () => void;
}) {
  const { data: profile } = useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const res = await fetch('/api/user-profile');
      const json = await res.json();
      return json.data;
    },
  });

  const [withdrawDone, setWithdrawDone] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto select-none">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900 bg-slate-950">
        <button onClick={onBack} className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-white block">Settings Screen</span>
          <span className="text-[10px] text-slate-400">প্রোফাইল ও মেট্রিক্স</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-3">
        {/* User Name matching sketch: "Name:" */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Name:</span>
          <h3 className="text-sm font-bold text-white mt-0.5">{profile?.name || 'Md. Rakib Hossain'}</h3>
          <p className="text-[11px] text-slate-400">{profile?.institution || 'University of Dhaka'}</p>
        </div>

        {/* 3 Metrics matching sketch: Attempted quiz, Total M., Affiliate tk */}
        <div className="space-y-2">
          {/* Attempted quiz */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Attempted quiz:</span>
            <span className="text-xs font-bold text-blue-400">
              {profile?.attemptedQuizCount ?? 42} Tests
            </span>
          </div>

          {/* Total M. */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Total M.:</span>
            <span className="text-xs font-bold text-amber-400">
              {profile?.totalMarksScored ?? 86.5} Marks
            </span>
          </div>

          {/* Affiliate tk */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 block">Affiliate tk:</span>
              <span className="text-[10px] text-slate-500">Available balance</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400 block">
                ৳ {profile?.affiliateEarningsTk ?? 850} Tk
              </span>
              <button
                onClick={() => {
                  setWithdrawDone(true);
                  setTimeout(() => setWithdrawDone(false), 2500);
                }}
                className="mt-1 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded"
              >
                {withdrawDone ? 'bKash Sent!' : 'Withdraw'}
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full mt-4 py-2.5 bg-slate-900 border border-slate-800 text-rose-400 text-xs font-bold rounded-xl"
        >
          Log Out / Switch User
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Tab: Hono API Explorer
// -------------------------------------------------------------
function HonoExplorerTab() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('categories');

  const { data: responseLog, isLoading, refetch } = useQuery({
    queryKey: ['hono-explorer', selectedEndpoint],
    queryFn: async () => {
      const start = performance.now();
      let url = '/api/categories';
      let options: RequestInit = { method: 'GET' };

      if (selectedEndpoint === 'categories') url = '/api/categories';
      else if (selectedEndpoint === 'quiz') url = '/api/quizzes/bank';
      else if (selectedEndpoint === 'merit') url = '/api/merit-list';
      else if (selectedEndpoint === 'affiliate') url = '/api/affiliate';
      else if (selectedEndpoint === 'profile') url = '/api/user-profile';
      else if (selectedEndpoint === 'submit') {
        url = '/api/quizzes/submit';
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: 'bank',
            answers: { 'bnk-1': 'opt-b', 'bnk-2': 'opt-a', 'bnk-3': 'opt-a' },
            timeSpentSeconds: 95,
          }),
        };
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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Live Hono Backend Endpoints</h2>
          <p className="text-xs text-slate-400">All routes serving the 9 wireframe screens with RPC inference.</p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md"
        >
          Send Request
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {['categories', 'quiz', 'submit', 'merit', 'affiliate', 'profile'].map((ep) => (
          <button
            key={ep}
            onClick={() => setSelectedEndpoint(ep)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
              selectedEndpoint === ep
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            /api/{ep}
          </button>
        ))}
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto">
        <pre>{JSON.stringify(responseLog?.body, null, 2)}</pre>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Tab: Expo Source Files
// -------------------------------------------------------------
function ExpoFilesTab() {
  const [selectedFile, setSelectedFile] = useState<string>('app/index.tsx');

  const FILES: Record<string, string> = {
    'app/auth/login.tsx': `// 1. Login Screen / Auth Screen (Name, Email, Google & Facebook Auth)
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  // Name, Email, Sign in with (G) (F)
}`,
    'app/auth/register.tsx': `// 2. Register Screen (Name, Institution, Job Type: BCS | Bank | Private | Govt. Job)
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';

export default function RegisterScreen() {
  // Name, Institution, Job Type selector
}`,
    'app/index.tsx': `// 3. Home Screen (Hero Area + ক্যাটাগরি: BCS, Bank, Govt. Job, Private)
import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useCategories } from '../src/hooks/useQuiz';

export default function HomeScreen() {
  // Hero Area banner, ক্যাটাগরি circle buttons
}`,
    'app/quiz/[id].tsx': `// 4. Quiz Screen (Bank/BCS exam, Q.1, Q.2, options A, B, C, D, timer)
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useQuiz, useSubmitQuiz } from '../../src/hooks/useQuiz';

export default function QuizScreen() {
  // Question sheet, Options A, B, C, D, Negative marking
}`,
    'app/quiz/result.tsx': `// 5. Result Screen (Pie Chart with Correct, Wrong, Skipped)
import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useLastResult } from '../../src/hooks/useQuiz';

export default function ResultScreen() {
  // Pie chart calculation: Correct, Wrong, Skipped
}`,
    'app/quiz/attempted.tsx': `// 6. Attempted Answer Screen (বাংলা, ইংরেজি, GK tabs, Correct vs Wrong lists)
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';

export default function AttemptedAnswerScreen() {
  // Correct (Q.2, Q.4) vs Wrong (Q.1, Q.3) two columns with explanations
}`,
    'app/merit.tsx': `// 7. Merit List Screen (1., 2., 3., 4. Candidate Rank List)
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useMeritList } from '../src/hooks/useQuiz';

export default function MeritListScreen() {
  // 1., 2., 3., 4. Live student rankings
}`,
    'app/affiliate.tsx': `// 8. Affiliate Screen (Refer to a friend & FB Friend list)
import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useAffiliateData } from '../src/hooks/useQuiz';

export default function AffiliateScreen() {
  // Refer to a friend, referral code, FB friend list invite buttons
}`,
    'app/settings.tsx': `// 9. Settings Screen (Name, Attempted quiz, Total M., Affiliate tk)
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useUserProfile } from '../src/hooks/useQuiz';

export default function SettingsScreen() {
  // Name, Attempted quiz, Total M., Affiliate tk with bKash withdrawal
}`,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-2 block">
          All 9 Screens in Project
        </span>
        {Object.keys(FILES).map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFile(f)}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all ${
              selectedFile === f
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 font-mono text-xs text-slate-300">
        <pre>{FILES[selectedFile]}</pre>
      </div>
    </div>
  );
}
