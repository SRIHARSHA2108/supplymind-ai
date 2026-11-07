"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  BrainCircuit,
  FlaskConical,
  MessageSquareText,
  Workflow,
  Network,
  LineChart,
  Leaf,
  Sparkles,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const navItems = [
  { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Risk Intelligence", href: "/risk", icon: ShieldAlert },
  { name: "Network Topology", href: "/network", icon: Network },
  { name: "Memory Atlas", href: "/memory", icon: BrainCircuit },
  { name: "Crisis Studio", href: "/crisis", icon: FlaskConical },
  { name: "Customer Signals", href: "/customer-signals", icon: MessageSquareText },
  { name: "Decision Hub", href: "/decisions", icon: Workflow },
  { name: "Smart Forecast", href: "/forecast", icon: LineChart },
  { name: "Sustainability", href: "/sustainability", icon: Leaf },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-slate-200/80 bg-white/90 px-5 py-6 shadow-[8px_0_32px_-28px_rgba(15,23,42,0.5)] backdrop-blur-xl lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-lg shadow-cyan-500/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-slate-900">SupplyMind AI</h1>
          <p className="text-xs text-slate-600">Intelligence Cockpit</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-cyan-400/10 text-cyan-700 ring-1 ring-cyan-400/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-700" />
          <p className="text-sm font-medium text-slate-900">AI Copilot</p>
        </div>

        <p className="text-xs leading-5 text-slate-600">
          Ask, analyze, or simulate anything about your supply chain.
        </p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Open navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 lg:hidden"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[min(20rem,calc(100vw-2rem))] border-slate-200 bg-white p-0">
        <SheetHeader className="border-b border-slate-200 pr-14">
          <SheetTitle className="flex items-center gap-3 text-left">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            SupplyMind AI
          </SheetTitle>
          <SheetDescription className="text-left">
            Intelligence Cockpit
          </SheetDescription>
        </SheetHeader>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <SheetTrigger
                key={item.href}
                render={
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-cyan-400/10 text-cyan-700 ring-1 ring-cyan-400/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  />
                }
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </SheetTrigger>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
