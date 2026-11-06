import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import {
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
  BookOpen,
} from 'lucide-react-native';
import { useCategories, useUserProfile } from '../src/hooks/useQuiz';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  GraduationCap,
  Landmark,
  Building2,
  Briefcase,
};

export default function HomeScreen() {
  const router = useRouter();
  const { data: categories = [], isLoading, refetch, isRefetching } = useCategories();
  const { data: profile } = useUserProfile();

  const handleStartExam = (categoryId: string) => {
    router.push({
      pathname: '/quiz/[id]',
      params: { id: categoryId },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        className="flex-1 px-4 pt-3 pb-24"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
            tintColor="#10b981"
          />
        }
      >
        {/* Top User Bar */}
        <View className="flex-row items-center justify-between mt-2 mb-5">
          <View className="flex-row items-center space-x-3">
            <View className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mr-3">
              <Text className="text-base font-bold text-emerald-400">
                {profile?.name ? profile.name.charAt(0) : 'R'}
              </Text>
            </View>
            <View>
              <Text className="text-base font-bold text-white tracking-tight">
                {profile?.name || 'Md. Rakib Hossain'}
              </Text>
              <Text className="text-xs text-slate-400 font-medium">
                {profile?.institution || 'University of Dhaka'} • {profile?.jobType?.toUpperCase() || 'BCS'}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
            <Flame size={15} color="#f59e0b" />
            <Text className="text-xs font-semibold text-amber-400 ml-1">5 Day Streak</Text>
          </View>
        </View>

        {/* Hero Area matching sketch */}
        <View className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 mb-6 shadow-xl">
          <View className="flex-row items-center justify-between mb-2">
            <View className="bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <Text className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Live Daily Mock Test
              </Text>
            </View>
            <View className="flex-row items-center space-x-1.5">
              <Users size={12} color="#94a3b8" />
              <Text className="text-[11px] text-slate-400 ml-1 font-medium">1,420 Live</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-white mb-1.5">
            47th BCS & Combined Bank Mock Exam
          </Text>
          <Text className="text-xs text-slate-400 leading-relaxed mb-4">
            বাংলা, ইংরেজি, ও সাধারণ জ্ঞান অংশের পূর্ণাঙ্গ প্রস্তুতি। নেগেটিভ মার্কিং সহ লাইভ পরীক্ষা দিন।
          </Text>

          <View className="flex-row items-center justify-between pt-3 border-t border-slate-800/80">
            <View className="flex-row items-center">
              <Clock size={14} color="#10b981" />
              <Text className="text-xs font-semibold text-slate-300 ml-1.5">10 Mins • 6 Questions</Text>
            </View>

            <Pressable
              onPress={() => handleStartExam('bcs')}
              className="bg-emerald-500 active:bg-emerald-600 px-4 py-2 rounded-xl flex-row items-center shadow-md shadow-emerald-500/20"
            >
              <Play size={13} color="#020617" fill="#020617" />
              <Text className="text-xs font-bold text-slate-950 ml-1.5">Start Hero Exam</Text>
            </Pressable>
          </View>
        </View>

        {/* ক্যাটাগরি (Categories) matching sketch */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3.5">
            <Text className="text-lg font-bold text-white tracking-tight">ক্যাটাগরি</Text>
            <Text className="text-xs text-slate-400 font-medium">Select Job Prep Track</Text>
          </View>

          {/* 4 Circle/Pill Icons matching sketch: [ BCS ] [ Bank ] [ Govt. Job ] [ Private ] */}
          <View className="flex-row justify-between mb-5">
            {categories.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.iconName] || Landmark;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => handleStartExam(cat.id)}
                  className="items-center flex-1 mx-1 active:scale-95"
                >
                  <View className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 hover:border-emerald-500 items-center justify-center mb-2 shadow-lg shadow-black/40">
                    <IconComp size={24} color="#10b981" />
                  </View>
                  <Text className="text-xs font-bold text-white text-center">{cat.title.split(' ')[0]}</Text>
                  <Text className="text-[10px] text-slate-400 text-center">{cat.titleBn.split(' ')[0]}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Detailed Exam Cards */}
          <View className="space-y-3">
            {categories.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.iconName] || Landmark;
              return (
                <Pressable
                  key={`card-${cat.id}`}
                  onPress={() => handleStartExam(cat.id)}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 flex-row items-center justify-between active:scale-[0.99] shadow-md"
                >
                  <View className="flex-row items-center flex-1 mr-3">
                    <View className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center mr-3.5">
                      <IconComp size={22} color="#10b981" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-bold text-white">{cat.title}</Text>
                      <Text className="text-xs text-slate-400 mt-0.5">{cat.titleBn}</Text>
                      <Text className="text-[11px] text-emerald-400 mt-1 font-medium">
                        {cat.candidateCount.toLocaleString()} Candidates Enrolled
                      </Text>
                    </View>
                  </View>

                  <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center">
                    <ChevronRight size={16} color="#94a3b8" />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Quick Access to Secondary Screens from Sketch */}
        <View className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-4">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Quick Navigation (From Wireframe)
          </Text>
          <View className="grid grid-cols-3 flex-row justify-between">
            <Pressable
              onPress={() => router.push('/merit')}
              className="flex-1 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 mx-1 active:scale-95"
            >
              <Trophy size={18} color="#f59e0b" />
              <Text className="text-[11px] font-bold text-white mt-1.5">Merit List</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/affiliate')}
              className="flex-1 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 mx-1 active:scale-95"
            >
              <Share2 size={18} color="#38bdf8" />
              <Text className="text-[11px] font-bold text-white mt-1.5">Affiliate</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/settings')}
              className="flex-1 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 mx-1 active:scale-95"
            >
              <SettingsIcon size={18} color="#a855f7" />
              <Text className="text-[11px] font-bold text-white mt-1.5">Settings</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
