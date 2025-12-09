import { Eye, GalleryVerticalEnd } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Navbar from "./navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-[78px] max-600:h-[72px] bg-white rounded-[12px] max-600:rounded-none px-6 items-center justify-between flex">
      <div className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <span className="max-500:hidden">Devlinks</span>
      </div>
      {/* navigation */}
      <div>
        <Navbar />
      </div>
      {/* preview */}
      <Button>
        <Link href="/preview">
          <span className="max-600:hidden">Preview</span>
          <Eye className="hidden max-600:block" />
        </Link>
      </Button>
    </header>
  );
}
