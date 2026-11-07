import { Bell, Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNav } from "./sidebar";

export default function Topbar() {
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
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-700 sm:flex">
          <ShieldCheck className="h-4 w-4" />
          System Healthy
        </div>

        <button className="rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-600 transition hover:text-slate-900">
          <Bell className="h-5 w-5" />
        </button>

        <Avatar>
          <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-violet-600 text-white">
            SH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
