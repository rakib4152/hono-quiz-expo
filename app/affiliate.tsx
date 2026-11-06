import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Share2, Copy, Check, Users, Gift, ChevronRight } from 'lucide-react-native';
import { useAffiliateData } from '../src/hooks/useQuiz';

export default function AffiliateScreen() {
  const router = useRouter();
  const { data: affiliate } = useAffiliateData();

  const [copied, setCopied] = useState(false);
  const [invitedMap, setInvitedMap] = useState<Record<string, boolean>>({});

  const referralCode = affiliate?.referralCode || 'BCS2026RAKIB';
  const totalEarnedTk = affiliate?.totalEarnedTk ?? 850;
  const friends = affiliate?.fbFriends || [];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = (friendId: string) => {
    setInvitedMap((prev) => ({ ...prev, [friendId]: true }));
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
          <Text className="text-base font-bold text-white tracking-tight">Affiliate Screen</Text>
          <Text className="text-[11px] text-slate-400 font-medium">রেফারেল প্রোগ্রাম ও ফ্রেন্ডলিস্ট</Text>
        </View>

        <View className="w-9" />
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-20" showsVerticalScrollIndicator={false}>
        {/* Earnings Card */}
        <View className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 mb-5 shadow-xl">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Gift size={16} color="#10b981" />
              <Text className="text-xs font-bold text-emerald-400 uppercase tracking-wider ml-1.5">
                Affiliate Balance
              </Text>
            </View>
            <View className="bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <Text className="text-[10px] font-bold text-emerald-400">৳ ৫০ / বন্ধু</Text>
            </View>
          </View>

          <Text className="text-3xl font-black text-white mb-1">৳ {totalEarnedTk} <Text className="text-base font-medium text-slate-400">BDT</Text></Text>
          <Text className="text-xs text-slate-400 leading-relaxed mb-4">
            Earn ৳ 50 Tk for every friend who registers and joins mock test series.
          </Text>

          <View className="flex-row items-center justify-between pt-3 border-t border-slate-800/80">
            <Text className="text-xs font-semibold text-slate-300">17 Friends Joined</Text>
            <Pressable onPress={() => router.push('/settings')} className="bg-emerald-500 px-3.5 py-1.5 rounded-xl">
              <Text className="text-xs font-bold text-slate-950">Withdraw via bKash</Text>
            </Pressable>
          </View>
        </View>

        {/* Refer to a friend Section matching sketch */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-6 shadow-md">
          <Text className="text-sm font-bold text-white mb-1">Refer to a friend</Text>
          <Text className="text-xs text-slate-400 mb-3.5 leading-relaxed">
            Share your unique referral code or link with your batchmates.
          </Text>

          <View className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Code</Text>
              <Text className="text-sm font-mono font-bold text-emerald-400 tracking-wider mt-0.5">{referralCode}</Text>
            </View>

            <Pressable
              onPress={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl flex-row items-center border border-slate-700"
            >
              {copied ? (
                <>
                  <Check size={14} color="#10b981" />
                  <Text className="text-xs font-bold text-emerald-400 ml-1">Copied</Text>
                </>
              ) : (
                <>
                  <Copy size={14} color="#94a3b8" />
                  <Text className="text-xs font-medium text-slate-300 ml-1">Copy</Text>
                </>
              )}
            </Pressable>
          </View>

          <Pressable
            onPress={handleCopy}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 flex-row items-center justify-center active:scale-[0.99]"
          >
            <Share2 size={15} color="#38bdf8" />
            <Text className="text-xs font-bold text-white ml-2">Share Link to Messenger / WhatsApp</Text>
          </Pressable>
        </View>

        {/* FB Friend List Section matching sketch */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Users size={16} color="#3b82f6" />
              <Text className="text-sm font-bold text-white ml-2">FB Friend list</Text>
            </View>
            <Text className="text-xs text-slate-500">{friends.length} Friends Found</Text>
          </View>

          <View className="space-y-2.5">
            {friends.map((friend) => {
              const isInvited = invitedMap[friend.id] || friend.status === 'invited';
              const isJoined = friend.status === 'joined';

              return (
                <View
                  key={friend.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex-row items-center justify-between mb-2.5 shadow-sm"
                >
                  <View className="flex-row items-center flex-1 mr-3">
                    <View className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 items-center justify-center mr-3 font-bold text-blue-400">
                      <Text className="text-xs font-bold text-blue-400">
                        {friend.name.charAt(0)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs font-bold text-white truncate">{friend.name}</Text>
                      <Text className="text-[11px] text-slate-400">{friend.mutualFriends} mutual friends</Text>
                    </View>
                  </View>

                  {isJoined ? (
                    <View className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl">
                      <Text className="text-[11px] font-bold text-emerald-400">+৳50 Earned</Text>
                    </View>
                  ) : isInvited ? (
                    <View className="bg-slate-800 px-3 py-1 rounded-xl">
                      <Text className="text-[11px] font-semibold text-slate-400">Invited</Text>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => handleInvite(friend.id)}
                      className="bg-blue-600 active:bg-blue-500 px-3.5 py-1.5 rounded-xl shadow-md"
                    >
                      <Text className="text-xs font-bold text-white">Invite</Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
