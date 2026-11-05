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
  LineChart,
  Leaf,
  Sparkles,
} from "lucide-react";

const navItems = [
  { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Risk Intelligence", href: "/risk", icon: ShieldAlert },
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
    <aside className="hidden h-screen w-72 flex-col border-r border-white/10 bg-[#070B16] px-5 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-lg shadow-cyan-500/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">SupplyMind AI</h1>
          <p className="text-xs text-slate-400">Intelligence Cockpit</p>
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
                  ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
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
          <Sparkles className="h-4 w-4 text-violet-300" />
          <p className="text-sm font-medium text-white">AI Copilot</p>
        </div>

        <p className="text-xs leading-5 text-slate-400">
          Ask, analyze, or simulate anything about your supply chain.
        </p>
      </div>
    </aside>
  );
}