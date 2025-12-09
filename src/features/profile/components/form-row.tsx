"use client";
import { ReactNode } from "react";

interface FormRowProps {
  label: string;
  input: ReactNode; // Input component goes here
}

export default function FormRow({ label, input }: FormRowProps) {
  return (
    <div className="flex items-center justify-between max-500:flex-col max-500:items-start max-500:gap-1 w-full">
      <span className="block min-w-[100px]">{label}</span>

      <div className="flex-1 max-500:w-full">{input}</div>
    </div>
  );
}
