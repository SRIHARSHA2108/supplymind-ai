"use client";

import { useEffect, useState } from "react";
import { Bell, Search, ShieldCheck, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNav } from "./sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";

export default function Topbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Supplier A delay watch", text: "Possible 6-day delay for Component X. Review the Supply Chain Network.", type: "warning" },
    { id: 2, title: "Hindsight memory updated", text: "A new recovery outcome was saved to Memory Atlas.", type: "success" },
  ]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return;
    try {
      const supabase = createSupabaseClient();
      const channel = supabase.channel("topbar-notifications").on("postgres_changes", { event: "UPDATE", schema: "public", table: "factory_state" }, (payload) => {
        const delay = Number((payload.new as Record<string, number>).supplier_delay ?? 6);
        if (delay >= 5) setNotifications((current) => [{ id: Date.now(), title: "Supplier delay risk updated", text: `Supplier A may be delayed by ${delay} days. Component X coverage needs attention.`, type: "warning" }, ...current.filter((item) => item.title !== "Supplier delay risk updated")]);
      }).subscribe();
      return () => { void supabase.removeChannel(channel); };
    } catch { return; }
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:px-6 lg:h-20">
      <div className="flex items-center gap-3">
        <MobileNav />

        <div className="relative hidden w-full max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <Input
            placeholder="Search risks, suppliers, incidents..."
            className="border-slate-200 bg-slate-100 pl-10 text-slate-900 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 sm:flex"><div className="rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 p-2 text-white shadow-lg shadow-violet-500/20"><Sparkles className="h-4 w-4" /></div><span className="hidden text-sm font-semibold tracking-tight text-slate-900 lg:inline">SupplyMind</span></div>
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-700 sm:flex">
          <ShieldCheck className="h-4 w-4" />
          System Healthy
        </div>

        <ThemeToggle />

        <div className="relative">
          <button aria-label="Open notifications" onClick={() => setNotificationsOpen((open) => !open)} className="relative rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-600 transition hover:border-cyan-300 hover:text-slate-900">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{notifications.length}</span>}
          </button>
          {notificationsOpen && <div className="absolute right-0 top-12 z-50 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl"><div className="flex items-center justify-between px-2 py-1"><p className="font-semibold text-slate-900">Notifications</p><button onClick={() => setNotifications([])} className="text-xs text-cyan-700 hover:underline">Dismiss all</button></div>{notifications.length === 0 ? <p className="px-2 py-6 text-center text-sm text-slate-500">You’re all caught up.</p> : <div className="mt-2 space-y-2">{notifications.map((notification) => <div key={notification.id} className="flex gap-3 rounded-xl bg-slate-50 p-3"><div className={`mt-0.5 rounded-lg p-2 ${notification.type === "warning" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{notification.type === "warning" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}</div><div><p className="text-sm font-medium text-slate-900">{notification.title}</p><p className="mt-1 text-xs leading-5 text-slate-600">{notification.text}</p></div></div>)}</div>}</div>}
        </div>

        <Avatar>
          <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-violet-600 text-white">
            SH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
