import { z } from "zod";

// ─── Constants ───────────────────────────────────────────────────────────────

export const SUBJECTS = [
  "HISTORY",
  "GEOGRAPHY",
  "POLITICAL_SCIENCE",
  "ECONOMICS",
  "SOCIOLOGY",
  "PSYCHOLOGY",
  "HINDI",
  "ENGLISH",
] as const;

export type SubjectKey = (typeof SUBJECTS)[number];

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

export const CLASSES = ["11", "12", "11th & 12th both"] as const;
export const CORRECT_ANSWERS = ["A", "B", "C", "D"] as const;

// ─── Subject display names ────────────────────────────────────────────────────

export const SUBJECT_LABELS: Record<string, string> = {
  HISTORY: "History",
  GEOGRAPHY: "Geography",
  POLITICAL_SCIENCE: "Political Science",
  ECONOMICS: "Economics",
  SOCIOLOGY: "Sociology",
  PSYCHOLOGY: "Psychology",
  HINDI: "Hindi",
  ENGLISH: "English",
};

// ─── Subject colors for badges ────────────────────────────────────────────────

export const SUBJECT_COLORS: Record<string, string> = {
  HISTORY: "bg-amber-100 text-amber-800 border-amber-200",
  GEOGRAPHY: "bg-emerald-100 text-emerald-800 border-emerald-200",
  POLITICAL_SCIENCE: "bg-blue-100 text-blue-800 border-blue-200",
  ECONOMICS: "bg-purple-100 text-purple-800 border-purple-200",
  SOCIOLOGY: "bg-rose-100 text-rose-800 border-rose-200",
  PSYCHOLOGY: "bg-indigo-100 text-indigo-800 border-indigo-200",
  HINDI: "bg-orange-100 text-orange-800 border-orange-200",
  ENGLISH: "bg-teal-100 text-teal-800 border-teal-200",
};

// ─── Helper ───────────────────────────────────────────────────────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .substring(0, 580);
}

// ─── Shared MCQ schema ────────────────────────────────────────────────────────

const mcqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(CORRECT_ANSWERS),
});

// ─── Shared base schema (common across all subjects) ─────────────────────────

const baseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(500),
  slug: z
    .string()
    .min(3)
    .max(600)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only")
    .optional(),
  subject: z.enum(SUBJECTS),
  chapter: z.string().max(255).optional().default("General"),
  className: z.enum(CLASSES),
  board: z.enum(BOARDS).default("All Boards"),
  examLevel: z.enum(EXAM_LEVELS).default("Board Exam"),

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

  // MCQs (shared by all subjects)
  mcqs: z.array(mcqSchema).optional().nullable(),

  // Exam content
  pyq: z.string().optional().nullable(),
});

// ─── Per-subject content Zod schemas ─────────────────────────────────────────

/** History subject content */
export const HistoryContentSchema = z.object({
  // Contextual
  dateYear: z.string().max(100).optional().nullable(),
  place: z.string().max(255).optional().nullable(),
  people: z.string().optional().nullable(),
  // Core narrative
  reason: z.string().min(1, "Reason is required"),
  whatHappened: z.string().min(1, "What Happened is required"),
  result: z.string().min(1, "Result is required"),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
});

/** Political Science subject content */
export const PoliticalScienceContentSchema = z.object({
  definition: z.string().min(1, "Definition is required"),
  keyFeatures: z.string().min(1, "Key Features is required"),
  importantArticles: z.string().optional().nullable(),
  importantPoints: z.string().min(1, "Important Points is required"),
  importance: z.string().min(1, "Importance is required"),
  example: z.string().optional().nullable(),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
});

/** Geography subject content */
export const GeographyContentSchema = z.object({
  definition: z.string().min(1, "Definition is required"),
  location: z.string().optional().nullable(),
  formationProcess: z.string().optional().nullable(),
  types: z.string().optional().nullable(),
  features: z.string().min(1, "Features is required"),
  importance: z.string().min(1, "Importance is required"),
  examples: z.string().optional().nullable(),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
});

/** Economics subject content */
export const EconomicsContentSchema = z.object({
  definition: z.string().min(1, "Definition is required"),
  formula: z.string().optional().nullable(),
  types: z.string().optional().nullable(),
  characteristics: z.string().min(1, "Characteristics is required"),
  advantages: z.string().optional().nullable(),
  disadvantages: z.string().optional().nullable(),
  examples: z.string().min(1, "Examples is required"),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
});

