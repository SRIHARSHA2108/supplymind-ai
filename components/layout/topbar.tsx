import { Bell, Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#070B16]/80 px-6 backdrop-blur-xl">
      <div className="relative hidden w-full max-w-md md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <Input
          placeholder="Search risks, suppliers, incidents..."
          className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300 md:flex">
          <ShieldCheck className="h-4 w-4" />
          System Healthy
        </div>

        <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:text-white">
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