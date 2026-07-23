"use client";

import React from "react";
import { FormSection, FieldTextarea } from "./shared";
import type { SociologyContent } from "@/lib/zod/quickRevisionSchema";

interface SociologyFormProps {
  defaultValues?: Partial<SociologyContent>;
}

export default function SociologyForm({ defaultValues }: SociologyFormProps) {
  const d = defaultValues ?? {};

  return (
    <>
      <FormSection title="Meaning & Definition" icon="🏛️">
        <div className="space-y-5">
          <FieldTextarea
            name="content_meaning"
            label="Meaning"
            required
            rows={3}
            placeholder="What does this term mean in sociology?"
            defaultValue={d.meaning ?? ""}
          />
          <FieldTextarea
            name="content_definition"
            label="Definition"
            required
            rows={3}
            placeholder="Formal definition of this sociological concept..."
            defaultValue={d.definition ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Characteristics & Importance" icon="🔍">
        <div className="space-y-5">
          <FieldTextarea
            name="content_characteristics"
            label="Characteristics"
            required
            rows={4}
            placeholder="Key characteristics of this concept..."
            defaultValue={d.characteristics ?? ""}
          />
          <FieldTextarea
            name="content_importance"
            label="Importance"
            required
            rows={3}
            placeholder="Why is this sociological concept important?"
            defaultValue={d.importance ?? ""}
          />
          <FieldTextarea
            name="content_examples"
            label="Examples (Optional)"
            rows={3}
            placeholder="Real-life sociological examples..."
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
            placeholder="A compelling sociological fact or observation..."
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
