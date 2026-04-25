// Data Loader Service - Load questions from data.json
import { CategoryData, TopicSection, Question } from "./types";
import questionsData from "./data.json";

interface JSONQuestion {
  id: string;
  type: "interview" | "scenario";
  question: string;
  hint: string;
  answer: string | null;
}

interface JSONSection {
  sectionId: string;
  sectionName: string;
  questions: JSONQuestion[];
}

interface JSONCategory {
  categoryId: string;
  categoryName: string;
  icon: string;
  color: string;
  description: string;
  sections: JSONSection[];
}

/**
 * Transform JSON data into CategoryData format
 */
function transformJSONToCategory(jsonCategory: JSONCategory): CategoryData {
  const sections: TopicSection[] = jsonCategory.sections.map((jsonSection) => {
    const interviewQuestions: Question[] = [];
    const scenarioQuestions: Question[] = [];

    jsonSection.questions.forEach((q) => {
      const question: Question = {
        id: q.id,
        type: q.type,
        question: q.question,
        hint: q.hint,
      };

      if (q.type === "interview") {
        interviewQuestions.push(question);
      } else {
        scenarioQuestions.push(question);
      }
    });

    return {
      id: jsonSection.sectionId,
      name: jsonSection.sectionName,
      interviewQuestions,
      scenarioQuestions,
    };
  });

  return {
    id: jsonCategory.categoryId,
    name: jsonCategory.categoryName,
    icon: jsonCategory.icon,
    color: jsonCategory.color,
    description: jsonCategory.description,
    sections,
  };
}

/**
 * Load all categories from data.json
 */
export function loadAllCategories(): CategoryData[] {
  const typedData = questionsData as JSONCategory[];
  return typedData.map(transformJSONToCategory);
}

/**
 * Get a specific category by ID
 */
export function getCategoryById(categoryId: string): CategoryData | null {
  const categories = loadAllCategories();
  return categories.find((cat) => cat.id === categoryId) || null;
}

/**
 * Get all questions with their category IDs (for progress tracking)
 */
export function getAllQuestionsWithCategories(): Array<{
  id: string;
  categoryId: string;
}> {
  const typedData = questionsData as JSONCategory[];
  const result: Array<{ id: string; categoryId: string }> = [];

  typedData.forEach((category) => {
    category.sections.forEach((section) => {
      section.questions.forEach((question) => {
        result.push({
          id: question.id,
          categoryId: category.categoryId,
        });
      });
    });
  });

  return result;
}

/**
 * Get total question count
 */
export function getTotalQuestionCount(): number {
  const typedData = questionsData as JSONCategory[];
  let total = 0;

  typedData.forEach((category) => {
    category.sections.forEach((section) => {
      total += section.questions.length;
    });
  });

  return total;
}

/**
 * Get answer for a specific question from data.json
 */
export function getAnswerByQuestionId(questionId: string): string | null {
  const typedData = questionsData as JSONCategory[];

  for (const category of typedData) {
    for (const section of category.sections) {
      const question = section.questions.find((q) => q.id === questionId);
      if (question) {
        return question.answer;
      }
    }
  }

  return null;
}

/**
 * Get category ID for a specific question ID
 */
export function getCategoryIdByQuestionId(questionId: string): string | null {
  const typedData = questionsData as JSONCategory[];

  for (const category of typedData) {
    for (const section of category.sections) {
      const question = section.questions.find((q) => q.id === questionId);
      if (question) {
        return category.categoryId;
      }
    }
  }

  return null;
}

/**
 * Get all organized categories from data.json
 * Categories are already properly organized in the JSON file
 */
export function getOrganizedCategories(): CategoryData[] {
  return loadAllCategories();
}
