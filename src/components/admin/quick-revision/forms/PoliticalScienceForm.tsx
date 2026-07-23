"use client";

import React from "react";
import { FormSection, FieldTextarea } from "./shared";
import type { PoliticalScienceContent } from "@/lib/zod/quickRevisionSchema";

interface PoliticalScienceFormProps {
  /** Pre-populated values for the edit page (parsed from DB `content` JSON) */
  defaultValues?: Partial<PoliticalScienceContent>;
}

/**
 * Political Science subject form.
 * All fields are prefixed with `content.` to signal the API to pack them
 * into the JSON `content` column.
 *
 * Field names use `content_*` convention so the submit handler can collect
 * them and build the content object without hidden inputs.
 */
export default function PoliticalScienceForm({
  defaultValues,
}: PoliticalScienceFormProps) {
  const d = defaultValues ?? {};

  return (
    <>
      <FormSection title="Definition & Features" icon="📜">
        <div className="space-y-5">
          <FieldTextarea
            name="content_definition"
            label="Definition"
            required
            rows={3}
            placeholder="Write a clear definition..."
            defaultValue={d.definition ?? ""}
          />
          <FieldTextarea
            name="content_keyFeatures"
            label="Key Features"
            required
            rows={4}
            placeholder="List main features, one per line or in paragraph..."
            defaultValue={d.keyFeatures ?? ""}
          />
          <FieldTextarea
            name="content_importantArticles"
            label="Important Articles (Optional)"
            rows={3}
            placeholder="e.g. Article 14 – Right to Equality..."
            defaultValue={d.importantArticles ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Key Points & Importance" icon="🔑">
        <div className="space-y-5">
          <FieldTextarea
            name="content_importantPoints"
            label="Important Points"
            required
            rows={4}
            placeholder="Bullet key points for exam revision..."
            defaultValue={d.importantPoints ?? ""}
          />
          <FieldTextarea
            name="content_importance"
            label="Importance"
            required
            rows={3}
            placeholder="Why is this concept important?"
            defaultValue={d.importance ?? ""}
          />
          <FieldTextarea
            name="content_example"
            label="Example (Optional)"
            rows={3}
            placeholder="Give a real-world example..."
            defaultValue={d.example ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Exam Preparation" icon="🎯">
        <div className="space-y-5">
          <FieldTextarea
            name="content_interestingFact"
            label="Interesting Fact"
            required
            rows={2}
            placeholder="A fascinating fact students will remember..."
            defaultValue={d.interestingFact ?? ""}
          />
          <FieldTextarea
            name="content_examTrick"
            label="Exam Trick"
            required
            rows={2}
            placeholder="Memory trick, mnemonic, or important exam point..."
            defaultValue={d.examTrick ?? ""}
          />
        </div>
      </FormSection>
    </>
  );
}
