import { z } from "zod";

export const quizQuestionSchema = z.object({
  id: z.number().optional(),
  question: z.string().min(5, "Question must be at least 5 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(["A", "B", "C", "D"] as const, {
    message: "Please select the correct answer",
  }),
  explanation: z.string().optional(),
  displayOrder: z.number().default(0),
});

export const resourceSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title/Book Name is required"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const topicFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  hindiTitle: z.string().optional(),
  className: z.string().min(1, "Class is required"),
  subject: z.string().min(1, "Subject is required"),
  shortDescription: z.string().min(5, "Short Description is required"),
  hindiShortDescription: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  hindiContent: z.string().optional(),
  procedureContent: z.string().optional(),
  hindiProcedureContent: z.string().optional(),
  videoLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  hasQuiz: z.boolean(),
  quizQuestions: z.array(quizQuestionSchema).optional(),
  resources: z.array(resourceSchema).optional(),
});

export type TopicFormValues = z.infer<typeof topicFormSchema>;
export type QuizQuestionValues = z.infer<typeof quizQuestionSchema>;
export type ResourceValues = z.infer<typeof resourceSchema>;

