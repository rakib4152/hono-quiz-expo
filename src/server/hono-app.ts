import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type {
  QuizCategory,
  QuizQuestion,
  QuizPayload,
  SubmitQuizRequest,
  SubmitQuizResponse,
  QuestionReviewItem,
  MeritStudent,
  FacebookFriend,
  UserProfile,
} from '../types/quiz';

const CATEGORIES: QuizCategory[] = [
  {
    id: 'bcs',
    title: 'BCS Preliminary',
    titleBn: 'বিসিএস প্রিলিমিনারি',
    description: '47th BCS special model test with negative marking.',
    iconName: 'GraduationCap',
    colorAccent: 'emerald',
    totalQuestions: 6,
    durationMinutes: 10,
    candidateCount: 14250,
  },
  {
    id: 'bank',
    title: 'Bank Recruitment',
    titleBn: 'ব্যাংক জব প্রস্তুতি',
    description: 'Combined 8 Banks & Bangladesh Bank Officer test.',
    iconName: 'Landmark',
    colorAccent: 'blue',
    totalQuestions: 6,
    durationMinutes: 10,
    candidateCount: 9800,
  },
  {
    id: 'govt',
    title: 'Govt. Job',
    titleBn: 'সরকারি চাকরি',
    description: 'Primary, Non-cadre & Ministry recruitment test.',
    iconName: 'Building2',
    colorAccent: 'amber',
    totalQuestions: 6,
    durationMinutes: 8,
    candidateCount: 18400,
  },
  {
    id: 'private',
    title: 'Private / Corporate',
    titleBn: 'প্রাইভেট ও করপোরেট',
    description: 'MNC, telecom, fintech & corporate aptitude test.',
    iconName: 'Briefcase',
    colorAccent: 'violet',
    totalQuestions: 6,
    durationMinutes: 8,
    candidateCount: 6200,
  },
];

