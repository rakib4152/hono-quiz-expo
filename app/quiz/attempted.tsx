import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, BookOpen, ChevronRight } from 'lucide-react-native';
import { useLastResult } from '../../src/hooks/useQuiz';

const SUBJECT_TABS = [
  { id: 'all', label: 'All Subjects', labelBn: 'সকল বিষয়' },
  { id: 'bangla', label: 'বাংলা', labelBn: 'বাংলা সাহিত্য ও ব্যাকরণ' },
  { id: 'english', label: 'ইংরেজি', labelBn: 'English Language' },
  { id: 'gk', label: 'GK', labelBn: 'সাধারণ জ্ঞান' },
];

const DEFAULT_REVIEW_ITEMS = [
  {
    questionId: 'bnk-1',
    questionNumber: 1,
    subject: 'bangla' as const,
    subjectNameBn: 'বাংলা',
    question: 'কোন বানানটি শুদ্ধ?',
    selectedOptionId: 'opt-c',
    correctOptionId: 'opt-b',
    isCorrect: false,
    isSkipped: false,
    explanation: 'শুদ্ধ বানান হলো "মুহূর্ত" (ম-এ হ্রস্ব উ-কার, হ-এ দীর্ঘ ঊ-কার, রেফ ত)।',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'মুহূর্মুহু' },
      { id: 'opt-b', label: 'B' as const, text: 'মুহূর্ত' },
      { id: 'opt-c', label: 'C' as const, text: 'মূহুর্ত' },
      { id: 'opt-d', label: 'D' as const, text: 'মুহূমুহু' },
    ],
  },
  {
    questionId: 'bnk-2',
    questionNumber: 2,
    subject: 'bangla' as const,
    subjectNameBn: 'বাংলা',
    question: '"কাজী নজরুল ইসলাম" কোন পত্রিকার সম্পাদক ছিলেন?',
    selectedOptionId: 'opt-a',
    correctOptionId: 'opt-a',
    isCorrect: true,
    isSkipped: false,
    explanation: '১৯২২ সালে প্রকাশিত অর্ধ-সাপ্তাহিক "ধূমকেতু" পত্রিকার সম্পাদক ছিলেন কাজী নজরুল ইসলাম।',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'ধূমকেতু' },
      { id: 'opt-b', label: 'B' as const, text: 'সবুজপত্র' },
    ],
  },
  {
    questionId: 'bnk-3',
    questionNumber: 3,
    subject: 'english' as const,
    subjectNameBn: 'ইংরেজি',
    question: 'Choose the correct synonym of "Paucity":',
    selectedOptionId: 'opt-b',
    correctOptionId: 'opt-a',
    isCorrect: false,
    isSkipped: false,
    explanation: '"Paucity" means the presence of something only in small or insufficient quantities; Scarcity.',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'Scarcity' },
      { id: 'opt-b', label: 'B' as const, text: 'Surplus' },
    ],
  },
  {
    questionId: 'bnk-4',
    questionNumber: 4,
    subject: 'english' as const,
    subjectNameBn: 'ইংরেজি',
    question: 'The committee has submitted ___ report on time.',
    selectedOptionId: 'opt-a',
    correctOptionId: 'opt-a',
    isCorrect: true,
    isSkipped: false,
    explanation: 'Singular neuter pronoun "its" is used when a collective noun functions as a unit.',
    options: [
      { id: 'opt-a', label: 'A' as const, text: 'its' },
      { id: 'opt-b', label: 'B' as const, text: 'their' },
    ],
  },
];

