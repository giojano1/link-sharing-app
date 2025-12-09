"use client";

import { Link as LinkIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Links",
      href: "/dashboard",
      icon: LinkIcon,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
  ];

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Button key={link.name} variant={isActive ? "secondary" : "ghost"}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <link.icon className="size-4" />
                <span className="max-600:hidden">{link.name}</span>
              </Link>
            </Button>
          );
        })}
      </ul>
    </nav>
  );
}
