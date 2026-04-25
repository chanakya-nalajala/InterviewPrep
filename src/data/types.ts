// Data types for comprehensive interview questions

export interface Question {
  id: string;
  question: string;
  hint: string;
  type: "interview" | "scenario";
}

export interface TopicSection {
  id: string;
  name: string;
  interviewQuestions: Question[];
  scenarioQuestions: Question[];
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  sections: TopicSection[];
}

// Progress Tracking Types
export type QuestionStatus = "pending" | "done" | "revisit" | "skipped";

export interface QuestionProgress {
  questionId: string;
  status: QuestionStatus;
  confidence: number; // 1-5 scale
  lastUpdated: number; // timestamp
  notes?: string;
}

export interface UserProgress {
  userId: string;
  questions: Record<string, QuestionProgress>; // questionId -> progress
  stats: ProgressStats;
  lastSync: number;
}

export interface ProgressStats {
  total: number;
  done: number;
  revisit: number;
  pending: number;
  skipped: number;
  avgConfidence: number;
  byCategory: Record<string, CategoryStats>;
}

export interface CategoryStats {
  total: number;
  done: number;
  revisit: number;
  pending: number;
  avgConfidence: number;
}
