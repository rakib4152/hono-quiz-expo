import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Sparkles,
  Smartphone,
  Code2,
  Flame,
  Zap,
  Gauge,
  Layers,
  Clock,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from 'lucide-react-native';
import { useCategories } from '../src/hooks/useQuiz';
import type { QuizCategory, Difficulty } from '../src/types/quiz';

const ICON_MAP: Record<string, React.ElementType> = {
  Smartphone,
  Code2,
  Flame,
  Zap,
  Gauge,
  Layers,
};

const DIFFICULTY_TABS: { label: string; value: Difficulty | 'all' }[] = [
  { label: 'All Levels', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

export default function CategoryScreen() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useCategories(selectedDifficulty === 'all' ? undefined : selectedDifficulty);

  // Compute aggregate stats across categories
  const stats = useMemo(() => {
    const totalQ = categories.reduce((acc, cat) => acc + cat.totalQuestions, 0);
    const totalMin = categories.reduce((acc, cat) => acc + cat.estimatedMinutes, 0);
    return { totalQ, totalMin, count: categories.length };
  }, [categories]);

  const handleSelectQuiz = (quizId: string) => {
    router.push({
      pathname: '/quiz/[id]',
      params: { id: quizId },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        className="flex-1 px-4 pt-3 pb-8"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
            tintColor="#10b981"
            colors={['#10b981']}
          />
        }
      >
        {/* Header Section */}
        <View className="flex-row items-center justify-between mt-2 mb-6">
          <View className="flex-row items-center space-x-3">
            <View className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center">
              <Sparkles size={22} color="#10b981" />
            </View>
            <View>
              <Text className="text-2xl font-bold text-white tracking-tight">QuizPulse</Text>
              <Text className="text-xs text-slate-400 font-medium">Hono RPC & Expo Frontend</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
            <Flame size={16} color="#f59e0b" />
            <Text className="text-xs font-semibold text-amber-400 ml-1.5">3 Day Streak</Text>
          </View>
        </View>

        {/* Hero Highlights Banner */}
        <View className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-5 mb-6 shadow-xl">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <TrendingUp size={16} color="#10b981" />
              <Text className="text-xs font-semibold text-emerald-400 uppercase tracking-wider ml-1.5">
                Dynamic Question Arena
              </Text>
            </View>
            <View className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <Text className="text-[11px] font-medium text-emerald-400">Live RPC</Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-white mb-1.5">
            Level up your mobile engineering skills
          </Text>
          <Text className="text-xs text-slate-400 leading-relaxed mb-4">
            Curated interactive challenges covering React Native Fabric, Hono Edge microservices, TanStack caching, and TypeScript types.
          </Text>

          {/* Quick Metrics */}
          <View className="flex-row items-center justify-between pt-3 border-t border-slate-800/80">
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-white">{stats.count}</Text>
              <Text className="text-[11px] text-slate-400 font-medium">Modules</Text>
            </View>
            <View className="w-px h-6 bg-slate-800" />
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-emerald-400">{stats.totalQ}</Text>
              <Text className="text-[11px] text-slate-400 font-medium">Questions</Text>
            </View>
            <View className="w-px h-6 bg-slate-800" />
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-cyan-400">{stats.totalMin}m</Text>
              <Text className="text-[11px] text-slate-400 font-medium">Est. Practice</Text>
            </View>
          </View>
        </View>

        {/* Difficulty Filter Tabs */}
        <View className="mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Filter By Difficulty
            </Text>
            <Text className="text-xs text-slate-500">
              {categories.length} {categories.length === 1 ? 'topic' : 'topics'} available
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1">
            {DIFFICULTY_TABS.map((tab) => {
              const isActive = selectedDifficulty === tab.value;
              return (
                <Pressable
                  key={tab.value}
                  onPress={() => setSelectedDifficulty(tab.value)}
                  className={`mx-1 px-4 py-2 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-emerald-500 border-emerald-400'
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isActive ? 'text-slate-950 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Categories List */}
        <View className="mb-2">
          <Text className="text-base font-bold text-white mb-3">Quiz Categories</Text>

          {/* Loading State */}
          {isLoading && (
            <View className="py-16 items-center justify-center">
              <ActivityIndicator size="large" color="#10b981" />
              <Text className="text-sm text-slate-400 font-medium mt-3">
                Fetching topics via Hono RPC...
              </Text>
            </View>
          )}

          {/* Error State */}
          {isError && (
            <View className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 my-4 items-center">
              <AlertCircle size={28} color="#f43f5e" />
              <Text className="text-sm font-semibold text-rose-400 mt-2 text-center">
                {error?.message || 'Failed to load categories'}
              </Text>
              <Pressable
                onPress={() => refetch()}
                className="mt-3 flex-row items-center bg-rose-600 px-4 py-2 rounded-xl"
              >
                <RefreshCw size={14} color="#ffffff" />
                <Text className="text-xs font-bold text-white ml-2">Retry Request</Text>
              </Pressable>
            </View>
          )}

          {/* Category Cards */}
          {!isLoading && !isError && categories.length === 0 && (
            <View className="py-12 items-center bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <HelpCircle size={32} color="#64748b" />
              <Text className="text-sm font-semibold text-slate-300 mt-2">
                No quizzes match this filter
              </Text>
              <Pressable
                onPress={() => setSelectedDifficulty('all')}
                className="mt-3 bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                <Text className="text-xs text-emerald-400 font-medium">Reset to All Levels</Text>
              </Pressable>
            </View>
          )}

          {!isLoading &&
            !isError &&
            categories.map((cat: QuizCategory) => {
              const IconComponent = ICON_MAP[cat.iconName] || Code2;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => handleSelectQuiz(cat.id)}
                  className="bg-slate-900 border border-slate-800/90 hover:border-slate-700 active:scale-[0.99] rounded-2xl p-4 mb-3.5 transition-all shadow-md"
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row items-start flex-1 mr-3">
                      {/* Category Icon */}
                      <View className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 items-center justify-center mr-3.5">
                        <IconComponent size={22} color="#10b981" />
                      </View>

                      {/* Content */}
                      <View className="flex-1">
                        <Text className="text-base font-bold text-white mb-1">{cat.title}</Text>
                        <Text className="text-xs text-slate-400 leading-relaxed mb-3">
                          {cat.description}
                        </Text>

                        {/* Badges / Meta */}
                        <View className="flex-row items-center flex-wrap gap-2">
                          <View className="flex-row items-center bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-lg">
                            <HelpCircle size={12} color="#94a3b8" />
                            <Text className="text-[11px] font-semibold text-slate-300 ml-1.5">
                              {cat.totalQuestions} Questions
                            </Text>
                          </View>

                          <View className="flex-row items-center bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-lg">
                            <Clock size={12} color="#94a3b8" />
                            <Text className="text-[11px] font-semibold text-slate-300 ml-1.5">
                              ~{cat.estimatedMinutes} mins
                            </Text>
                          </View>

                          <View className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                            <Text className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                              {cat.difficulties.join(' • ')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Arrow CTA */}
                    <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center mt-2">
                      <ChevronRight size={16} color="#94a3b8" />
                    </View>
                  </View>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
