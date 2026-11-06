import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { UserPlus, Check, ArrowRight } from 'lucide-react-native';
import type { JobType } from '../../src/types/quiz';

const JOB_OPTIONS: { id: JobType; label: string; labelBn: string }[] = [
  { id: 'bcs', label: 'BCS', labelBn: 'বিসিএস প্রিলিমিনারি' },
  { id: 'bank', label: 'Bank', labelBn: 'বাংলাদেশ ব্যাংক ও ৮ ব্যাংক' },
  { id: 'govt', label: 'Govt. Job', labelBn: 'মন্ত্রণালয় ও নন-ক্যাডার' },
  { id: 'private', label: 'Private', labelBn: 'করপোরেট ও এমএনসি' },
];

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('Md. Rakib Hossain');
  const [institution, setInstitution] = useState('University of Dhaka');
  const [selectedJobType, setSelectedJobType] = useState<JobType>('bcs');

  const handleRegister = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-6 pt-10 pb-8" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Header */}
        <View className="mb-6 items-center">
          <View className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mb-3">
            <UserPlus size={26} color="#10b981" />
          </View>
          <Text className="text-2xl font-bold text-white tracking-tight">Register Screen</Text>
          <Text className="text-xs text-slate-400 mt-1 font-medium">Create Your Job Preparation Profile</Text>
        </View>

        {/* Form matching sketch */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
          {/* Name Field */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Name:</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
              placeholderTextColor="#64748b"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-medium"
            />
          </View>

          {/* Institution Field */}
          <View className="mb-5">
            <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Institution:</Text>
            <TextInput
              value={institution}
              onChangeText={setInstitution}
              placeholder="University / College / Workplace"
              placeholderTextColor="#64748b"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-medium"
            />
          </View>

          {/* Job Type Selector matching sketch box: [ BCS | Bank | Private | Govt. Job ] */}
          <View className="mb-6">
            <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Job Type:
            </Text>
            <View className="space-y-2">
              {JOB_OPTIONS.map((item) => {
                const isSelected = selectedJobType === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelectedJobType(item.id)}
                    className={`p-3.5 rounded-xl border flex-row items-center justify-between mb-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <View>
                      <Text className={`text-sm font-bold ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                        {item.label}
                      </Text>
                      <Text className="text-[11px] text-slate-400 mt-0.5">{item.labelBn}</Text>
                    </View>

                    <View
                      className={`w-6 h-6 rounded-full border items-center justify-center ${
                        isSelected ? 'bg-emerald-500 border-emerald-400' : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isSelected && <Check size={14} color="#020617" strokeWidth={3} />}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Submit */}
          <Pressable
            onPress={handleRegister}
            className="w-full bg-emerald-500 active:bg-emerald-600 rounded-xl py-3.5 items-center justify-center flex-row shadow-lg shadow-emerald-500/20"
          >
            <Text className="text-sm font-bold text-slate-950 mr-2">Complete Registration</Text>
            <ArrowRight size={16} color="#020617" />
          </Pressable>
        </View>

        {/* Back to Login */}
        <View className="flex-row items-center justify-center">
          <Text className="text-xs text-slate-400">Already registered? </Text>
          <Pressable onPress={() => router.push('/auth/login')}>
            <Text className="text-xs font-bold text-emerald-400">Back to Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
