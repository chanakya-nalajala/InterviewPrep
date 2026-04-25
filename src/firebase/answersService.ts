// Firebase AI Answers Service - Cache AI-generated answers

import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

interface AIAnswerCache {
  questionId: string;
  answer: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Get cached AI answer from Firebase
 * Returns null if not found
 */
export async function getAnswer(questionId: string): Promise<string | null> {
  try {
    const answerRef = doc(db, "aiAnswers", questionId);
    const answerSnap = await getDoc(answerRef);

    if (answerSnap.exists()) {
      const data = answerSnap.data() as AIAnswerCache;
      return data.answer;
    }

    return null;
  } catch (error) {
    console.error("Error fetching cached AI answer:", error);
    return null;
  }
}
