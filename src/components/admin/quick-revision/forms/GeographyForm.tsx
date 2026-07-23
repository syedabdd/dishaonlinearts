"use client";

import React from "react";
import { FormSection, FieldTextarea } from "./shared";
import type { GeographyContent } from "@/lib/zod/quickRevisionSchema";

interface GeographyFormProps {
  defaultValues?: Partial<GeographyContent>;
}

export default function GeographyForm({ defaultValues }: GeographyFormProps) {
  const d = defaultValues ?? {};

  return (
    <>
      <FormSection title="Definition & Location" icon="🌍">
        <div className="space-y-5">
          <FieldTextarea
            name="content_definition"
            label="Definition"
            required
            rows={3}
            placeholder="Define this geographical concept..."
            defaultValue={d.definition ?? ""}
          />
          <FieldTextarea
            name="content_location"
            label="Location (Optional)"
            rows={2}
            placeholder="Where is this found? Latitude/longitude, region..."
            defaultValue={d.location ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Formation & Types" icon="🏔️">
        <div className="space-y-5">
          <FieldTextarea
            name="content_formationProcess"
            label="Formation / Process (Optional)"
            rows={3}
            placeholder="How does this form or occur?"
            defaultValue={d.formationProcess ?? ""}
          />
          <FieldTextarea
            name="content_types"
            label="Types (Optional)"
            rows={3}
            placeholder="List the types or classifications..."
            defaultValue={d.types ?? ""}
          />
          <FieldTextarea
            name="content_features"
            label="Features"
            required
            rows={4}
            placeholder="Key characteristics and features..."
            defaultValue={d.features ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Importance & Examples" icon="🌿">
        <div className="space-y-5">
          <FieldTextarea
            name="content_importance"
            label="Importance"
            required
            rows={3}
            placeholder="Why is this significant?"
            defaultValue={d.importance ?? ""}
          />
          <FieldTextarea
            name="content_examples"
            label="Examples (Optional)"
            rows={3}
            placeholder="Real-world examples, Indian examples preferred..."
            defaultValue={d.examples ?? ""}
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
            placeholder="A fascinating geographical fact..."
            defaultValue={d.interestingFact ?? ""}
          />
          <FieldTextarea
            name="content_examTrick"
            label="Exam Trick"
            required
            rows={2}
            placeholder="Memory trick or important exam point..."
            defaultValue={d.examTrick ?? ""}
          />
        </div>
      </FormSection>
    </>
  );
}
