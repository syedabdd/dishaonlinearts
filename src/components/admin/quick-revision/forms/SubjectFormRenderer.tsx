"use client";

import React, { lazy, Suspense, memo } from "react";
import { Loader2 } from "lucide-react";

// ─── Lazy-loaded subject form components ─────────────────────────────────────

const HistoryForm = lazy(() => import("./HistoryForm"));
const PoliticalScienceForm = lazy(() => import("./PoliticalScienceForm"));
const GeographyForm = lazy(() => import("./GeographyForm"));
const EconomicsForm = lazy(() => import("./EconomicsForm"));
const SociologyForm = lazy(() => import("./SociologyForm"));
const PsychologyForm = lazy(() => import("./PsychologyForm"));

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubjectFormRendererProps {
  /** The currently selected subject value (e.g. "HISTORY", "POLITICAL_SCIENCE") */
  subject: string;
  /** Pre-populated values for edit mode.
   *  For History: flat object with named fields.
   *  For other subjects: `{ content: { ... } }` or the content object directly.
   */
  defaultValues?: Record<string, any>;
}

// ─── Loading fallback ─────────────────────────────────────────────────────────

function FormLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-sm">Loading form...</span>
    </div>
  );
}

// ─── Empty / placeholder when no subject selected ─────────────────────────────

function NoSubjectSelected() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-400">
        <span className="text-4xl">📚</span>
        <p className="text-sm font-medium">
          Select a Subject to see its content fields
        </p>
      </div>
    </div>
  );
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

/**
 * Renders the correct subject-specific form based on the selected subject.
 * Subject forms are lazy-loaded to avoid bundling all forms upfront.
 * The component is memoized so it only re-renders when subject or defaultValues change.
 */
const SubjectFormRenderer = memo(function SubjectFormRenderer({
  subject,
  defaultValues,
}: SubjectFormRendererProps) {
  // For non-History subjects, defaultValues.content holds the JSON content
  const contentDefaults = defaultValues?.content ?? {};

  if (!subject) return <NoSubjectSelected />;

  let FormComponent: React.ComponentType<{ defaultValues?: any }> | null = null;
  let formDefaults: any;

  switch (subject) {
    case "HISTORY":
      FormComponent = HistoryForm;
      // History uses flat fields directly
      formDefaults = defaultValues;
      break;

    case "POLITICAL_SCIENCE":
      FormComponent = PoliticalScienceForm;
      formDefaults = contentDefaults;
      break;

    case "GEOGRAPHY":
      FormComponent = GeographyForm;
      formDefaults = contentDefaults;
      break;

    case "ECONOMICS":
      FormComponent = EconomicsForm;
      formDefaults = contentDefaults;
      break;

    case "SOCIOLOGY":
      FormComponent = SociologyForm;
      formDefaults = contentDefaults;
      break;

    case "PSYCHOLOGY":
      FormComponent = PsychologyForm;
      formDefaults = contentDefaults;
      break;

    default:
      // HINDI, ENGLISH — generic placeholder
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-400">
            <span className="text-4xl">🚧</span>
            <p className="text-sm font-medium">
              Detailed content form for this subject is coming soon.
            </p>
          </div>
        </div>
      );
  }

  return (
    <Suspense fallback={<FormLoadingFallback />}>
      <FormComponent defaultValues={formDefaults} />
    </Suspense>
  );
});

export default SubjectFormRenderer;

// ─── Utility: collect content_ prefixed fields from FormData ─────────────────

/**
 * Extracts all `content_*` fields from a FormData object and returns
 * a plain object suitable for storing in the `content` JSON column.
 *
 * e.g. content_definition → content.definition
 */
export function collectContentFields(
  fd: FormData
): Record<string, string> | null {
  const content: Record<string, string> = {};
  let hasAny = false;

  fd.forEach((value, key) => {
    if (key.startsWith("content_")) {
      const fieldName = key.replace("content_", "");
      const strVal = (value as string).trim();
      if (strVal) {
        content[fieldName] = strVal;
        hasAny = true;
      }
    }
  });

  return hasAny ? content : null;
}

/**
 * Returns true if the subject stores data in the `content` JSON column
 * (i.e. NOT History).
 */
export function subjectUsesContentJson(subject: string): boolean {
  return !["HISTORY", "HINDI", "ENGLISH"].includes(subject);
}
