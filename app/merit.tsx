import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Trophy, Award, Medal, Clock, Sparkles } from 'lucide-react-native';
import { useMeritList } from '../src/hooks/useQuiz';

export default function MeritListScreen() {
  const router = useRouter();
  const { data } = useMeritList();
  const meritList = data?.list || [];
  const userRank = data?.userRank || 4;

  const [activeFilter, setActiveFilter] = useState<'today' | 'weekly' | 'all'>('today');

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { color: '#f59e0b', text: '1st', bg: 'bg-amber-500/10 border-amber-500/40 text-amber-400' };
    if (rank === 2) return { color: '#94a3b8', text: '2nd', bg: 'bg-slate-400/10 border-slate-400/40 text-slate-300' };
    if (rank === 3) return { color: '#b45309', text: '3rd', bg: 'bg-amber-700/10 border-amber-700/40 text-amber-500' };
    return { color: '#64748b', text: `${rank}th`, bg: 'bg-slate-900 border-slate-800 text-slate-400' };
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Top Navbar */}
      <View className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-xl bg-slate-800 items-center justify-center border border-slate-700"
        >
          <ArrowLeft size={18} color="#ffffff" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-white tracking-tight">Merit List Screen</Text>
          <Text className="text-[11px] text-slate-400 font-medium">লাইভ মেধাতালিকা ও র‍্যাঙ্কিং</Text>
        </View>

        <View className="w-9" />
      </View>

      {/* Filter Tabs */}
      <View className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex-row justify-center space-x-2">
        <Pressable
          onPress={() => setActiveFilter('today')}
          className={`px-4 py-1.5 rounded-xl border ${
            activeFilter === 'today' ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <Text className={`text-xs font-bold ${activeFilter === 'today' ? 'text-slate-950' : 'text-slate-400'}`}>
            Today&apos;s Live Exam
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveFilter('weekly')}
          className={`px-4 py-1.5 rounded-xl border ml-2 ${
            activeFilter === 'weekly' ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <Text className={`text-xs font-bold ${activeFilter === 'weekly' ? 'text-slate-950' : 'text-slate-400'}`}>
            Weekly Top
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-xl border ml-2 ${
            activeFilter === 'all' ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <Text className={`text-xs font-bold ${activeFilter === 'all' ? 'text-slate-950' : 'text-slate-400'}`}>
            All Time
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-20" showsVerticalScrollIndicator={false}>
        {/* User Rank Card */}
        <View className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 mb-4 flex-row items-center justify-between shadow-lg">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-emerald-500 items-center justify-center mr-3">
              <Text className="text-sm font-bold text-slate-950">#{userRank}</Text>
            </View>
            <View>
              <Text className="text-xs font-semibold text-emerald-400">Your Current Live Rank</Text>
              <Text className="text-sm font-bold text-white">Md. Rakib Hossain</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-sm font-bold text-emerald-400">4.75 Marks</Text>
            <Text className="text-[11px] text-slate-400">Time: 05m 12s</Text>
          </View>
        </View>

        {/* Merit List matching sketch: 1. 2. 3. 4. */}
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Candidates Ranking (1,420 Enrolled)
        </Text>

        <View className="space-y-2.5">
          {meritList.map((student) => {
            const badge = getRankBadge(student.rank);
            const isUser = student.rank === userRank;

            return (
              <View
                key={student.rank}
                className={`p-3.5 rounded-2xl border flex-row items-center justify-between mb-2.5 transition-all ${
                  isUser
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-md'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <View className="flex-row items-center flex-1 mr-3">
                  {/* Rank Number matching sketch */}
                  <View className={`w-8 h-8 rounded-xl items-center justify-center border mr-3 ${badge.bg}`}>
                    <Text className="text-xs font-bold">{student.rank}.</Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-sm font-bold text-white mr-1.5">{student.name}</Text>
                      {student.rank === 1 && <Trophy size={13} color="#f59e0b" />}
                    </View>
                    <Text className="text-xs text-slate-400 mt-0.5">{student.institution}</Text>
                    <Text className="text-[10px] text-emerald-400/90 mt-0.5 font-medium">{student.jobTarget}</Text>
                  </View>
                </View>

                {/* Score & Time taken */}
                <View className="items-end">
                  <Text className="text-sm font-bold text-white">{student.score} / {student.totalMarks}</Text>
                  <View className="flex-row items-center mt-0.5">
                    <Clock size={11} color="#94a3b8" />
                    <Text className="text-[10px] text-slate-400 ml-1">{student.timeTaken}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
