import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[470px] flex flex-col items-center gap-10 ">
        <Image
          src="/assets/logo-devlinks-large.svg"
          alt="Logo"
          width={150}
          height={37}
        />
        {children}
      </div>
    </div>
  );
}
