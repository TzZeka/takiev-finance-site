"use client";

import { useState } from "react";
import { set } from "sanity";
import { useFormValue } from "sanity";
import type { ObjectInputProps } from "sanity";

export function GenerateImageInput(props: ObjectInputProps) {
  const [extraPrompt, setExtraPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const title = useFormValue(["title"]) as string | undefined;

  const handleGenerate = async () => {
    if (!title?.trim()) {
      setError("Добавете заглавие на статията преди да генерирате снимка.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setPreviewUrl(null);

    try {
      const base = process.env.SANITY_STUDIO_APP_URL ?? "http://localhost:3000";
      const res = await fetch(`${base}/api/generate-preview-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, extraPrompt: extraPrompt.trim() || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const { assetId, previewUrl: url } = await res.json();

      setPreviewUrl(url);

      props.onChange(
        set({
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
          alt: `${title} — Takiev Finance`,
        })
      );
    } catch (err) {
      setError(`Грешка: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Default Sanity image input */}
      {props.renderDefault(props)}

      {/* AI Generator section */}
      <div style={{
        borderTop: "1px solid #e2e8f0",
        paddingTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a", letterSpacing: "0.02em" }}>
          ✨ AI Генератор на банер
        </p>

        {!title?.trim() && (
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
            Добавете заглавие за да активирате генератора.
          </p>
        )}

        {/* Extra prompt */}
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
            Допълнителни инструкции (по желание)
          </label>
          <textarea
            value={extraPrompt}
            onChange={(e) => setExtraPrompt(e.target.value)}
            placeholder="Пример: фокус върху калкулатор и документи, топли тонове..."
            rows={2}
            style={{
              width: "100%",
              padding: "8px 10px",
              fontSize: 13,
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              resize: "vertical",
              fontFamily: "inherit",
              color: "#0f172a",
              background: "#f8fafc",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !title?.trim()}
          style={{
            alignSelf: "flex-start",
            padding: "9px 20px",
            background: isGenerating || !title?.trim() ? "#94a3b8" : "#19BFB7",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: isGenerating || !title?.trim() ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.02em",
            transition: "background 0.2s",
          }}
        >
          {isGenerating ? "⏳ Генерира... (~15 сек)" : "✨ Генерирай снимка"}
        </button>

        {/* Error */}
        {error && (
          <p style={{ margin: 0, fontSize: 12, color: "#ef4444", background: "#fef2f2", padding: "8px 12px", borderRadius: 6 }}>
            {error}
          </p>
        )}

        {/* Preview */}
        {previewUrl && (
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, color: "#22c55e" }}>
              ✅ Генерирано успешно — снимката е запазена в полето по-горе
            </p>
            <img
              src={previewUrl}
              alt="Предварителен преглед"
              style={{ width: "100%", borderRadius: 8, border: "1px solid #e2e8f0", display: "block" }}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                marginTop: 8,
                padding: "7px 16px",
                background: "transparent",
                color: "#19BFB7",
                border: "1px solid #19BFB7",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              🔄 Генерирай нова
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
