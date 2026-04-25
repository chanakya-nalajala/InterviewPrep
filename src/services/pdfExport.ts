// PDF Export Service - Export questions and answers to PDF

import jsPDF from "jspdf";
import { Question, TopicSection } from "../data/types";
import { getCachedAIAnswer } from "../firebase/aiAnswersService";

interface ExportOptions {
  sectionName: string;
  categoryName: string;
  categoryColor: string;
  includeHints: boolean;
  includeAIAnswers: boolean;
}

/**
 * Export a section's questions to PDF with optional AI answers
 */
export async function exportSectionToPDF(
  section: TopicSection,
  options: ExportOptions,
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = 20;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text(options.categoryName, margin, yPosition);

  yPosition += 10;
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text(options.sectionName, margin, yPosition);

  yPosition += 5;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Interview Questions
  if (section.interviewQuestions.length > 0) {
    yPosition = await addQuestionsSection(
      doc,
      "Interview Questions",
      section.interviewQuestions,
      yPosition,
      margin,
      options,
    );
  }

  // Scenario Questions
  if (section.scenarioQuestions.length > 0) {
    await addQuestionsSection(
      doc,
      "Scenario Questions",
      section.scenarioQuestions,
      yPosition,
      margin,
      options,
    );
  }

  // Footer
  addFooter(doc);

  // Generate filename
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `${options.categoryName}_${options.sectionName}_${timestamp}.pdf`;

  // Download
  doc.save(filename);
}

/**
 * Add a section of questions to the PDF
 */
async function addQuestionsSection(
  doc: jsPDF,
  title: string,
  questions: Question[],
  startY: number,
  margin: number,
  options: ExportOptions,
): Promise<number> {
  let yPosition = startY;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Section title
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text(title, margin, yPosition);
  yPosition += 8;

  // Process each question
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    // Question number and text
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    const questionHeader = `Q${i + 1}. `;
    doc.text(questionHeader, margin, yPosition);

    doc.setFont("helvetica", "normal");
    const questionText = doc.splitTextToSize(
      question.question,
      pageWidth - margin * 2 - 10,
    );
    doc.text(questionText, margin + 10, yPosition);
    yPosition += questionText.length * 6;

    // Hint (if enabled)
    if (options.includeHints && question.hint) {
      yPosition += 3;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "italic");
      const hintText = doc.splitTextToSize(
        `💡 Hint: ${question.hint}`,
        pageWidth - margin * 2 - 5,
      );
      doc.text(hintText, margin + 5, yPosition);
      yPosition += hintText.length * 5;
    }

    // AI Answer (if enabled and available)
    if (options.includeAIAnswers) {
      try {
        const aiAnswer = await getCachedAIAnswer(question.id);
        if (aiAnswer) {
          yPosition += 3;
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 180);
          doc.setFont("helvetica", "bold");
          doc.text("Answer:", margin + 5, yPosition);
          yPosition += 5;

          doc.setFont("helvetica", "normal");
          doc.setTextColor(40, 40, 40);

          // Clean markdown for PDF (basic conversion)
          const cleanAnswer = aiAnswer
            .replace(/#{1,3}\s/g, "") // Remove markdown headers
            .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
            .replace(/\*(.*?)\*/g, "$1") // Remove italic
            .replace(/`(.*?)`/g, "$1"); // Remove code backticks

          const answerLines = doc.splitTextToSize(
            cleanAnswer,
            pageWidth - margin * 2 - 5,
          );
          doc.text(answerLines, margin + 5, yPosition);
          yPosition += answerLines.length * 5;
        }
      } catch (error) {
        console.warn("Could not fetch AI answer for", question.id);
      }
    }

    yPosition += 8; // Space between questions
  }

  return yPosition + 10;
}

/**
 * Add footer with page numbers
 */
function addFooter(doc: jsPDF): void {
  const pageCount = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
    doc.text(
      "Generated by Interview Prep App",
      pageWidth - 15,
      pageHeight - 10,
      { align: "right" },
    );
  }
}
