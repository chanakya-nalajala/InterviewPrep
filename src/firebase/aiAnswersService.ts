// Firebase AI Answers Service - Cache AI-generated answers

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
export async function getCachedAIAnswer(
  questionId: string,
): Promise<string | null> {
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

/**
 * Save AI answer to Firebase cache
 */
export async function saveAIAnswer(
  questionId: string,
  answer: string,
): Promise<void> {
  try {
    const answerRef = doc(db, "aiAnswers", questionId);

    // Check if answer already exists
    const existingSnap = await getDoc(answerRef);

    if (existingSnap.exists()) {
      // Update existing answer
      await setDoc(
        answerRef,
        {
          answer,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    } else {
      // Create new answer
      await setDoc(answerRef, {
        questionId,
        answer,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error saving AI answer to cache:", error);
    // Don't throw - failing to cache shouldn't break the UI
  }
}

/**
 * Get AI answer - checks cache first, then calls OpenAI if needed
 */
export async function getAIAnswerWithCache(
  questionId: string,
  question: string,
  hint?: string,
  getAIAnswer?: (
    question: string,
    hint?: string,
  ) => Promise<{ answer: string; error?: string }>,
): Promise<{ answer: string; error?: string; fromCache: boolean }> {
  // First, try to get from cache
  const cachedAnswer = await getCachedAIAnswer(questionId);

  if (cachedAnswer) {
    return {
      answer: cachedAnswer,
      fromCache: true,
    };
  }

  // If not in cache and no AI function provided, return error
  if (!getAIAnswer) {
    return {
      answer: "",
      error: "No cached answer found and AI service not available",
      fromCache: false,
    };
  }

  // Call OpenAI API
  const result = await getAIAnswer(question, hint);

  // If successful, save to cache
  if (result.answer && !result.error) {
    await saveAIAnswer(questionId, result.answer);
  }

  return {
    ...result,
    fromCache: false,
  };
}
