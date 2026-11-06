import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  CheckCircle2,
  HelpCircle,
  Award,
  Wallet,
  LogOut,
  Bell,
  Moon,
  Globe,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';
import { useUserProfile, useUpdateUserProfile } from '../src/hooks/useQuiz';

export default function SettingsScreen() {
  const router = useRouter();
  const { data: profile } = useUserProfile();
  const updateMutation = useUpdateUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || 'Md. Rakib Hossain');
  const [institution, setInstitution] = useState(profile?.institution || 'University of Dhaka');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [bkashNumber, setBkashNumber] = useState('017XXXXXXXX');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Exact fields from hand-drawn sketch:
  const attemptedQuiz = profile?.attemptedQuizCount ?? 42;
  const totalMarks = profile?.totalMarksScored ?? 86.5;
  const affiliateTk = profile?.affiliateEarningsTk ?? 850;

  const handleSaveProfile = () => {
    updateMutation.mutate({ name, institution });
    setIsEditing(false);
  };

  const handleWithdraw = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setShowWithdrawModal(false);
    }, 1500);
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
          <Text className="text-base font-bold text-white tracking-tight">Settings Screen</Text>
          <Text className="text-[11px] text-slate-400 font-medium">প্রোফাইল ও অ্যাকাউন্ট সেটিংস</Text>
        </View>

        <View className="w-9" />
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-20" showsVerticalScrollIndicator={false}>
        {/* User Card matching sketch: "Name:" */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-5 shadow-xl">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mr-3">
                <User size={22} color="#10b981" />
              </View>
              <View>
                <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate Name</Text>
                <Text className="text-base font-bold text-white">{profile?.name || name}</Text>
                <Text className="text-xs text-slate-400">{profile?.institution || institution}</Text>
              </View>
            </View>

            <Pressable
              onPress={() => setIsEditing(!isEditing)}
              className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl"
            >
              <Text className="text-xs font-semibold text-emerald-400">{isEditing ? 'Cancel' : 'Edit'}</Text>
            </Pressable>
          </View>

          {isEditing && (
            <View className="pt-3 border-t border-slate-800/80 space-y-3">
              <View>
                <Text className="text-xs font-bold text-slate-400 mb-1">Name:</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </View>
              <View className="mt-2">
                <Text className="text-xs font-bold text-slate-400 mb-1">Institution:</Text>
                <TextInput
                  value={institution}
                  onChangeText={setInstitution}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </View>
              <Pressable onPress={handleSaveProfile} className="bg-emerald-500 py-2.5 rounded-xl items-center mt-3">
                <Text className="text-xs font-bold text-slate-950">Save Changes</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* 3 Core Stats Cards exactly as labeled in the hand-drawn sketch */}
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Performance & Affiliate Metrics (From Wireframe)
        </Text>

        <View className="space-y-3 mb-6">
          {/* 1. Attempted quiz */}
          <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex-row items-center justify-between mb-3 shadow-md">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 items-center justify-center mr-3">
                <HelpCircle size={20} color="#38bdf8" />
              </View>
              <View>
                <Text className="text-sm font-bold text-white">Attempted quiz:</Text>
                <Text className="text-xs text-slate-400">Total mock exams participated</Text>
              </View>
            </View>
            <Text className="text-xl font-black text-blue-400">{attemptedQuiz} Tests</Text>
          </View>

          {/* 2. Total M. (Total Marks) */}
          <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex-row items-center justify-between mb-3 shadow-md">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 items-center justify-center mr-3">
                <Award size={20} color="#f59e0b" />
              </View>
              <View>
                <Text className="text-sm font-bold text-white">Total M.:</Text>
                <Text className="text-xs text-slate-400">Cumulative marks with negative deductions</Text>
              </View>
            </View>
            <Text className="text-xl font-black text-amber-400">{totalMarks} M.</Text>
          </View>

          {/* 3. Affiliate tk: */}
          <View className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 flex-row items-center justify-between shadow-md">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mr-3">
                <Wallet size={20} color="#10b981" />
              </View>
              <View>
                <Text className="text-sm font-bold text-white">Affiliate tk:</Text>
                <Text className="text-xs text-slate-400">Available balance to withdraw</Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-xl font-black text-emerald-400">৳ {affiliateTk} Tk</Text>
              <Pressable
                onPress={() => setShowWithdrawModal(true)}
                className="bg-emerald-500 px-3 py-1 rounded-lg mt-1 active:scale-95"
              >
                <Text className="text-[11px] font-bold text-slate-950">Withdraw (বিকাশ)</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* General App Settings */}
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Preferences & Account
        </Text>

        <View className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 mb-6">
          <View className="p-3.5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Bell size={16} color="#94a3b8" />
              <Text className="text-xs font-medium text-white ml-2.5">Exam Reminders & Push Alert</Text>
            </View>
            <Text className="text-xs text-emerald-400 font-bold">Enabled</Text>
          </View>

          <View className="p-3.5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Globe size={16} color="#94a3b8" />
              <Text className="text-xs font-medium text-white ml-2.5">Language / ভাষা</Text>
            </View>
            <Text className="text-xs text-slate-400 font-medium">বাংলা (Bangla) + EN</Text>
          </View>

          <View className="p-3.5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <ShieldCheck size={16} color="#94a3b8" />
              <Text className="text-xs font-medium text-white ml-2.5">Privacy & Exam Terms</Text>
            </View>
            <ChevronRight size={14} color="#64748b" />
          </View>
        </View>

        {/* Logout CTA */}
        <Pressable
          onPress={() => router.replace('/auth/login')}
          className="w-full bg-slate-900 border border-slate-800 active:bg-rose-950/20 py-3.5 rounded-2xl flex-row items-center justify-center"
        >
          <LogOut size={16} color="#f43f5e" />
          <Text className="text-xs font-bold text-rose-400 ml-2">Log Out / Switch Account</Text>
        </Pressable>
      </ScrollView>

      {/* Withdrawal Modal */}
      <Modal visible={showWithdrawModal} transparent animationType="fade" onRequestClose={() => setShowWithdrawModal(false)}>
        <View className="flex-1 bg-black/80 items-center justify-center p-5">
          <View className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
            <View className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mx-auto mb-3">
              <Wallet size={24} color="#10b981" />
            </View>
            <Text className="text-lg font-bold text-white mb-1">Withdraw Affiliate tk</Text>
            <Text className="text-xs text-slate-400 mb-4">
              Enter your bKash or Nagad personal number to receive ৳ {affiliateTk} Tk.
            </Text>

            {withdrawSuccess ? (
              <View className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 my-2 items-center">
                <CheckCircle2 size={24} color="#10b981" />
                <Text className="text-xs font-bold text-emerald-400 mt-2">Withdrawal Request Submitted!</Text>
                <Text className="text-[11px] text-slate-400 mt-1">Payment will be credited within 24 hours.</Text>
              </View>
            ) : (
              <View className="space-y-3 mb-4">
                <TextInput
                  value={bkashNumber}
                  onChangeText={setBkashNumber}
                  placeholder="017XXXXXXXX"
                  placeholderTextColor="#64748b"
                  keyboardType="phone-pad"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                />
                <Pressable onPress={handleWithdraw} className="w-full bg-emerald-500 py-3 rounded-xl items-center mt-3">
                  <Text className="text-xs font-bold text-slate-950">Confirm Withdraw ৳{affiliateTk}</Text>
                </Pressable>
              </View>
            )}

            {!withdrawSuccess && (
              <Pressable onPress={() => setShowWithdrawModal(false)} className="py-2">
                <Text className="text-xs text-slate-400">Cancel</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
