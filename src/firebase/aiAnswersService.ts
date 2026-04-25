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
 * Bulk generate AI answers for multiple questions using parallel processing
 * Only generates for questions that don't have cached answers
 */
export async function bulkGenerateAIAnswers(
  questions: Array<{ id: string; question: string; hint?: string }>,
  onProgress?: (current: number, total: number, questionText: string) => void
): Promise<{
  success: number;
  failed: number;
  cached: number;
  errors: Array<{ questionId: string; error: string }>;
}> {
  const total = questions.length;
  let completed = 0;
  let success = 0;
  let failed = 0;
  let cached = 0;
  const errors: Array<{ questionId: string; error: string }> = [];

  // Import the OpenAI service dynamically to avoid circular dependency
  const { getAIAnswer } = await import("../services/openai");

  // Filter out questions that are already cached
  const uncachedQuestions: typeof questions = [];

  console.log("🔍 Checking cache for all questions...");

  // Check cache for all questions in parallel
  const cacheChecks = await Promise.all(
    questions.map(async (q) => {
      const cachedAnswer = await getCachedAIAnswer(q.id);
      return { question: q, isCached: !!cachedAnswer };
    })
  );

  // Separate cached from uncached
  cacheChecks.forEach(({ question, isCached }) => {
    if (isCached) {
      cached++;
      console.log(`✅ Already cached: ${question.id}`);
    } else {
      uncachedQuestions.push(question);
    }
  });

  console.log(`📊 Cache check complete: ${cached} cached, ${uncachedQuestions.length} need generation`);

  if (uncachedQuestions.length === 0) {
    console.log("✅ All questions already cached!");
    return { success: 0, failed: 0, cached, errors: [] };
  }

  // Process uncached questions in parallel batches of 5
  const BATCH_SIZE = 50;
  const batches: typeof uncachedQuestions[] = [];

  for (let i = 0; i < uncachedQuestions.length; i += BATCH_SIZE) {
    batches.push(uncachedQuestions.slice(i, i + BATCH_SIZE));
  }

  console.log(`🚀 Processing ${uncachedQuestions.length} questions in ${batches.length} parallel batches`);

  // Process each batch in parallel
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];

    console.log(`📦 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} questions)`);

    // Process all questions in the batch simultaneously
    const batchResults = await Promise.allSettled(
      batch.map(async (q) => {
        try {
          // Update progress
          if (onProgress) {
            onProgress(
              cached + completed + 1,
              total,
              q.question
            );
          }

          // Generate AI answer (this will auto-cache)
          const result = await getAIAnswer(q.id, q.question, q.hint);

          if (result.error) {
            return { status: "failed", questionId: q.id, error: result.error };
          } else {
            return { status: "success", questionId: q.id };
          }
        } catch (error: any) {
          return {
            status: "failed",
            questionId: q.id,
            error: error.message || "Unknown error",
          };
        }
      })
    );

    // Process batch results
    batchResults.forEach((result, index) => {
      completed++;

      if (result.status === "fulfilled") {
        if (result.value.status === "success") {
          success++;
          console.log(`✅ Generated and cached answer for ${result.value.questionId}`);
        } else {
          failed++;
          errors.push({
            questionId: result.value.questionId,
            error: result.value.error,
          });
          console.error(`❌ Failed: ${result.value.questionId} - ${result.value.error}`);
        }
      } else {
        failed++;
        const questionId = batch[index]?.id || "unknown";
        errors.push({
          questionId,
          error: result.reason?.message || "Promise rejected",
        });
        console.error(`❌ Promise rejected for ${questionId}`);
      }
    });

    // Update progress after batch
    if (onProgress && completed < uncachedQuestions.length) {
      onProgress(
        cached + completed,
        total,
        `Batch ${batchIndex + 1}/${batches.length} complete`
      );
    }

    // Small delay between batches to be respectful to the API
    if (batchIndex < batches.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log(`🎉 Generation complete! Success: ${success}, Failed: ${failed}, Cached: ${cached}`);

  return { success, failed, cached, errors };
}

