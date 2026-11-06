import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react-native';
import { useLastResult } from '../../src/hooks/useQuiz';

export default function ResultScreen() {
  const router = useRouter();
  const { quizId = 'bank' } = useLocalSearchParams<{ quizId?: string }>();
  const { data: result } = useLastResult();

  // Fallback default statistics if accessed directly
  const totalQuestions = result?.totalQuestions || 6;
  const correctCount = result?.correctCount ?? 4;
  const wrongCount = result?.wrongCount ?? 1;
  const skippedCount = result?.skippedCount ?? 1;
  const netScore = result?.netScore ?? 3.75;
  const rawScore = result?.rawScore ?? 4.0;
  const negativeMarks = result?.negativeMarks ?? 0.25;
  const timeSpent = result?.timeSpentSeconds ?? 142;
  const meritRank = result?.meritRank ?? 4;

  const correctPct = Math.round((correctCount / totalQuestions) * 100);
  const wrongPct = Math.round((wrongCount / totalQuestions) * 100);
  const skippedPct = 100 - (correctPct + wrongPct);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-4 pt-4 pb-16" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mt-2 mb-6">
          <View className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mb-2.5">
            <Trophy size={28} color="#10b981" />
          </View>
          <Text className="text-2xl font-bold text-white tracking-tight">Result Screen</Text>
          <Text className="text-xs text-slate-400 font-medium">Exam Performance & Negative Marking Breakdown</Text>
        </View>

        {/* Big Pie Chart Visualization Card matching sketch */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-2xl items-center">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Performance Breakdown (Pie Chart)
          </Text>

          {/* Graphical Pie / Donut Chart Representation */}
          <View className="w-44 h-44 rounded-full border-8 border-slate-800 items-center justify-center relative mb-5">
            {/* Visual Color Segment Rings */}
            <View
              className="absolute inset-0 rounded-full border-8 border-emerald-500"
              style={{ opacity: correctPct > 0 ? 1 : 0.2 }}
            />
            <View
              className="absolute inset-1.5 rounded-full border-4 border-rose-500"
              style={{ opacity: wrongPct > 0 ? 0.9 : 0.2 }}
            />
            <View
              className="absolute inset-3 rounded-full border-2 border-slate-600"
              style={{ opacity: skippedPct > 0 ? 0.8 : 0.2 }}
            />

            {/* Inner Stat Counter */}
            <View className="items-center justify-center">
              <Text className="text-3xl font-extrabold text-white">{netScore}</Text>
              <Text className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Net Score
              </Text>
              <Text className="text-[10px] text-slate-400 font-medium">Out of {totalQuestions}</Text>
            </View>
          </View>

          {/* Pie Chart Legend matching handwritten sketch (correct / wrong / skipped) */}
          <View className="w-full flex-row justify-between pt-4 border-t border-slate-800 text-center">
            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" />
                <Text className="text-xs font-semibold text-slate-300">Correct</Text>
              </View>
              <Text className="text-base font-bold text-emerald-400">{correctCount} ({correctPct}%)</Text>
            </View>

            <View className="w-px h-8 bg-slate-800" />

            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <View className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5" />
                <Text className="text-xs font-semibold text-slate-300">Wrong</Text>
              </View>
              <Text className="text-base font-bold text-rose-400">{wrongCount} ({wrongPct}%)</Text>
            </View>

            <View className="w-px h-8 bg-slate-800" />

            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <View className="w-2.5 h-2.5 rounded-full bg-slate-500 mr-1.5" />
                <Text className="text-xs font-semibold text-slate-300">Skipped</Text>
              </View>
              <Text className="text-base font-bold text-slate-300">{skippedCount} ({skippedPct}%)</Text>
            </View>
          </View>
        </View>

        {/* Detailed Metrics Strip */}
        <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-800/80">
            <Text className="text-xs font-semibold text-slate-400">Raw Correct Marks (+1.00 each):</Text>
            <Text className="text-xs font-bold text-emerald-400">+{rawScore.toFixed(2)}</Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-800/80">
            <Text className="text-xs font-semibold text-slate-400">Negative Marks (-0.25 each):</Text>
            <Text className="text-xs font-bold text-rose-400">-{negativeMarks.toFixed(2)}</Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-800/80">
            <Text className="text-xs font-semibold text-slate-400">Time Taken:</Text>
            <Text className="text-xs font-bold text-white">{formatTime(timeSpent)}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-slate-400">Estimated Live Merit Rank:</Text>
            <View className="flex-row items-center">
              <Award size={14} color="#f59e0b" />
              <Text className="text-xs font-bold text-amber-400 ml-1">Rank #{meritRank} of 1,420</Text>
            </View>
          </View>
        </View>

        {/* Primary CTA Buttons connecting to other screens from the sketch */}
        <View className="space-y-3 mb-4">
          {/* Attempted Answer Screen CTA */}
          <Pressable
            onPress={() => router.push('/quiz/attempted')}
            className="w-full bg-emerald-500 active:bg-emerald-600 rounded-2xl py-3.5 flex-row items-center justify-center mb-3 shadow-lg shadow-emerald-500/20"
          >
            <BookOpen size={16} color="#020617" />
            <Text className="text-sm font-bold text-slate-950 ml-2">Attempted Answer Screen (উত্তরমালা)</Text>
            <ChevronRight size={16} color="#020617" />
          </Pressable>

          {/* Merit List Screen CTA */}
          <Pressable
            onPress={() => router.push('/merit')}
            className="w-full bg-slate-900 border border-slate-800 active:bg-slate-850 rounded-2xl py-3.5 flex-row items-center justify-center mb-3"
          >
            <Award size={16} color="#f59e0b" />
            <Text className="text-sm font-bold text-white ml-2">Check Merit List (মেধাতালিকা)</Text>
          </Pressable>

          {/* Retake CTA */}
          <Pressable
            onPress={() => router.replace(`/quiz/${quizId}`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 flex-row items-center justify-center"
          >
            <RotateCcw size={14} color="#94a3b8" />
            <Text className="text-xs font-semibold text-slate-400 ml-1.5">Retake Exam</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
