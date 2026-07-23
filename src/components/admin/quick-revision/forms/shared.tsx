/**
 * Shared form primitives reused across all subject form components.
 * Keep them here so styles are consistent and only need to change in one place.
 */

// ─── CSS class strings ────────────────────────────────────────────────────────

export const inputCls =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 placeholder-gray-400";

export const selectCls =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 appearance-none";

export const textareaCls =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 placeholder-gray-400 resize-none";

// ─── Shared components ────────────────────────────────────────────────────────

import React from "react";

export function FormSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
    </label>
  );
}

export function FieldTextarea({
  name,
  label,
  required,
  placeholder,
  rows,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && " *"}
      </Label>
      <textarea
        name={name}
        required={required}
        rows={rows ?? 3}
        className={textareaCls}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
}

export function FieldInput({
  name,
  label,
  required,
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && " *"}
      </Label>
      <input
        name={name}
        required={required}
        className={inputCls}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
}