export default function AttemptedAnswerScreen() {
  const router = useRouter();
  const { data: result } = useLastResult();
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'bangla' | 'english' | 'gk'>('all');

  const filteredItems = useMemo(() => {
    const items = result?.review || DEFAULT_REVIEW_ITEMS;
    if (selectedSubject === 'all') return items;
    return items.filter((i) => i.subject === selectedSubject);
  }, [result?.review, selectedSubject]);

  // Separate into Correct and Wrong lists matching the two columns in the hand-drawn sketch:
  // "Correct: Q.2, Q.4" and "Wrong: Q.1, Q.3"
  const correctQuestions = filteredItems.filter((i) => i.isCorrect);
  const wrongQuestions = filteredItems.filter((i) => !i.isCorrect);

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Top Bar */}
      <View className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-xl bg-slate-800 items-center justify-center border border-slate-700"
        >
          <ArrowLeft size={18} color="#ffffff" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-white tracking-tight">Attempted Answer Screen</Text>
          <Text className="text-[11px] text-slate-400 font-medium">উত্তরমালা ও বিস্তারিত ব্যাখ্যা</Text>
        </View>

        <View className="w-9" />
      </View>

      {/* Subject Tabs matching sketch: [ বাংলা ] [ ইংরেজি ] [ GK ] */}
      <View className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1">
          {SUBJECT_TABS.map((tab) => {
            const isActive = selectedSubject === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => setSelectedSubject(tab.id as any)}
                className={`mx-1 px-4 py-2 rounded-xl border transition-all ${
                  isActive ? 'bg-emerald-500 border-emerald-400 shadow-md' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <Text className={`text-xs font-bold ${isActive ? 'text-slate-950' : 'text-slate-300'}`}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-16" showsVerticalScrollIndicator={false}>
        {/* Two-Column Summary Header matching hand-drawn sketch: "Correct | Wrong" */}
        <View className="grid grid-cols-2 flex-row gap-3 mb-6">
          {/* Correct Column Summary */}
          <View className="flex-1 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 items-center">
            <View className="flex-row items-center mb-1">
              <CheckCircle2 size={16} color="#10b981" />
              <Text className="text-sm font-bold text-emerald-400 ml-1.5 underline">Correct</Text>
            </View>
            <Text className="text-xs text-slate-300 mt-1">
              {correctQuestions.map((q) => `Q.${q.questionNumber}`).join(', ') || 'None'}
            </Text>
            <Text className="text-[10px] text-emerald-400 font-bold mt-1">+{correctQuestions.length}.00 Marks</Text>
          </View>

          {/* Wrong Column Summary */}
          <View className="flex-1 bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 items-center">
            <View className="flex-row items-center mb-1">
              <XCircle size={16} color="#f43f5e" />
              <Text className="text-sm font-bold text-rose-400 ml-1.5 underline">Wrong</Text>
            </View>
            <Text className="text-xs text-slate-300 mt-1">
              {wrongQuestions.map((q) => `Q.${q.questionNumber}`).join(', ') || 'None'}
            </Text>
            <Text className="text-[10px] text-rose-400 font-bold mt-1">
              -{(wrongQuestions.length * 0.25).toFixed(2)} Negative Marks
            </Text>
          </View>
        </View>

        {/* Detailed Question Reviews */}
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Detailed Solutions ({filteredItems.length} Questions)
        </Text>

        <View className="space-y-4">
          {filteredItems.map((item) => {
            const selectedOpt = item.options.find((o) => o.id === item.selectedOptionId);
            const correctOpt = item.options.find((o) => o.id === item.correctOptionId);

            return (
              <View
                key={item.questionId}
                className={`border rounded-2xl p-4 mb-3.5 shadow-md ${
                  item.isCorrect ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-rose-900/60'
                }`}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <Text className="text-xs font-bold text-white mr-2">Q.{item.questionNumber}</Text>
                    <Text className="text-[11px] text-slate-400 font-medium">({item.subjectNameBn})</Text>
                  </View>

                  <View
                    className={`flex-row items-center px-2 py-0.5 rounded-full ${
                      item.isCorrect ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                    }`}
                  >
                    {item.isCorrect ? (
                      <>
                        <CheckCircle2 size={13} color="#10b981" />
                        <Text className="text-[10px] font-bold text-emerald-400 ml-1">Correct (+1.0)</Text>
                      </>
                    ) : (
                      <>
                        <XCircle size={13} color="#f43f5e" />
                        <Text className="text-[10px] font-bold text-rose-400 ml-1">Wrong (-0.25)</Text>
                      </>
                    )}
                  </View>
                </View>

                <Text className="text-sm font-bold text-white mb-3 leading-snug">{item.question}</Text>

                {/* Answer Comparison Box */}
                <View className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-3 text-xs space-y-1.5">
                  <View className="flex-row items-start">
                    <Text className="text-slate-400 w-24 font-medium text-xs">Your Answer:</Text>
                    <Text className={`text-xs font-bold flex-1 ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedOpt ? `(${selectedOpt.label}) ${selectedOpt.text}` : 'Skipped / Unattempted'}
                    </Text>
                  </View>

                  {!item.isCorrect && (
                    <View className="flex-row items-start pt-1.5 border-t border-slate-900">
                      <Text className="text-slate-400 w-24 font-medium text-xs">Correct Ans:</Text>
                      <Text className="text-xs font-bold text-emerald-400 flex-1">
                        {correctOpt ? `(${correctOpt.label}) ${correctOpt.text}` : ''}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Explanation in Bangla & English */}
                <View className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                  <View className="flex-row items-center mb-1">
                    <Sparkles size={12} color="#10b981" />
                    <Text className="text-[10px] font-bold text-emerald-400 uppercase ml-1">ব্যাখ্যা (Explanation)</Text>
                  </View>
                  <Text className="text-xs text-slate-300 leading-relaxed">{item.explanation}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
