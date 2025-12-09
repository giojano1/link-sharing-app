import Link from "next/link";
import React from "react";

export default function AuthPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-6 p-10  bg-white rounded-[12px] shadow-sm">
      {children}
    </section>
  );
}

AuthPageWrapper.Header = function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1 text-left">
      <h2 className="text-2xl font-bold text-dark-grey">{title}</h2>
      <p className="text-grey text-sm  text-balance">{subtitle}</p>
    </div>
  );
};
AuthPageWrapper.Footer = function Footer({
  text,
  linkText,
  linkHref,
}: {
  text: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <div className="text-center text-sm ">
      <span className="text-grey">{text} </span>
      <Link href={linkHref} className="whitespace-nowrap underline">
        {linkText}
      </Link>
    </div>
  );
};
