"use client";

import { useEffect, useRef } from "react";

// Declare global types to avoid TS errors
declare global {
  interface JQuery {
    summernote(options?: any): any;
    summernote(command: string, param?: any): any;
  }
}

/**
 * Inject a stylesheet link tag with a CSS @layer wrapper so Bootstrap's
 * global reset has lower specificity than Tailwind utilities.
 */
function injectStylesheet(id: string, href: string) {
  if (document.getElementById(id)) return; // already injected

  // No bootstrap needed for summernote-lite

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export default function SummernoteEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Inject Summernote CSS (scoped to .note-editor by the library itself)
    injectStylesheet(
      "summernote-css",
      "https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css"
    );

    const jq = require("jquery");
    const $ = jq.default || jq;

    // Summernote uses $.now() which was removed in jQuery 3.3+
    if (!$.now) {
      $.now = function () {
        return Date.now();
      };
    }

    // Add jQuery to window so summernote can find it
    (window as any).$ = $;
    (window as any).jQuery = $;

    require("summernote/dist/summernote-lite.js");

    const editor = $(editorRef.current!);

    editor.summernote({
      height: 400,
      placeholder: "Write your comprehensive guide here...",
      callbacks: {
        onChange: function (contents: string) {
          isInternalChange.current = true;
          onChange(contents);
        },
      },
    });

    editor.summernote("code", value || "");

    return () => {
      editor.summernote("destroy");
      
      // Cleanup injected stylesheets to prevent global CSS leaking to other Next.js pages
      const summernoteLink = document.getElementById("summernote-css");
      if (summernoteLink) summernoteLink.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !editorRef.current) return;

    // Skip updating Summernote if the change originated from the editor itself
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    const jq = require("jquery");
    const $ = jq.default || jq;
    const editor = $(editorRef.current);

    // Update only if initialized and value changed
    if (editor.next().hasClass("note-editor")) {
      const currentContent = editor.summernote("code");
      if (value !== currentContent) {
        editor.summernote("code", value || "");
      }
    }
  }, [value]);

  return <textarea ref={editorRef}></textarea>;
}
