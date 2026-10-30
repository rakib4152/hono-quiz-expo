import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Code2,
  Sparkles,
  HelpCircle,
  Check,
  RotateCcw,
} from 'lucide-react-native';
import { useQuiz, useSubmitQuiz } from '../../src/hooks/useQuiz';

export default function QuizExecutionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fetch full quiz payload and answer verification keys via TanStack Query
  const { data, isLoading, isError, error, refetch } = useQuiz(id || '');
  const quiz = data?.quiz;
  const feedbackKey = data?.feedbackKey || {};

  const submitMutation = useSubmitQuiz();

  // Screen State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeSpentTotal, setTimeSpentTotal] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const questions = useMemo(() => quiz?.questions || [], [quiz]);
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const handleTimeExpire = () => {
    setIsAnswered(true);
  };

  // Countdown timer per question
  useEffect(() => {
    if (!currentQuestion || isAnswered || isLoading) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpentTotal((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, isLoading, currentQuestion]);

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(optionId);
    setIsAnswered(true);

    const updated = {
      ...answers,
      [currentQuestion.id]: optionId,
    };
    setAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(25);
    } else {
      // Completed all questions -> Submit to Hono Backend
      submitQuizResults();
    }
  };

  const submitQuizResults = () => {
    if (!quiz) return;

    submitMutation.mutate(
      {
        quizId: quiz.id,
        answers,
        timeSpentSeconds: timeSpentTotal,
      },
      {
        onSuccess: (resultData) => {
          router.replace({
            pathname: '/quiz/result',
            params: {
              quizId: quiz.id,
              scorePercentage: String(resultData.scorePercentage),
              correctCount: String(resultData.correctCount),
              totalQuestions: String(resultData.totalQuestions),
              timeSpentSeconds: String(resultData.timeSpentSeconds),
            },
          });
        },
        onError: (err) => {
          // Fallback navigation in case of temporary offline/network
          router.replace({
            pathname: '/quiz/result',
            params: { quizId: quiz.id },
          });
        },
      }
    );
  };

  const handleAttemptBack = () => {
    // Intercept back action to prompt confirmation modal
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    if (timerRef.current) clearInterval(timerRef.current);
    router.replace('/');
  };

  // Loading Screen
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center p-6">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="text-base font-bold text-white mt-4">Preparing Question Arena...</Text>
        <Text className="text-xs text-slate-400 mt-1">Connecting to Hono RPC client</Text>
      </SafeAreaView>
    );
  }

  // Error Screen
  if (isError || !currentQuestion) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center p-6">
        <AlertTriangle size={36} color="#f43f5e" />
        <Text className="text-lg font-bold text-white mt-3">Unable to Load Quiz</Text>
        <Text className="text-xs text-slate-400 text-center mt-1 mb-5">
          {error?.message || 'The requested quiz was not found in the question bank.'}
        </Text>
        <Pressable
          onPress={() => router.replace('/')}
          className="bg-slate-800 px-5 py-2.5 rounded-xl border border-slate-700"
        >
          <Text className="text-xs font-bold text-white">Return to Categories</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const correctOptionId = feedbackKey[currentQuestion.id];
  const isCorrectSelection = selectedOption === correctOptionId;

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Top Navigation Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-900 bg-slate-950">
        <Pressable
          onPress={handleAttemptBack}
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 items-center justify-center"
        >
          <ArrowLeft size={18} color="#e2e8f0" />
        </Pressable>

        {/* Quiz Topic Title */}
        <View className="items-center">
          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {quiz?.title}
          </Text>
          <Text className="text-sm font-bold text-white">
            Question {currentIndex + 1} of {totalQuestions}
          </Text>
        </View>

        {/* Countdown Timer Badge */}
        <View
          className={`flex-row items-center px-3 py-1.5 rounded-full border ${
            timeLeft <= 5
              ? 'bg-rose-500/20 border-rose-500/40'
              : timeLeft <= 10
              ? 'bg-amber-500/20 border-amber-500/40'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <Clock
            size={14}
            color={timeLeft <= 5 ? '#f43f5e' : timeLeft <= 10 ? '#f59e0b' : '#10b981'}
          />
          <Text
            className={`text-xs font-bold ml-1.5 ${
              timeLeft <= 5
                ? 'text-rose-400'
                : timeLeft <= 10
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {timeLeft}s
          </Text>
        </View>
      </View>

      {/* Dynamic Progress Bar */}
      <View className="w-full bg-slate-900 h-1.5">
        <View
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-10" showsVerticalScrollIndicator={false}>
        {/* Difficulty & Points Pill */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            <Sparkles size={12} color="#10b981" />
            <Text className="text-[11px] font-semibold text-emerald-400 uppercase ml-1.5">
              +{currentQuestion.points} Points
            </Text>
          </View>

          <View className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            <Text className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              {currentQuestion.difficulty}
            </Text>
          </View>
        </View>

        {/* Question Prompt Card */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-4 shadow-xl">
          <Text className="text-lg font-bold text-white leading-relaxed">
            {currentQuestion.question}
          </Text>

          {/* Code Snippet Box (if applicable) */}
          {currentQuestion.codeSnippet && (
            <View className="mt-3.5 bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <View className="flex-row items-center justify-between mb-2 pb-1.5 border-b border-slate-900">
                <View className="flex-row items-center">
                  <Code2 size={13} color="#94a3b8" />
                  <Text className="text-[11px] font-mono text-slate-400 ml-1.5">snippet.ts</Text>
                </View>
                <View className="flex-row space-x-1">
                  <View className="w-2 h-2 rounded-full bg-rose-500/70" />
                  <View className="w-2 h-2 rounded-full bg-amber-500/70" />
                  <View className="w-2 h-2 rounded-full bg-emerald-500/70" />
                </View>
              </View>
              <Text className="text-xs font-mono text-emerald-300 leading-relaxed">
                {currentQuestion.codeSnippet}
              </Text>
            </View>
          )}
        </View>

        {/* Options List with Immediate Feedback Styling */}
        <View className="space-y-3 mb-6">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === correctOptionId;

            // Immediate state feedback styling:
            // emerald-500 for correct answers, rose-500 for incorrect options upon selection
            let containerStyle = 'bg-slate-900/90 border-slate-800';
            let labelStyle = 'bg-slate-800 text-slate-300';
            let textStyle = 'text-slate-200';
            let rightIcon = null;

            if (isAnswered) {
              if (isCorrect) {
                // Correct option (always highlighted green once revealed)
                containerStyle = 'bg-emerald-950/40 border-emerald-500 shadow-emerald-900/20';
                labelStyle = 'bg-emerald-500 text-slate-950 font-bold';
                textStyle = 'text-emerald-200 font-semibold';
                rightIcon = <CheckCircle2 size={18} color="#10b981" />;
              } else if (isSelected && !isCorrect) {
                // User picked the wrong option (rose-500)
                containerStyle = 'bg-rose-950/40 border-rose-500 shadow-rose-900/20';
                labelStyle = 'bg-rose-500 text-white font-bold';
                textStyle = 'text-rose-200 font-semibold';
                rightIcon = <XCircle size={18} color="#f43f5e" />;
              } else {
                // Other unselected options dimmed
                containerStyle = 'bg-slate-900/40 border-slate-850 opacity-40';
              }
            } else if (isSelected) {
              containerStyle = 'bg-slate-800 border-emerald-500';
            }

            return (
              <Pressable
                key={opt.id}
                disabled={isAnswered}
                onPress={() => handleOptionSelect(opt.id)}
                className={`p-4 rounded-2xl border transition-all flex-row items-center justify-between mb-3 ${containerStyle}`}
              >
                <View className="flex-row items-center flex-1 mr-3">
                  <View
                    className={`w-8 h-8 rounded-xl items-center justify-center mr-3 ${labelStyle}`}
                  >
                    <Text className="text-xs font-bold">{opt.label}</Text>
                  </View>
                  <Text className={`text-sm flex-1 leading-snug ${textStyle}`}>{opt.text}</Text>
                </View>

                {rightIcon}
              </Pressable>
            );
          })}
        </View>

        {/* Immediate Rationale Banner upon answering */}
        {isAnswered && (
          <View
            className={`border rounded-2xl p-4 mb-6 ${
              isCorrectSelection
                ? 'bg-emerald-950/30 border-emerald-500/40'
                : 'bg-rose-950/30 border-rose-500/40'
            }`}
          >
            <View className="flex-row items-center mb-1.5">
              {isCorrectSelection ? (
                <>
                  <CheckCircle2 size={16} color="#10b981" />
                  <Text className="text-xs font-bold text-emerald-400 ml-1.5">
                    Correct! +{currentQuestion.points} points
                  </Text>
                </>
              ) : (
                <>
                  <XCircle size={16} color="#f43f5e" />
                  <Text className="text-xs font-bold text-rose-400 ml-1.5">
                    Incorrect — Review the correct answer above
                  </Text>
                </>
              )}
            </View>
            <Text className="text-xs text-slate-300 leading-relaxed">
              {isCorrectSelection
                ? 'Great job! You identified the correct implementation pattern.'
                : 'Notice how the correct choice handles the architecture or type guarantees.'}
            </Text>
          </View>
        )}

        {/* Action Button: Next Question or View Results */}
        {isAnswered && (
          <Pressable
            onPress={handleNextQuestion}
            disabled={submitMutation.isPending}
            className="w-full bg-emerald-500 active:bg-emerald-600 rounded-2xl py-4 flex-row items-center justify-center shadow-lg shadow-emerald-500/20"
          >
            {submitMutation.isPending ? (
              <ActivityIndicator size="small" color="#020617" />
            ) : (
              <>
                <Text className="text-base font-bold text-slate-950 mr-2">
                  {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Submit & View Results'}
                </Text>
                <ChevronRight size={18} color="#020617" />
              </>
            )}
          </Pressable>
        )}
      </ScrollView>

      {/* Confirmation Modal when backing out mid-quiz */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showExitModal}
        onRequestClose={() => setShowExitModal(false)}
      >
        <View className="flex-1 bg-black/80 items-center justify-center p-5">
          <View className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <View className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} color="#f59e0b" />
            </View>

            <Text className="text-xl font-bold text-white text-center mb-2">
              Abandon Current Quiz?
            </Text>
            <Text className="text-xs text-slate-400 text-center leading-relaxed mb-6">
              You are currently on Question {currentIndex + 1} of {totalQuestions}. If you exit
              now, your answers for this session will not be saved.
            </Text>

            <View className="space-y-3">
              <Pressable
                onPress={() => setShowExitModal(false)}
                className="w-full bg-emerald-500 rounded-2xl py-3.5 items-center justify-center mb-2.5"
              >
                <Text className="text-sm font-bold text-slate-950">Continue Quiz</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmExit}
                className="w-full bg-slate-800 border border-slate-700/80 rounded-2xl py-3.5 items-center justify-center"
              >
                <Text className="text-sm font-semibold text-rose-400">Exit Arena</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
