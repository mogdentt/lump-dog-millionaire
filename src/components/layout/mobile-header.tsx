"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Milestone,
  Clock,
  FileText,
  Receipt,
  Settings,
  HardHat,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Milestones", href: "/milestones", icon: Milestone },
  { name: "Time Entries", href: "/time-entries", icon: Clock },
  { name: "Change Orders", href: "/change-orders", icon: FileText },
  { name: "Invoicing", href: "/invoicing", icon: Receipt },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <HardHat className="h-5 w-5 text-blue-600" />
          <span className="font-bold">LumpSum Pro</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-b border-zinc-200 bg-white p-3 space-y-1 dark:border-zinc-800 dark:bg-zinc-950">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
