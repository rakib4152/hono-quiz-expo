import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LogIn, ArrowRight } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState('Md. Rakib Hossain');
  const [email, setEmail] = useState('rakib.edu.bd@gmail.com');

  const handleSignIn = () => {
    router.replace('/');
  };

  const handleSocialSignIn = (provider: 'Google' | 'Facebook') => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-6 pt-10 pb-8" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Header matching sketch */}
        <View className="mb-8 items-center">
          <View className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center mb-3">
            <LogIn size={26} color="#10b981" />
          </View>
          <Text className="text-2xl font-bold text-white tracking-tight">Login Screen</Text>
          <Text className="text-xs text-slate-400 mt-1 font-medium">Auth Screen • BCS & Job Exam Prep</Text>
        </View>

        {/* Input Form matching handwritten sketch */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Name:</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor="#64748b"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-medium"
            />
          </View>

          <View className="mb-6">
            <Text className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@mail.com"
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-medium"
            />
          </View>

          {/* Sign In Primary CTA */}
          <Pressable
            onPress={handleSignIn}
            className="w-full bg-emerald-500 active:bg-emerald-600 rounded-xl py-3.5 items-center justify-center flex-row shadow-lg shadow-emerald-500/20 mb-6"
          >
            <Text className="text-sm font-bold text-slate-950 mr-2">Sign In</Text>
            <ArrowRight size={16} color="#020617" />
          </Pressable>

          {/* "Sign in with (G) (F)" matching hand-drawn sketch circles */}
          <View className="pt-4 border-t border-slate-800/80 items-center">
            <Text className="text-xs font-semibold text-slate-400 mb-3">Sign in with</Text>
            <View className="flex-row items-center justify-center space-x-4">
              {/* Google Button (G) */}
              <Pressable
                onPress={() => handleSocialSignIn('Google')}
                className="w-12 h-12 rounded-full bg-slate-950 border border-slate-700 items-center justify-center active:scale-95"
              >
                <Text className="text-base font-bold text-white">G</Text>
              </Pressable>

              {/* Facebook Button (F) */}
              <Pressable
                onPress={() => handleSocialSignIn('Facebook')}
                className="w-12 h-12 rounded-full bg-blue-600 border border-blue-500 items-center justify-center active:scale-95 ml-4"
              >
                <Text className="text-base font-bold text-white">f</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Link to Register Screen */}
        <View className="flex-row items-center justify-center">
          <Text className="text-xs text-slate-400">New user? </Text>
          <Pressable onPress={() => router.push('/auth/register')}>
            <Text className="text-xs font-bold text-emerald-400">Go to Register Screen</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
