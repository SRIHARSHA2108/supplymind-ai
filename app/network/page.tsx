"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, Factory, Truck, Package, AlertTriangle, CheckCircle2 } from "lucide-react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";

const nodes = [
  { id: "supplier-a", label: "Supplier A", x: 18, y: 26, status: "Risk", detail: "6-day delay exposure · Component X" },
  { id: "supplier-b", label: "Supplier B", x: 18, y: 74, status: "Healthy", detail: "74% transport capacity available" },
  { id: "factory", label: "Main Factory", x: 50, y: 50, status: "Operating", detail: "88% production availability" },
  { id: "hub-1", label: "Hub 1", x: 82, y: 26, status: "Healthy", detail: "2-day recovery route" },
  { id: "customers", label: "Customers", x: 82, y: 74, status: "Monitored", detail: "Demand surge: 28%" },
];

export default function NetworkPage() {
  const [selected, setSelected] = useState(nodes[2]);
  const [live, setLive] = useState({ supplierDelay: 6, transport: 74, production: 88, demand: 28, connected: false });
  useEffect(() => {
    const demo = () => setLive((current) => ({ ...current, supplierDelay: Math.max(2, Math.min(10, current.supplierDelay + (Math.random() > 0.5 ? 1 : -1))), transport: Math.max(58, Math.min(88, current.transport + (Math.random() > 0.5 ? 1 : -1))), production: Math.max(76, Math.min(96, current.production + (Math.random() > 0.5 ? 1 : -1))) }));
    const interval = window.setInterval(demo, 5000);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return () => window.clearInterval(interval);
    try {
      const supabase = createSupabaseClient();
      const channel = supabase.channel("network-topology").on("postgres_changes", { event: "UPDATE", schema: "public", table: "factory_state" }, (payload) => { const state = payload.new as Record<string, number>; setLive({ supplierDelay: Number(state.supplier_delay ?? 6), transport: Number(state.transport_capacity ?? 74), production: Number(state.production_availability ?? 88), demand: Number(state.demand_surge ?? 28), connected: true }); }).subscribe((status) => { if (status === "SUBSCRIBED") setLive((current) => ({ ...current, connected: true })); });
      return () => { window.clearInterval(interval); void supabase.removeChannel(channel); };
    } catch { return () => window.clearInterval(interval); }
  }, []);
  const liveNodes = useMemo(() => nodes.map((node) => ({ ...node, status: node.id === "supplier-a" ? live.supplierDelay > 5 ? "Risk" : "Watch" : node.id === "factory" ? `${live.production}% available` : node.id === "supplier-b" ? `${live.transport}% capacity` : node.status, detail: node.id === "supplier-a" ? `${live.supplierDelay}-day delay exposure · Component X` : node.id === "factory" ? `${live.production}% production availability` : node.id === "customers" ? `Demand surge: ${live.demand}%` : node.detail })), [live]);
  const selectedLive = liveNodes.find((node) => node.id === selected.id) ?? selected;
  return <DashboardShell><div className="space-y-8"><div><Badge className="mb-3 border-cyan-400/20 bg-cyan-400/10 text-cyan-700">Supply chain network intelligence</Badge><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Supply Chain Network</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">A live star-topology view of suppliers, the factory, logistics, and customer demand. Select a node to inspect its current operational signal.</p></div>
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]"><Card className="overflow-hidden border-slate-200 bg-white"><CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><Network className="h-5 w-5 text-cyan-700" />Supply chain topology</CardTitle><Badge className={live.connected ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}><span className="mr-1 inline-block h-2 w-2 rounded-full bg-current" />{live.connected ? "Live feed connected" : "Live demo stream"}</Badge></div></CardHeader><CardContent><div className="relative min-h-[440px] rounded-2xl bg-slate-50 p-3"><svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><line x1="50" y1="50" x2="18" y2="26" stroke="#cbd5e1" strokeWidth="0.6" /><line x1="50" y1="50" x2="18" y2="74" stroke="#cbd5e1" strokeWidth="0.6" /><line x1="50" y1="50" x2="82" y2="26" stroke="#cbd5e1" strokeWidth="0.6" /><line x1="50" y1="50" x2="82" y2="74" stroke="#cbd5e1" strokeWidth="0.6" /></svg>{liveNodes.map((node) => <button key={node.id} onClick={() => setSelected(node)} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-3 text-left shadow-sm transition hover:-translate-y-[calc(50%+3px)] ${node.id === selected.id ? "border-cyan-400 bg-cyan-50 ring-2 ring-cyan-400/20" : "border-slate-200 bg-white"}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}><div className="flex items-center gap-2"><span className={`rounded-lg p-2 ${node.status === "Risk" ? "bg-red-100 text-red-700" : node.id === "factory" ? "bg-violet-100 text-violet-700" : "bg-emerald-100 text-emerald-700"}`}>{node.id.includes("supplier") ? <Package className="h-4 w-4" /> : node.id === "factory" ? <Factory className="h-4 w-4" /> : node.id === "hub-1" ? <Truck className="h-4 w-4" /> : <Network className="h-4 w-4" />}</span><span className="whitespace-nowrap text-xs font-semibold text-slate-900">{node.label}</span></div><p className="mt-2 text-[10px] text-slate-500">{node.status}</p></button>)}</div></CardContent></Card>
      <Card className="border-slate-200 bg-white"><CardHeader><CardTitle>Node intelligence</CardTitle></CardHeader><CardContent><div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2">{selectedLive.status === "Risk" ? <AlertTriangle className="h-5 w-5 text-red-600" /> : <CheckCircle2 className="h-5 w-5 text-emerald-600" />}<p className="font-semibold text-slate-900">{selectedLive.label}</p></div><p className="mt-3 text-sm leading-6 text-slate-600">{selectedLive.detail}</p><p className="mt-5 text-xs uppercase tracking-wider text-slate-500">Network role</p><p className="mt-1 text-sm text-slate-900">{selectedLive.id === "factory" ? "Central production node" : "Connected edge node"}</p></div><div className="mt-4 rounded-xl border border-violet-200 bg-violet-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-violet-700">Recommended action</p><p className="mt-2 text-sm leading-6 text-slate-700">Keep Supplier B as the fallback route while Supplier A remains under watch.</p></div></CardContent></Card></div></div></DashboardShell>;
}
