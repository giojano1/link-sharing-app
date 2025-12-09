"use client";
import { ReactNode } from "react";

interface FormRowProps {
  label: string;
  input: ReactNode; // Input component goes here
}

export default function FormRow({ label, input }: FormRowProps) {
  return (
    <div className="flex items-center justify-between ">
      <span className="block min-w-[100px]">{label}</span>

      <div className="flex-1 ">{input}</div>
    </div>
  );
}
