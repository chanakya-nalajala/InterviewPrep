// OpenAI API Service - Get AI-generated answers for interview questions

export interface AIResponse {
  answer: string;
  error?: string;
}

/**
 * Get AI-generated answer for an interview question
 */
export async function getAIAnswer(
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
          - Direct, crisp, engineer-to-engineer explanation
          - Short, structured sentences
          - No emojis, no fluff, no conversational padding
          
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
