import type React from "react";

type BtnType = {
  text?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ text, children, ...props }: BtnType) {
  return (
    <button
      {...props}
      className="relative bg-amber-100 text-amber-900 rounded-full py-1 px-2 font-bold text-xs hover:bg-amber-200 transition-colors active:scale-105"
    >
      {text || children}
    </button>
  );
}
