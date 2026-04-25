// Firebase service for tracking user progress on interview questions
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import {
  CategoryStats,
  ProgressStats,
  QuestionProgress,
  QuestionStatus,
  UserProgress,
} from "../data/types";
import { getTotalQuestionCount } from "../data/dataLoader";

// Collection name
const PROGRESS_COLLECTION = "userProgress";

/**
 * Initialize progress document for a new user
 */
export async function initializeUserProgress(userId: string): Promise<void> {
  try {
    const docRef = doc(db, PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const totalQuestions = getTotalQuestionCount();
      const initialProgress: UserProgress = {
        userId,
        questions: {},
        stats: {
          total: totalQuestions,
          done: 0,
          revisit: 0,
          pending: totalQuestions,
          skipped: 0,
          avgConfidence: 0,
          byCategory: {},
        },
        lastSync: Date.now(),
      };
      await setDoc(docRef, initialProgress);
    }
  } catch (error: any) {
    // If permission denied, log but don't throw - user will see empty progress
    if (error.code === "permission-denied") {
      console.warn(
        "Firestore permission denied. Please update security rules.",
      );
      console.warn("Go to Firebase Console > Firestore > Rules and add:");
      console.warn(`
                          rules_version = '2';
                          service cloud.firestore {
                            match /databases/{database}/documents {
                              match /userProgress/{userId} {
                                allow read, write: if request.auth != null && request.auth.uid == userId;
                              }
                            }
                          }
                   `);
    } else {
      throw error;
    }
  }
}

/**
 * Get user's progress data
 */
export async function getUserProgress(
  userId: string,
): Promise<UserProgress | null> {
  try {
    const docRef = doc(db, PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProgress;
    }
    return null;
  } catch (error: any) {
    if (error.code === "permission-denied") {
      console.warn("Firestore permission denied. Check security rules.");
      return null;
    }
    throw error;
  }
}

/**
 * Update progress for a specific question
 */
export async function updateQuestionProgress(
  userId: string,
  questionId: string,
  status: QuestionStatus,
  confidence: number,
  notes?: string,
): Promise<void> {
  const docRef = doc(db, PROGRESS_COLLECTION, userId);

  // Build progress object without undefined values (Firestore doesn't allow them)
  const progress: QuestionProgress = {
    questionId,
    status,
    confidence,
    lastUpdated: Date.now(),
  };

  // Only add notes if provided
  if (notes !== undefined && notes !== null && notes !== "") {
    progress.notes = notes;
  }

  // Use setDoc with merge to create document if it doesn't exist
  await setDoc(
    docRef,
    {
      userId,
      questions: {
        [questionId]: progress,
      },
      lastSync: Date.now(),
    },
    { merge: true }, // This creates the document if it doesn't exist
  );
}

/**
 * Calculate and update statistics
 */
export async function recalculateStats(
  userId: string,
  allQuestions: { id: string; categoryId: string }[],
): Promise<void> {
  const userProgress = await getUserProgress(userId);
  if (!userProgress) {
    console.warn("⚠️ No user progress found!");
    return;
  }

  const questions = userProgress.questions;
  let done = 0;
  let revisit = 0;
  let skipped = 0;
  let totalConfidence = 0;
  let countWithConfidence = 0;

  const byCategory: Record<string, CategoryStats> = {};

  // Calculate stats
  Object.values(questions).forEach((q) => {
    if (q.status === "done") done++;
    else if (q.status === "revisit") revisit++;
    else if (q.status === "skipped") skipped++;

    if (q.confidence > 0) {
      totalConfidence += q.confidence;
      countWithConfidence++;
    }
  });

  // Calculate by category
  allQuestions.forEach((q) => {
    if (!byCategory[q.categoryId]) {
      byCategory[q.categoryId] = {
        total: 0,
        done: 0,
        revisit: 0,
        pending: 0,
        avgConfidence: 0,
      };
    }
    byCategory[q.categoryId].total++;

    const progress = questions[q.id];
    if (progress) {
      if (progress.status === "done") byCategory[q.categoryId].done++;
      else if (progress.status === "revisit")
        byCategory[q.categoryId].revisit++;
      else byCategory[q.categoryId].pending++;
    } else {
      byCategory[q.categoryId].pending++;
    }
  });

  const totalQuestions = getTotalQuestionCount();
  const stats: ProgressStats = {
    total: totalQuestions,
    done,
    revisit,
    pending: totalQuestions - done - revisit - skipped,
    skipped,
    avgConfidence:
      countWithConfidence > 0 ? totalConfidence / countWithConfidence : 0,
    byCategory,
  };

  const docRef = doc(db, PROGRESS_COLLECTION, userId);
  await updateDoc(docRef, {
    stats,
    lastSync: Date.now(),
  });

}

/**
 * Subscribe to real-time updates for user progress
 */
export function subscribeToProgress(
  userId: string,
  callback: (progress: UserProgress | null) => void,
): () => void {
  const docRef = doc(db, PROGRESS_COLLECTION, userId);
  return onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        callback(doc.data() as UserProgress);
      } else {
        callback(null);
      }
    },
    (error: any) => {
      if (error.code === "permission-denied") {
        console.warn("Firestore permission denied. Check security rules.");
        callback(null);
      } else {
        console.error("Error subscribing to progress:", error);
      }
    },
  );
}