const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  bank: [
    {
      id: 'bnk-1',
      subject: 'bangla',
      subjectNameBn: 'বাংলা',
      questionNumber: 1,
      question: 'কোন বানানটি শুদ্ধ?',
      options: [
        { id: 'opt-a', label: 'A', text: 'মুহূর্মুহু' },
        { id: 'opt-b', label: 'B', text: 'মুহূর্ত' },
        { id: 'opt-c', label: 'C', text: 'মূহুর্ত' },
        { id: 'opt-d', label: 'D', text: 'মুহূমুহু' },
      ],
      correctOptionId: 'opt-b',
      explanation: 'শুদ্ধ বানান হলো "মুহূর্ত" (ম-এ হ্রস্ব উ-কার, হ-এ দীর্ঘ ঊ-কার, রেফ ত)।',
      marks: 1,
    },
    {
      id: 'bnk-2',
      subject: 'bangla',
      subjectNameBn: 'বাংলা',
      questionNumber: 2,
      question: '"কাজী নজরুল ইসলাম" কোন পত্রিকার সম্পাদক ছিলেন?',
      options: [
        { id: 'opt-a', label: 'A', text: 'ধূমকেতু' },
        { id: 'opt-b', label: 'B', text: 'সবুজপত্র' },
        { id: 'opt-c', label: 'C', text: 'লাঙল' },
        { id: 'opt-d', label: 'D', text: 'কল্লোল' },
      ],
      correctOptionId: 'opt-a',
      explanation: '১৯২২ সালে প্রকাশিত অর্ধ-সাপ্তাহিক "ধূমকেতু" পত্রিকার সম্পাদক ছিলেন কাজী নজরুল ইসলাম।',
      marks: 1,
    },
    {
      id: 'bnk-3',
      subject: 'english',
      subjectNameBn: 'ইংরেজি',
      questionNumber: 3,
      question: 'Choose the correct synonym of "Paucity":',
      options: [
        { id: 'opt-a', label: 'A', text: 'Scarcity' },
        { id: 'opt-b', label: 'B', text: 'Surplus' },
        { id: 'opt-c', label: 'C', text: 'Abundance' },
        { id: 'opt-d', label: 'D', text: 'Affluence' },
      ],
      correctOptionId: 'opt-a',
      explanation: '"Paucity" means the presence of something only in small or insufficient quantities or amounts; Scarcity.',
      marks: 1,
    },
    {
      id: 'bnk-4',
      subject: 'english',
      subjectNameBn: 'ইংরেজি',
      questionNumber: 4,
      question: 'The committee has submitted ___ report on time.',
      options: [
        { id: 'opt-a', label: 'A', text: 'its' },
        { id: 'opt-b', label: 'B', text: 'their' },
        { id: 'opt-c', label: 'C', text: "it's" },
        { id: 'opt-d', label: 'D', text: 'there' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'When a collective noun acts as a single unified entity, singular neuter pronoun "its" is used.',
      marks: 1,
    },
    {
      id: 'bnk-5',
      subject: 'gk',
      subjectNameBn: 'সাধারণ জ্ঞান',
      questionNumber: 5,
      question: 'বাংলাদেশ ব্যাংকের বর্তমান গভর্নরের নাম কী?',
      options: [
        { id: 'opt-a', label: 'A', text: 'ড. আহসান এইচ মনসুর' },
        { id: 'opt-b', label: 'B', text: 'আব্দুর রউফ তালুকদার' },
        { id: 'opt-c', label: 'C', text: 'ফজলে কবির' },
        { id: 'opt-d', label: 'D', text: 'ড. আতিউর রহমান' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'বাংলাদেশ ব্যাংকের বর্তমান ১৩তম গভর্নর হলেন অর্থনীতিবিদ ড. আহসান এইচ মনসুর।',
      marks: 1,
    },
    {
      id: 'bnk-6',
      subject: 'gk',
      subjectNameBn: 'সাধারণ জ্ঞান',
      questionNumber: 6,
      question: 'Bretton Woods Conference-এর মাধ্যমে কোন দুটি আন্তর্জাতিক সংস্থা গঠিত হয়?',
      options: [
        { id: 'opt-a', label: 'A', text: 'IMF এবং World Bank' },
        { id: 'opt-b', label: 'B', text: 'WTO এবং ADB' },
        { id: 'opt-c', label: 'C', text: 'UN এবং UNESCO' },
        { id: 'opt-d', label: 'D', text: 'OECD এবং OPEC' },
      ],
      correctOptionId: 'opt-a',
      explanation: '১৯৪৪ সালে মার্কিন যুক্তরাষ্ট্রের ব্রেটন উডস সম্মেলনের মাধ্যমে বিশ্বব্যাংক (World Bank) এবং আন্তর্জাতিক মুদ্রা তহবিল (IMF) গঠিত হয়।',
      marks: 1,
    },
  ],
  bcs: [
    {
      id: 'bcs-1',
      subject: 'bangla',
      subjectNameBn: 'বাংলা',
      questionNumber: 1,
      question: 'চর্যাপদের আদি কবি কে?',
      options: [
        { id: 'opt-a', label: 'A', text: 'লুইপা' },
        { id: 'opt-b', label: 'B', text: 'কাহ্নপা' },
        { id: 'opt-c', label: 'C', text: 'শবরপা' },
        { id: 'opt-d', label: 'D', text: 'ভুসুকুপা' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'চর্যাপদের প্রথম পদটি রচনা করেন লুইপা। তাই তাকে চর্যাপদের আদি কবি বলা হয়।',
      marks: 1,
    },
    {
      id: 'bcs-2',
      subject: 'bangla',
      subjectNameBn: 'বাংলা',
      questionNumber: 2,
      question: '"আমার ভাইয়ের রক্তে রাঙানো একুশে ফেব্রুয়ারি" গানের সুরকার কে?',
      options: [
        { id: 'opt-a', label: 'A', text: 'আলতাফ মাহমুদ' },
        { id: 'opt-b', label: 'B', text: 'আব্দুল গাফফার চৌধুরী' },
        { id: 'opt-c', label: 'C', text: 'আব্দুল লতিফ' },
        { id: 'opt-d', label: 'D', text: 'সমর দাস' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'গানটির রচয়িতা আব্দুল গাফফার চৌধুরী এবং বর্তমান প্রচলিত সুরের সুরকার আলতাফ মাহমুদ (প্রথম সুর করেছিলেন আব্দুল লতিফ)।',
      marks: 1,
    },
    {
      id: 'bcs-3',
      subject: 'english',
      subjectNameBn: 'ইংরেজি',
      questionNumber: 3,
      question: 'Identify the sentence with correct subject-verb agreement:',
      options: [
        { id: 'opt-a', label: 'A', text: 'Neither the teacher nor the students were present.' },
        { id: 'opt-b', label: 'B', text: 'Neither the teacher nor the students was present.' },
        { id: 'opt-c', label: 'C', text: 'Neither the teacher nor the students has present.' },
        { id: 'opt-d', label: 'D', text: 'Neither the teacher or the students are present.' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'When compound subjects are connected by "neither...nor", the verb agrees with the subject closest to it ("students" -> "were").',
      marks: 1,
    },
    {
      id: 'bcs-4',
      subject: 'english',
      subjectNameBn: 'ইংরেজি',
      questionNumber: 4,
      question: 'What is the noun form of the word "Brief"?',
      options: [
        { id: 'opt-a', label: 'A', text: 'Brevity' },
        { id: 'opt-b', label: 'B', text: 'Briefness' },
        { id: 'opt-c', label: 'C', text: 'Briefly' },
        { id: 'opt-d', label: 'D', text: 'Brevityness' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'The standard abstract noun form of "brief" is "brevity", meaning shortness of duration.',
      marks: 1,
    },
    {
      id: 'bcs-5',
      subject: 'gk',
      subjectNameBn: 'সাধারণ জ্ঞান',
      questionNumber: 5,
      question: 'মুজিবনগর সরকার কবে শপথ গ্রহণ করে?',
      options: [
        { id: 'opt-a', label: 'A', text: '১৭ এপ্রিল ১৯৭১' },
        { id: 'opt-b', label: 'B', text: '১০ এপ্রিল ১৯৭১' },
        { id: 'opt-c', label: 'C', text: '২৬ মার্চ ১৯৭১' },
        { id: 'opt-d', label: 'D', text: '২৫ মার্চ ১৯৭১' },
      ],
      correctOptionId: 'opt-a',
      explanation: '১৯৭১ সালের ১০ এপ্রিল সরকার গঠিত হয় এবং ১৭ এপ্রিল মেহেরপুরের বৈদ্যনাথতলার ভবেরপাড়ায় আনুষ্ঠানিকভাবে শপথ গ্রহণ করে।',
      marks: 1,
    },
    {
      id: 'bcs-6',
      subject: 'gk',
      subjectNameBn: 'সাধারণ জ্ঞান',
      questionNumber: 6,
      question: 'ইউরোপের ককপিট (Cockpit of Europe) বলা হয় কোন দেশকে?',
      options: [
        { id: 'opt-a', label: 'A', text: 'বেলজিয়াম' },
        { id: 'opt-b', label: 'B', text: 'সুইজারল্যান্ড' },
        { id: 'opt-c', label: 'C', text: 'নেদারল্যান্ডস' },
        { id: 'opt-d', label: 'D', text: 'তুরস্ক' },
      ],
      correctOptionId: 'opt-a',
      explanation: 'বেলজিয়ামকে ইউরোপের ককপিট বা রণক্ষেত্র বলা হয় কারণ ইতিহাসে ইউরোপের বহু যুদ্ধ এখানে সংঘটিত হয়েছে।',
      marks: 1,
    },
  ],
};

// Mirror questions for govt and private
QUESTION_BANK['govt'] = QUESTION_BANK['bcs'];
QUESTION_BANK['private'] = QUESTION_BANK['bank'];

const MERIT_LIST: MeritStudent[] = [
  {
    rank: 1,
    name: 'তানভীর আহমেদ',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'ঢাকা বিশ্ববিদ্যালয়',
    score: 5.75,
    totalMarks: 6,
    timeTaken: '03m 42s',
    accuracy: 96,
    jobTarget: 'BCS Admin',
  },
  {
    rank: 2,
    name: 'ফারজানা ইয়াসমিন',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
    score: 5.5,
    totalMarks: 6,
    timeTaken: '04m 10s',
    accuracy: 92,
    jobTarget: 'Bangladesh Bank AD',
  },
  {
    rank: 3,
    name: 'রাকিবুল হাসান',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'বুয়েট (BUET)',
    score: 5.0,
    totalMarks: 6,
    timeTaken: '04m 35s',
    accuracy: 88,
    jobTarget: 'BCS Foreign Affairs',
  },
  {
    rank: 4,
    name: 'নুসরাত জাহান',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'চট্টগ্রাম বিশ্ববিদ্যালয়',
    score: 4.75,
    totalMarks: 6,
    timeTaken: '05m 12s',
    accuracy: 83,
    jobTarget: 'Sonali Bank Senior Officer',
  },
  {
    rank: 5,
    name: 'মাহমুদুল হক',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'রাজশাহী বিশ্ববিদ্যালয়',
    score: 4.5,
    totalMarks: 6,
    timeTaken: '05m 45s',
    accuracy: 80,
    jobTarget: 'Govt. Secondary Teacher',
  },
  {
    rank: 6,
    name: 'সাদিয়া আফরিন',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    institution: 'জগন্নাথ বিশ্ববিদ্যালয়',
    score: 4.25,
    totalMarks: 6,
    timeTaken: '06m 02s',
    accuracy: 75,
    jobTarget: 'Agrani Bank Officer',
  },
];

const FB_FRIENDS: FacebookFriend[] = [
  {
    id: 'fb-1',
    name: 'Ashikur Rahman (আশিকুর রহমান)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    mutualFriends: 42,
    status: 'joined',
    rewardEarnedTk: 50,
  },
  {
    id: 'fb-2',
    name: 'Kazi Shafiul (কাজী শফিউল)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
    mutualFriends: 28,
    status: 'joined',
    rewardEarnedTk: 50,
  },
  {
    id: 'fb-3',
    name: 'Mitu Chowdhury (মিতু চৌধুরী)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    mutualFriends: 19,
    status: 'pending',
    rewardEarnedTk: 0,
  },
  {
    id: 'fb-4',
    name: 'Imran Nazir (ইমরান নাজির)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80',
    mutualFriends: 34,
    status: 'invited',
    rewardEarnedTk: 0,
  },
  {
    id: 'fb-5',
    name: 'Sultana Razia (সুলতানা রাজিয়া)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80',
    mutualFriends: 12,
    status: 'invited',
    rewardEarnedTk: 0,
  },
];

let currentUserProfile: UserProfile = {
  name: 'Md. Rakib Hossain',
  email: 'rakib.edu.bd@gmail.com',
  institution: 'University of Dhaka',
  jobType: 'bcs',
  attemptedQuizCount: 42,
  totalMarksScored: 86.5,
  averageAccuracy: 84,
  affiliateEarningsTk: 850,
  referralCode: 'BCS2026RAKIB',
};

// Initialize and chain Hono router
const app = new Hono()
  .use('*', logger())
  .use('*', cors())
  .basePath('/api')
  .get('/health', (c) => {
    return c.json({
      status: 'ok',
      service: 'QuizPulse Job Prep Backend (BCS / Bank / Govt)',
      timestamp: new Date().toISOString(),
    });
  })
  .get('/categories', (c) => {
    return c.json({
      success: true,
      data: CATEGORIES,
      total: CATEGORIES.length,
    });
  })
  .get('/quizzes/:id', (c) => {
    const id = c.req.param('id');
    const category = CATEGORIES.find((cat) => cat.id === id) || CATEGORIES[0];
    const rawQuestions = QUESTION_BANK[category.id] || QUESTION_BANK['bank'];

    const quizPayload: QuizPayload = {
      id: category.id,
      title: category.title,
      category: category.id as any,
      description: category.description,
      totalMarks: rawQuestions.length,
      negativeMarkPerWrong: 0.25,
      timeLimitSeconds: rawQuestions.length * 40,
      questions: rawQuestions.map((q) => ({
        id: q.id,
        subject: q.subject,
        subjectNameBn: q.subjectNameBn,
        questionNumber: q.questionNumber,
        question: q.question,
        options: q.options,
        marks: q.marks,
      })),
    };

    const feedbackKey: Record<string, string> = {};
    rawQuestions.forEach((q) => {
      feedbackKey[q.id] = q.correctOptionId;
    });

    return c.json({
      success: true,
      data: quizPayload,
      feedbackKey,
    });
  })
  .post('/quizzes/submit', async (c) => {
    const body = (await c.req.json()) as SubmitQuizRequest;
    const { quizId = 'bank', answers = {}, timeSpentSeconds = 120 } = body;

    const category = CATEGORIES.find((cat) => cat.id === quizId) || CATEGORIES[0];
    const questions = QUESTION_BANK[category.id] || QUESTION_BANK['bank'];

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const review: QuestionReviewItem[] = questions.map((q) => {
      const selectedOptionId = answers[q.id] || null;
      const isSkipped = !selectedOptionId;
      const isCorrect = selectedOptionId === q.correctOptionId;

      if (isCorrect) {
        correctCount++;
      } else if (isSkipped) {
        skippedCount++;
      } else {
        wrongCount++;
      }

      return {
        questionId: q.id,
        questionNumber: q.questionNumber,
        subject: q.subject,
        subjectNameBn: q.subjectNameBn,
        question: q.question,
        selectedOptionId,
        correctOptionId: q.correctOptionId,
        isCorrect,
        isSkipped,
        explanation: q.explanation,
        options: q.options,
      };
    });

    const totalQuestions = questions.length;
    const attemptedCount = totalQuestions - skippedCount;
    const rawScore = correctCount * 1;
    const negativeMarks = wrongCount * 0.25;
    const netScore = Math.max(0, +(rawScore - negativeMarks).toFixed(2));
    const accuracyPercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Calculate pie chart percentages matching the sketch (Correct / Wrong / Skipped)
    const correctPercentage = Math.round((correctCount / totalQuestions) * 100);
    const wrongPercentage = Math.round((wrongCount / totalQuestions) * 100);
    const skippedPercentage = Math.max(0, 100 - (correctPercentage + wrongPercentage));

    const response: SubmitQuizResponse = {
      quizId: category.id,
      title: category.title,
      totalQuestions,
      attemptedCount,
      correctCount,
      wrongCount,
      skippedCount,
      rawScore,
      negativeMarks,
      netScore,
      accuracyPercentage,
      timeSpentSeconds,
      meritRank: 4,
      completedAt: new Date().toISOString(),
      pieChart: {
        correctPercentage,
        wrongPercentage,
        skippedPercentage,
      },
      review,
    };

    // Update user stats
    currentUserProfile.attemptedQuizCount += 1;
    currentUserProfile.totalMarksScored = +(
      currentUserProfile.totalMarksScored + netScore
    ).toFixed(1);

    return c.json({
      success: true,
      data: response,
    });
  })
  .get('/merit-list', (c) => {
    return c.json({
      success: true,
      data: MERIT_LIST,
      total: MERIT_LIST.length,
      userRank: 4,
    });
  })
  .get('/affiliate', (c) => {
    return c.json({
      success: true,
      data: {
        referralCode: currentUserProfile.referralCode,
        referralLink: `https://quizpulse.app/ref/${currentUserProfile.referralCode}`,
        totalEarnedTk: currentUserProfile.affiliateEarningsTk,
        pendingTk: 150,
        successfulReferrals: 17,
        fbFriends: FB_FRIENDS,
      },
    });
  })
  .get('/user-profile', (c) => {
    return c.json({
      success: true,
      data: currentUserProfile,
    });
  })
  .post('/user-profile/update', async (c) => {
    const updates = await c.req.json();
    currentUserProfile = {
      ...currentUserProfile,
      ...updates,
    };
    return c.json({
      success: true,
      data: currentUserProfile,
    });
  });

export { app };
export type AppType = typeof app;
