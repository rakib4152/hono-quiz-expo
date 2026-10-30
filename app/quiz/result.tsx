import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  BookOpen,
  Share2,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react-native';
import { useLastResult } from '../../src/hooks/useQuiz';

export default function QuizResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    quizId?: string;
    scorePercentage?: string;
    correctCount?: string;
    totalQuestions?: string;
    timeSpentSeconds?: string;
  }>();

  // Read rich evaluation response from TanStack Query cache
  const { data: cachedResult } = useLastResult();

  const quizId = cachedResult?.quizId || params.quizId || 'react-native';
  const scorePercentage = cachedResult?.scorePercentage ?? Number(params.scorePercentage || 0);
  const correctCount = cachedResult?.correctCount ?? Number(params.correctCount || 0);
  const totalQuestions = cachedResult?.totalQuestions ?? Number(params.totalQuestions || 0);
  const timeSpent = cachedResult?.timeSpentSeconds ?? Number(params.timeSpentSeconds || 0);
  const passed = cachedResult?.passed ?? scorePercentage >= 70;
  const pointsEarned = cachedResult?.pointsEarned ?? correctCount * 20;

  const reviewList = cachedResult?.review || [];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleRetake = () => {
    router.replace({
      pathname: '/quiz/[id]',
      params: { id: quizId },
    });
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-4 pt-4 pb-12" showsVerticalScrollIndicator={false}>
        {/* Header Title */}
        <View className="items-center mt-2 mb-6">
          <View
            className={`w-16 h-16 rounded-3xl items-center justify-center mb-3 border ${
              passed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <Trophy size={32} color={passed ? '#10b981' : '#f59e0b'} />
          </View>
          <Text className="text-2xl font-bold text-white tracking-tight">Quiz Complete!</Text>
          <Text className="text-xs text-slate-400 mt-1 font-medium">
            {cachedResult?.title || 'Engineering Assessment Summary'}
          </Text>
        </View>

        {/* Animated Score Summary Card */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-2xl items-center">
          {/* Circular Percentage Ring */}
          <View className="w-32 h-32 rounded-full border-4 border-slate-800 items-center justify-center mb-4 relative">
            <View
              className={`w-28 h-28 rounded-full items-center justify-center border-4 ${
                passed ? 'border-emerald-500 bg-emerald-950/20' : 'border-amber-500 bg-amber-950/20'
              }`}
            >
              <Text className="text-3xl font-extrabold text-white">{scorePercentage}%</Text>
              <Text className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Accuracy
              </Text>
            </View>
          </View>

          {/* Performance Badge */}
          <View
            className={`px-4 py-1.5 rounded-full border mb-4 ${
              scorePercentage >= 90
                ? 'bg-emerald-500/20 border-emerald-500/40'
                : passed
                ? 'bg-cyan-500/20 border-cyan-500/40'
                : 'bg-amber-500/20 border-amber-500/40'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                scorePercentage >= 90
                  ? 'text-emerald-400'
                  : passed
                  ? 'text-cyan-400'
                  : 'text-amber-400'
              }`}
            >
              {scorePercentage >= 90
                ? 'Mastery Level Achieved!'
                : passed
                ? 'Passed Requirements (>= 70%)'
                : 'Needs Review — Keep Practicing'}
            </Text>
          </View>

          {/* Metrics Grid */}
          <View className="w-full grid grid-cols-3 flex-row justify-between pt-4 border-t border-slate-800">
            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <CheckCircle2 size={13} color="#10b981" />
                <Text className="text-xs text-slate-400 ml-1">Correct</Text>
              </View>
              <Text className="text-base font-bold text-emerald-400">
                {correctCount} / {totalQuestions}
              </Text>
            </View>

            <View className="w-px h-8 bg-slate-800" />

            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <Clock size={13} color="#94a3b8" />
                <Text className="text-xs text-slate-400 ml-1">Time</Text>
              </View>
              <Text className="text-base font-bold text-white">{formatTime(timeSpent)}</Text>
            </View>

            <View className="w-px h-8 bg-slate-800" />

            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <Sparkles size={13} color="#f59e0b" />
                <Text className="text-xs text-slate-400 ml-1">Points</Text>
              </View>
              <Text className="text-base font-bold text-amber-400">+{pointsEarned}</Text>
            </View>
          </View>
        </View>

        {/* Detailed Question Review List */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <BookOpen size={18} color="#10b981" />
              <Text className="text-base font-bold text-white ml-2">Questions & Explanations</Text>
            </View>
            <Text className="text-xs text-slate-400">
              {reviewList.length} questions evaluated
            </Text>
          </View>

          {reviewList.length === 0 ? (
            <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 items-center">
              <Text className="text-xs text-slate-400">
                Full review details recorded in Hono server session.
              </Text>
            </View>
          ) : (
            reviewList.map((item, index) => {
              const selectedOpt = item.options.find((o) => o.id === item.selectedOptionId);
              const correctOpt = item.options.find((o) => o.id === item.correctOptionId);

              return (
                <View
                  key={item.questionId}
                  className={`border rounded-2xl p-4 mb-4 ${
                    item.isCorrect
                      ? 'bg-slate-900/90 border-slate-800'
                      : 'bg-slate-900/90 border-rose-950/80'
                  }`}
                >
                  {/* Status & Question Number */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Question {index + 1}
                    </Text>

                    <View
                      className={`flex-row items-center px-2 py-0.5 rounded-full ${
                        item.isCorrect ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                      }`}
                    >
                      {item.isCorrect ? (
                        <>
                          <CheckCircle2 size={13} color="#10b981" />
                          <Text className="text-[11px] font-bold text-emerald-400 ml-1">
                            Correct
                          </Text>
                        </>
                      ) : (
                        <>
                          <XCircle size={13} color="#f43f5e" />
                          <Text className="text-[11px] font-bold text-rose-400 ml-1">
                            Incorrect
                          </Text>
                        </>
                      )}
                    </View>
                  </View>

                  <Text className="text-sm font-semibold text-white mb-2 leading-relaxed">
                    {item.question}
                  </Text>

                  {/* Code snippet if present */}
                  {item.codeSnippet && (
                    <View className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 mb-3">
                      <Text className="text-[11px] font-mono text-emerald-300">
                        {item.codeSnippet}
                      </Text>
                    </View>
                  )}

                  {/* User Answer vs Correct Answer */}
                  <View className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 mb-3">
                    <View className="flex-row items-start mb-2">
                      <Text className="text-xs font-semibold text-slate-400 w-24">
                        Your Answer:
                      </Text>
                      <Text
                        className={`text-xs font-medium flex-1 ${
                          item.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {selectedOpt ? `(${selectedOpt.label}) ${selectedOpt.text}` : 'Unanswered / Timed out'}
                      </Text>
                    </View>

                    {!item.isCorrect && (
                      <View className="flex-row items-start pt-2 border-t border-slate-900">
                        <Text className="text-xs font-semibold text-slate-400 w-24">
                          Correct:
                        </Text>
                        <Text className="text-xs font-semibold text-emerald-400 flex-1">
                          {correctOpt ? `(${correctOpt.label}) ${correctOpt.text}` : ''}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Backend Explanation */}
                  <View className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                    <View className="flex-row items-center mb-1">
                      <Sparkles size={12} color="#10b981" />
                      <Text className="text-[11px] font-bold text-emerald-400 uppercase ml-1.5">
                        Hono Backend Explanation
                      </Text>
                    </View>
                    <Text className="text-xs text-slate-300 leading-relaxed">
                      {item.explanation}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Action Buttons */}
        <View className="space-y-3 mb-4">
          <Pressable
            onPress={handleRetake}
            className="w-full bg-emerald-500 active:bg-emerald-600 rounded-2xl py-3.5 flex-row items-center justify-center mb-3 shadow-lg shadow-emerald-500/20"
          >
            <RotateCcw size={16} color="#020617" />
            <Text className="text-sm font-bold text-slate-950 ml-2">Retake Challenge</Text>
          </Pressable>

          <Pressable
            onPress={handleGoHome}
            className="w-full bg-slate-900 border border-slate-800 active:bg-slate-850 rounded-2xl py-3.5 flex-row items-center justify-center"
          >
            <Home size={16} color="#94a3b8" />
            <Text className="text-sm font-semibold text-slate-300 ml-2">Browse All Categories</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
