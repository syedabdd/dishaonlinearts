"use client";

import React from "react";
import { FormSection, FieldTextarea } from "./shared";
import type { PsychologyContent } from "@/lib/zod/quickRevisionSchema";

interface PsychologyFormProps {
  defaultValues?: Partial<PsychologyContent>;
}

export default function PsychologyForm({ defaultValues }: PsychologyFormProps) {
  const d = defaultValues ?? {};

  return (
    <>
      <FormSection title="Definition & Key Concepts" icon="🧠">
        <div className="space-y-5">
          <FieldTextarea
            name="content_definition"
            label="Definition"
            required
            rows={3}
            placeholder="Define this psychological concept clearly..."
            defaultValue={d.definition ?? ""}
          />
          <FieldTextarea
            name="content_keyConcepts"
            label="Key Concepts"
            required
            rows={4}
            placeholder="Core ideas, theories, or principles..."
            defaultValue={d.keyConcepts ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Characteristics & Applications" icon="🔬">
        <div className="space-y-5">
          <FieldTextarea
            name="content_characteristics"
            label="Characteristics"
            required
            rows={4}
            placeholder="Key characteristics or features..."
            defaultValue={d.characteristics ?? ""}
          />
          <FieldTextarea
            name="content_applications"
            label="Applications (Optional)"
            rows={3}
            placeholder="Real-world applications in daily life or therapy..."
            defaultValue={d.applications ?? ""}
          />
          <FieldTextarea
            name="content_examples"
            label="Examples (Optional)"
            rows={3}
            placeholder="Illustrative examples to help students understand..."
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
            placeholder="A fascinating psychological fact or study..."
            defaultValue={d.interestingFact ?? ""}
          />
          <FieldTextarea
            name="content_examTrick"
            label="Exam Trick"
            required
            rows={2}
            placeholder="Memory trick or key exam point..."
            defaultValue={d.examTrick ?? ""}
          />
        </div>
      </FormSection>
    </>
  );
}
