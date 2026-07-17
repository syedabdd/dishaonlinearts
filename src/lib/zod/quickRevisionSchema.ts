import { z } from "zod";

export const SUBJECTS = [
  "HISTORY",
  "GEOGRAPHY",
  "POLITICAL_SCIENCE",
  "ECONOMICS",
  "SOCIOLOGY",
  "HINDI",
  "ENGLISH",
] as const;

export const BOARDS = [
  "Bihar Board",
  "CBSE",
  "UP Board",
  "All Boards",
] as const;

export const EXAM_LEVELS = [
  "School Exam",
  "Board Exam",
  "Competitive",
] as const;

export const CLASSES = ["11", "12"] as const;
export const CORRECT_ANSWERS = ["A", "B", "C", "D"] as const;



export const quickRevisionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(500),
  slug: z.string().min(3).max(600).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only").optional(),
  subject: z.enum(SUBJECTS),
  chapter: z.string().max(255).optional().default("General"),
  className: z.enum(CLASSES),
  board: z.enum(BOARDS).default("All Boards"),
  examLevel: z.enum(EXAM_LEVELS).default("Board Exam"),

  // Optional contextual
  dateYear: z.string().max(100).optional().nullable(),
  place: z.string().max(255).optional().nullable(),
  people: z.string().optional().nullable(),

  // Core content
  reason: z.string().min(1, "Reason is required"),
  whatHappened: z.string().min(1, "What Happened is required"),
  result: z.string().min(1, "Result is required"),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),

  // Exam content
  pyq: z.string().optional().nullable(),

  // MCQs
  mcqs: z.array(z.object({
    question: z.string().min(1, "Question is required"),
    optionA: z.string().min(1, "Option A is required"),
    optionB: z.string().min(1, "Option B is required"),
    optionC: z.string().min(1, "Option C is required"),
    optionD: z.string().min(1, "Option D is required"),
    correctAnswer: z.enum(CORRECT_ANSWERS)
  })).optional().nullable(),

  // SEO
  keywords: z.string().optional().nullable(),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),

  // Media & display
  thumbnail: z.string().max(255).optional().nullable(),
  displayOrder: z.number().int().default(0),

  // Flags
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export type QuickRevisionInput = z.infer<typeof quickRevisionSchema>;

export const quickRevisionUpdateSchema = quickRevisionSchema.partial();

export type QuickRevisionUpdateInput = z.infer<typeof quickRevisionUpdateSchema>;

// Helper: generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .substring(0, 580);
}

// Subject display names
export const SUBJECT_LABELS: Record<string, string> = {
  HISTORY: "History",
  GEOGRAPHY: "Geography",
  POLITICAL_SCIENCE: "Political Science",
  ECONOMICS: "Economics",
  SOCIOLOGY: "Sociology",
  HINDI: "Hindi",
  ENGLISH: "English",
};

// Subject colors for badges
export const SUBJECT_COLORS: Record<string, string> = {
  HISTORY: "bg-amber-100 text-amber-800 border-amber-200",
  GEOGRAPHY: "bg-emerald-100 text-emerald-800 border-emerald-200",
  POLITICAL_SCIENCE: "bg-blue-100 text-blue-800 border-blue-200",
  ECONOMICS: "bg-purple-100 text-purple-800 border-purple-200",
  SOCIOLOGY: "bg-rose-100 text-rose-800 border-rose-200",
  HINDI: "bg-orange-100 text-orange-800 border-orange-200",
  ENGLISH: "bg-teal-100 text-teal-800 border-teal-200",
};
