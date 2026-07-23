"use client";

import React from "react";
import { FormSection, FieldTextarea } from "./shared";
import type { EconomicsContent } from "@/lib/zod/quickRevisionSchema";

interface EconomicsFormProps {
  defaultValues?: Partial<EconomicsContent>;
}

export default function EconomicsForm({ defaultValues }: EconomicsFormProps) {
  const d = defaultValues ?? {};

  return (
    <>
      <FormSection title="Definition & Formula" icon="📊">
        <div className="space-y-5">
          <FieldTextarea
            name="content_definition"
            label="Definition"
            required
            rows={3}
            placeholder="Define this economic concept clearly..."
            defaultValue={d.definition ?? ""}
          />
          <FieldTextarea
            name="content_formula"
            label="Formula (Optional)"
            rows={2}
            placeholder="e.g. GDP = C + I + G + (X - M)"
            defaultValue={d.formula ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Types & Characteristics" icon="🔍">
        <div className="space-y-5">
          <FieldTextarea
            name="content_types"
            label="Types (Optional)"
            rows={3}
            placeholder="List all types or categories..."
            defaultValue={d.types ?? ""}
          />
          <FieldTextarea
            name="content_characteristics"
            label="Characteristics"
            required
            rows={4}
            placeholder="Key features or characteristics..."
            defaultValue={d.characteristics ?? ""}
          />
        </div>
      </FormSection>

      <FormSection title="Advantages & Disadvantages" icon="⚖️">
        <div className="space-y-5">
          <FieldTextarea
            name="content_advantages"
            label="Advantages (Optional)"
            rows={3}
            placeholder="Benefits or positive aspects..."
            defaultValue={d.advantages ?? ""}
          />
          <FieldTextarea
            name="content_disadvantages"
            label="Disadvantages (Optional)"
            rows={3}
            placeholder="Drawbacks or limitations..."
            defaultValue={d.disadvantages ?? ""}
          />
          <FieldTextarea
            name="content_examples"
            label="Examples"
            required
            rows={3}
            placeholder="Real-world economic examples..."
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
            placeholder="A surprising or memorable economic fact..."
            defaultValue={d.interestingFact ?? ""}
          />
          <FieldTextarea
            name="content_examTrick"
            label="Exam Trick"
            required
            rows={2}
            placeholder="Memory trick or key point for exams..."
            defaultValue={d.examTrick ?? ""}
          />
        </div>
      </FormSection>
    </>
  );
}
