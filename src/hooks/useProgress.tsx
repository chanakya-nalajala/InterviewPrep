// Hook for managing user progress on interview questions
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import {
  updateQuestionProgress,
  recalculateStats,
  subscribeToProgress,
  initializeUserProgress,
} from "../firebase/progressService";
import { QuestionStatus, UserProgress } from "../data/types";
import { getAllQuestionsWithCategories } from "../data/dataLoader";

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize and subscribe to progress
  useEffect(() => {
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      try {
        setError(null);
        // Initialize if needed
        await initializeUserProgress(user.uid);

        // Subscribe to real-time updates
        unsubscribe = subscribeToProgress(user.uid, (data) => {
          setProgress(data);
          setLoading(false);
        });
      } catch (error: any) {
        console.error("Error initializing progress:", error);
        if (error.code === "permission-denied") {
          setError(
            "Firestore permissions not configured. Please update security rules in Firebase Console.",
          );
        }
        setLoading(false);
      }
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Update question progress
  const updateProgress = useCallback(
    async (
      questionId: string,
      status: QuestionStatus,
      confidence: number,
      notes?: string,
    ) => {
      if (!user) return;

      try {
        // Update the question progress
        await updateQuestionProgress(
          user.uid,
          questionId,
          status,
          confidence,
          notes,
        );

        // Recalculate stats after updating
        const allQuestions = getAllQuestionsWithCategories();
        await recalculateStats(user.uid, allQuestions);
      } catch (error) {
        console.error("❌ Error updating progress:", error);
      }
    },
    [user],
  );

  // Recalculate statistics
  const recalcStats = useCallback(
    async (allQuestions: { id: string; categoryId: string }[]) => {
      if (!user) return;

      try {
        await recalculateStats(user.uid, allQuestions);
      } catch (error) {
        console.error("Error recalculating stats:", error);
      }
    },
    [user],
  );

  // Get status for a specific question
  const getQuestionStatus = useCallback(
    (questionId: string): QuestionStatus => {
      if (!progress || !progress.questions[questionId]) {
        return "pending";
      }
      return progress.questions[questionId].status;
    },
    [progress],
  );

  // Get confidence for a specific question
  const getQuestionConfidence = useCallback(
    (questionId: string): number => {
      if (!progress || !progress.questions[questionId]) {
        return 0;
      }
      return progress.questions[questionId].confidence;
    },
    [progress],
  );

  return {
    progress,
    loading,
    error,
    updateProgress,
    recalcStats,
    getQuestionStatus,
    getQuestionConfidence,
  };
}