/** Sociology subject content */
export const SociologyContentSchema = z.object({
  meaning: z.string().min(1, "Meaning is required"),
  definition: z.string().min(1, "Definition is required"),
  characteristics: z.string().min(1, "Characteristics is required"),
  importance: z.string().min(1, "Importance is required"),
  examples: z.string().optional().nullable(),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
});

/** Psychology subject content */
export const PsychologyContentSchema = z.object({
  definition: z.string().min(1, "Definition is required"),
  keyConcepts: z.string().min(1, "Key Concepts is required"),
  characteristics: z.string().min(1, "Characteristics is required"),
  applications: z.string().optional().nullable(),
  examples: z.string().optional().nullable(),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
});

// ─── Full per-subject schemas (base + content) ────────────────────────────────

export const HistorySchema = baseSchema.extend({
  subject: z.literal("HISTORY"),
  dateYear: z.string().max(100).optional().nullable(),
  place: z.string().max(255).optional().nullable(),
  people: z.string().optional().nullable(),
  reason: z.string().min(1, "Reason is required"),
  whatHappened: z.string().min(1, "What Happened is required"),
  result: z.string().min(1, "Result is required"),
  interestingFact: z.string().min(1, "Interesting Fact is required"),
  examTrick: z.string().min(1, "Exam Trick is required"),
  content: z.null().optional(),
});

export const PoliticalScienceSchema = baseSchema.extend({
  subject: z.literal("POLITICAL_SCIENCE"),
  content: PoliticalScienceContentSchema,
});

export const GeographySchema = baseSchema.extend({
  subject: z.literal("GEOGRAPHY"),
  content: GeographyContentSchema,
});

export const EconomicsSchema = baseSchema.extend({
  subject: z.literal("ECONOMICS"),
  content: EconomicsContentSchema,
});

export const SociologySchema = baseSchema.extend({
  subject: z.literal("SOCIOLOGY"),
  content: SociologyContentSchema,
});

export const PsychologySchema = baseSchema.extend({
  subject: z.literal("PSYCHOLOGY"),
  content: PsychologyContentSchema,
});

// ─── Master schema (union — validates based on subject) ───────────────────────

export const quickRevisionSchema = z.discriminatedUnion("subject", [
  HistorySchema,
  PoliticalScienceSchema,
  GeographySchema,
  EconomicsSchema,
  SociologySchema,
  PsychologySchema,
  // HINDI and ENGLISH fall back to a generic schema
  baseSchema.extend({
    subject: z.literal("HINDI"),
    content: z.record(z.string(), z.any()).optional().nullable(),
    reason: z.string().optional().nullable(),
    whatHappened: z.string().optional().nullable(),
    result: z.string().optional().nullable(),
    interestingFact: z.string().optional().nullable(),
    examTrick: z.string().optional().nullable(),
  }),
  baseSchema.extend({
    subject: z.literal("ENGLISH"),
    content: z.record(z.string(), z.any()).optional().nullable(),
    reason: z.string().optional().nullable(),
    whatHappened: z.string().optional().nullable(),
    result: z.string().optional().nullable(),
    interestingFact: z.string().optional().nullable(),
    examTrick: z.string().optional().nullable(),
  }),
]);

export type QuickRevisionInput = z.infer<typeof quickRevisionSchema>;

// Update schema is fully partial (used for PUT)
export const quickRevisionUpdateSchema = baseSchema
  .extend({
    subject: z.enum(SUBJECTS).optional(),
    content: z.record(z.string(), z.any()).optional().nullable(),
    reason: z.string().optional().nullable(),
    whatHappened: z.string().optional().nullable(),
    result: z.string().optional().nullable(),
    interestingFact: z.string().optional().nullable(),
    examTrick: z.string().optional().nullable(),
    dateYear: z.string().max(100).optional().nullable(),
    place: z.string().max(255).optional().nullable(),
    people: z.string().optional().nullable(),
  })
  .partial();

export type QuickRevisionUpdateInput = z.infer<typeof quickRevisionUpdateSchema>;

// ─── Content type helpers ─────────────────────────────────────────────────────

export type HistoryContent = z.infer<typeof HistoryContentSchema>;
export type PoliticalScienceContent = z.infer<typeof PoliticalScienceContentSchema>;
export type GeographyContent = z.infer<typeof GeographyContentSchema>;
export type EconomicsContent = z.infer<typeof EconomicsContentSchema>;
export type SociologyContent = z.infer<typeof SociologyContentSchema>;
export type PsychologyContent = z.infer<typeof PsychologyContentSchema>;
