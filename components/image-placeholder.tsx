import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ratioClasses = {
  photo: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
} as const;

type ImagePlaceholderProps = {
  label: string;
  ratio?: keyof typeof ratioClasses;
  className?: string;
};

export function ImagePlaceholder({
  label,
  ratio = "photo",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-md border border-line bg-surface",
        ratioClasses[ratio],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="relative flex max-w-[85%] flex-col items-center gap-2.5 px-6 text-center"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-line bg-background text-subtle">
          <ImageIcon className="size-5" strokeWidth={1.75} />
        </span>
        <span className="text-xs font-medium leading-relaxed text-muted sm:text-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
