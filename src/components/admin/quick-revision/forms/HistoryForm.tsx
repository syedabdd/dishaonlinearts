"use client";

import React from "react";
import { FormSection, FieldInput, FieldTextarea } from "./shared";

interface HistoryFormProps {
  /** Pre-populated values for the edit page */
  defaultValues?: Record<string, any>;
}

/**
 * History-specific form fields.
 * Uses the existing named DB columns (dateYear, place, people,
 * reason, whatHappened, result, interestingFact, examTrick).
 * These are stored directly on the QuickRevision row — NOT in content JSON.
 */
export default function HistoryForm({ defaultValues }: HistoryFormProps) {
  const d = defaultValues ?? {};

  return (
    <>
      {/* Contextual Details */}
      <FormSection title="Contextual Details" icon="🗓️">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FieldInput
            name="dateYear"
            label="Date / Year"
            placeholder="e.g. 23 June 1757"
            defaultValue={d.dateYear ?? ""}
          />
          <FieldInput
            name="place"
            label="Place"
            placeholder="e.g. Plassey, Bengal"
            defaultValue={d.place ?? ""}
          />
          <FieldInput
            name="people"
            label="People / Person"
            placeholder="e.g. Robert Clive, Siraj ud-Daulah"
            defaultValue={d.people ?? ""}
          />
        </div>
      </FormSection>

      {/* Core Content */}
      <FormSection title="Core Content" icon="📝">
        <div className="space-y-5">
          <FieldTextarea
            name="reason"
            label="Reason"
            required
            rows={3}
            placeholder="Why did this happen? What was the cause?"
            defaultValue={d.reason ?? ""}
          />
          <FieldTextarea
            name="whatHappened"
            label="What Happened"
            required
            rows={4}
            placeholder="Describe the event in detail..."
            defaultValue={d.whatHappened ?? ""}
          />
          <FieldTextarea
            name="result"
            label="Result"
            required
            rows={3}
            placeholder="What was the outcome?"
            defaultValue={d.result ?? ""}
          />
          <FieldTextarea
            name="interestingFact"
            label="Interesting Fact"
            required
            rows={2}
            placeholder="A fascinating fact students will remember..."
            defaultValue={d.interestingFact ?? ""}
          />
          <FieldTextarea
            name="examTrick"
            label="Exam Trick"
            required
            rows={2}
            placeholder="Memory trick, mnemonic, or important point for exams..."
            defaultValue={d.examTrick ?? ""}
          />
        </div>
      </FormSection>
    </>
  );
}
