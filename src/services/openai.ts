// OpenAI API Service - Get AI-generated answers for interview questions

import { getCachedAIAnswer, saveAIAnswer } from "../firebase/aiAnswersService";

export interface AIResponse {
  answer: string;
  error?: string;
  fromCache?: boolean;
}

/**
 * Get AI answer with cache-first strategy:
 * 1. Check Firebase cache
 * 2. If not found, call OpenAI API
 * 3. Cache the response
 * 4. Return error only if both fail
 */
export async function getAIAnswer(
  questionId: string,
  question: string,
  hint?: string,
): Promise<AIResponse> {
  // Step 1: Try to get from cache first
  try {
    const cachedAnswer = await getCachedAIAnswer(questionId);
    if (cachedAnswer) {
      console.log("✅ AI answer loaded from cache:", questionId);
      return {
        answer: cachedAnswer,
        fromCache: true,
      };
    }
  } catch (error) {
    console.warn("Cache lookup failed, will try API:", error);
    // Don't fail here - continue to API call
  }

  // Step 2: Cache miss - call OpenAI API
  const apiResponse = await callOpenAI(question, hint);

  // Step 3: If API succeeded, save to cache
  if (apiResponse.answer && !apiResponse.error) {
    try {
      await saveAIAnswer(questionId, apiResponse.answer);
      console.log("💾 AI answer cached successfully:", questionId);
    } catch (error) {
      console.warn("Failed to cache answer, but continuing:", error);
      // Don't fail - we still have the answer
    }
  }

  return {
    ...apiResponse,
    fromCache: false,
  };
}

/**
 * Call OpenAI API directly (internal function)
 */
async function callOpenAI(
  question: string,
  hint?: string,
): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return {
      answer: "",
      error:
        "OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables.",
    };
  }

  try {
    const systemPrompt = `
          You are a senior software engineer answering interview questions across Java, Spring Boot, system design, databases, and backend engineering.
          
          Guidelines:
          - Answer strictly based on the given question and hint (if provided).
          - Keep responses concise (70–100 words) unless complexity demands slightly more.
          - Be technically precise and interview-ready.
          - Focus on core concept, working, and key distinctions or trade-offs when relevant.
          - Avoid storytelling, filler phrases, and generic explanations.
          - If a concept has variants or edge cases, include only the most important ones.
          - Do not add unrelated background or over-explain.
          
          Style:
          - Use markdown default for formatting the answer
          - Direct, crisp, engineer-to-engineer explanation
          - Short, structured sentences
          - No emojis, no fluff, no conversational padding
          - Use code blocks for code examples
          
          Goal:
          Help the candidate deliver clear, confident, and high-signal interview answers.
          `;

    const userPrompt = hint
      ? `Question: ${question}\nHint: ${hint}`
      : `Question: ${question}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API error: ${response.status}`,
      );
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("No answer received from AI");
    }

    return { answer };
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return {
      answer: "",
      error: error.message || "Failed to get AI answer. Please try again.",
    };
  }
}
