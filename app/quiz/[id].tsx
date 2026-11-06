import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, AlertTriangle, ChevronRight, Check } from 'lucide-react-native';
import { useQuiz, useSubmitQuiz } from '../../src/hooks/useQuiz';

export default function QuizExecutionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const quizId = (id as string) || 'bank';

  const { data, isLoading } = useQuiz(quizId);
  const quiz = data?.quiz;
  const questions = quiz?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submitMutation = useSubmitQuiz();

  const submitExam = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    submitMutation.mutate(
      {
        quizId,
        answers,
        timeSpentSeconds: timeSpent,
      },
      {
        onSuccess: () => {
          router.replace({
            pathname: '/quiz/result',
            params: { quizId },
          });
        },
        onError: () => {
          router.replace({
            pathname: '/quiz/result',
            params: { quizId },
          });
        },
      }
    );
  }, [quizId, answers, timeSpent, submitMutation, router]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  useEffect(() => {
    if (isLoading || !quiz) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, quiz, submitExam]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading || !quiz || questions.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="text-sm font-bold text-white mt-3">Loading Question Paper...</Text>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedOptionId = answers[currentQ?.id];

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Top Navbar matching sketch: "Bank" (Category Title) + Timer */}
      <View className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex-row items-center justify-between">
        <Pressable
          onPress={() => setShowExitModal(true)}
          className="w-9 h-9 rounded-xl bg-slate-800 items-center justify-center border border-slate-700"
        >
          <ArrowLeft size={18} color="#ffffff" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-white uppercase tracking-wider">{quiz.title}</Text>
          <Text className="text-[11px] text-slate-400 font-medium">Negative Marking: 0.25</Text>
        </View>

        <View className="flex-row items-center bg-slate-950 border border-slate-800 rounded-full px-3 py-1">
          <Clock size={13} color="#10b981" />
          <Text className="text-xs font-mono font-bold text-emerald-400 ml-1.5">{formatTimer(timeLeft)}</Text>
        </View>
      </View>

      {/* Question Number Pills Navigation */}
      <View className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {questions.map((q, idx) => {
            const isAnswered = Boolean(answers[q.id]);
            const isCurrent = idx === currentIndex;
            return (
              <Pressable
                key={q.id}
                onPress={() => setCurrentIndex(idx)}
                className={`w-9 h-9 rounded-xl items-center justify-center mx-1 border font-bold text-xs ${
                  isCurrent
                    ? 'bg-emerald-500 border-emerald-400'
                    : isAnswered
                    ? 'bg-emerald-950/60 border-emerald-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isCurrent ? 'text-slate-950' : isAnswered ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {idx + 1}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-20" showsVerticalScrollIndicator={false}>
        {/* Question Header Card matching sketch: Q.1 / Q.2 */}
        <View className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5 shadow-lg">
          <View className="flex-row items-center justify-between mb-3">
            <View className="bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
              <Text className="text-xs font-bold text-emerald-400">
                Q.{currentQ.questionNumber} ({currentQ.subjectNameBn})
              </Text>
            </View>
            <Text className="text-xs text-slate-400 font-medium">1 Mark • (-0.25 wrong)</Text>
          </View>

          <Text className="text-base font-bold text-white leading-relaxed mb-1">{currentQ.question}</Text>
        </View>

        {/* Options List matching sketch: A. B. C. D. */}
        <View className="space-y-3 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => handleSelectOption(currentQ.id, opt.id)}
                className={`p-4 rounded-2xl border flex-row items-center justify-between mb-3 transition-all ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/20'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <View className="flex-row items-center flex-1 mr-3">
                  <View
                    className={`w-8 h-8 rounded-xl items-center justify-center mr-3 font-bold ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Text className={`text-xs font-bold ${isSelected ? 'text-slate-950' : 'text-slate-300'}`}>
                      {opt.label}.
                    </Text>
                  </View>
                  <Text className={`text-sm flex-1 leading-snug ${isSelected ? 'text-emerald-200 font-bold' : 'text-slate-200'}`}>
                    {opt.text}
                  </Text>
                </View>

                <View
                  className={`w-6 h-6 rounded-full border items-center justify-center ${
                    isSelected ? 'bg-emerald-500 border-emerald-400' : 'border-slate-700 bg-slate-950'
                  }`}
                >
                  {isSelected && <Check size={14} color="#020617" strokeWidth={3} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Navigation CTAs: Prev / Next / Submit Exam */}
        <View className="flex-row items-center justify-between pt-2">
          {currentIndex > 0 ? (
            <Pressable
              onPress={() => setCurrentIndex((i) => i - 1)}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 active:bg-slate-800"
            >
              <Text className="text-xs font-bold text-slate-300">Previous</Text>
            </Pressable>
          ) : (
            <View />
          )}

          {currentIndex < questions.length - 1 ? (
            <Pressable
              onPress={() => setCurrentIndex((i) => i + 1)}
              className="px-6 py-3 rounded-xl bg-emerald-500 active:bg-emerald-600 flex-row items-center shadow-lg shadow-emerald-500/20"
            >
              <Text className="text-xs font-bold text-slate-950 mr-1">Next Question</Text>
              <ChevronRight size={16} color="#020617" />
            </Pressable>
          ) : (
            <Pressable
              onPress={submitExam}
              disabled={submitMutation.isPending}
              className="px-6 py-3 rounded-xl bg-emerald-500 active:bg-emerald-600 flex-row items-center shadow-lg shadow-emerald-500/20"
            >
              {submitMutation.isPending ? (
                <ActivityIndicator size="small" color="#020617" />
              ) : (
                <Text className="text-xs font-bold text-slate-950">Submit Final Exam</Text>
              )}
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Exit Modal */}
      <Modal visible={showExitModal} transparent animationType="fade" onRequestClose={() => setShowExitModal(false)}>
        <View className="flex-1 bg-black/80 items-center justify-center p-5">
          <View className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
            <View className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 items-center justify-center mx-auto mb-3">
              <AlertTriangle size={24} color="#f59e0b" />
            </View>
            <Text className="text-lg font-bold text-white text-center mb-1">Exit Ongoing Exam?</Text>
            <Text className="text-xs text-slate-400 text-center mb-5 leading-relaxed">
              If you leave now, your exam answers will be submitted as-is with negative marking evaluated.
            </Text>
            <View className="space-y-2">
              <Pressable onPress={() => setShowExitModal(false)} className="w-full bg-emerald-500 py-3 rounded-xl items-center mb-2">
                <Text className="text-xs font-bold text-slate-950">Continue Exam</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowExitModal(false);
                  router.replace('/');
                }}
                className="w-full bg-slate-800 border border-slate-700 py-3 rounded-xl items-center"
              >
                <Text className="text-xs font-semibold text-rose-400">Abandon & Go Home</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
