"use client";

interface ImprintLogoProps {
  size?: "sm" | "md";
}

export default function ImprintLogo({ size = "sm" }: ImprintLogoProps) {
  const dimensions = size === "md" ? "h-9 w-9" : "h-8 w-8";
  const fontSize = size === "md" ? "text-lg" : "text-base";

  return (
    <div
      className={`${dimensions} shrink-0 flex items-center justify-center rounded-xl bg-imprint shadow-sm`}
    >
      <span
        className={`${fontSize} font-semibold text-white`}
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        I
      </span>
    </div>
  );
}
