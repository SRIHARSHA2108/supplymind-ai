"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Building2,
  Factory,
  Truck,
  Users,
  Warehouse,
  ShieldAlert,
} from "lucide-react";

const risks = [
  {
    title: "Supplier A Delivery Delay",
    score: 87,
    severity: "Critical",
    impact: "2.4 days production delay",
    financial: "₹18.6 lakh exposure",
    confidence: "94%",
    action: "Shift 30% of Component X orders to Supplier B",
  },
  {
    title: "Component X Inventory Shortage",
    score: 72,
    severity: "High",
    impact: "Production Line 2 at risk",
    financial: "₹9.8 lakh exposure",
    confidence: "89%",
    action: "Increase buffer stock and expedite incoming shipment",
  },
  {
    title: "Production Line 2 Bottleneck",
    score: 58,
    severity: "Medium",
    impact: "11% capacity reduction",
    financial: "₹5.2 lakh exposure",
    confidence: "83%",
    action: "Reschedule maintenance and rebalance workload",
  },
  {
    title: "Logistics Hub Congestion",
    score: 31,
    severity: "Low",
    impact: "Minor delivery slowdown",
    financial: "₹1.9 lakh exposure",
    confidence: "76%",
    action: "Reroute priority orders through Hub 2",
  },
];

const nodes = [
  { name: "Supplier A", icon: Building2, status: "critical" },
  { name: "Supplier B", icon: Building2, status: "healthy" },
  { name: "Warehouse", icon: Warehouse, status: "warning" },
  { name: "Factory", icon: Factory, status: "warning" },
  { name: "Distribution", icon: Truck, status: "healthy" },
  { name: "Customers", icon: Users, status: "healthy" },
];

function getSeverityClasses(severity: string) {
  if (severity === "Critical") {
    return "bg-red-500/10 text-red-700 border-red-500/20";
  }

  if (severity === "High") {
    return "bg-orange-500/10 text-orange-700 border-orange-500/20";
  }

  if (severity === "Medium") {
    return "bg-amber-500/10 text-amber-700 border-amber-500/20";
  }

  return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
}

function getNodeClasses(status: string) {
  if (status === "critical") {
    return "border-red-500/40 bg-red-500/10 text-red-700 shadow-[0_0_30px_rgba(239,68,68,0.15)]";
  }

  if (status === "warning") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-700";
  }

  return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
}

export default function RiskPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-red-400/20 bg-red-400/10 text-red-700">
            Predictive Risk Engine
          </Badge>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Risk Intelligence
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Predict, detect, and prioritize supply-chain disruptions before
            they affect production, logistics, or customers.
          </p>
        </div>

        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-cyan-700" />
              <CardTitle>Live Supply Chain Risk Map</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {nodes.map((node, index) => {
                const Icon = node.icon;

                return (
                  <div key={node.name} className="relative">
                    <div
                      className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border p-4 text-center ${getNodeClasses(
                        node.status
                      )}`}
                    >
                      <div className="mb-3 rounded-xl bg-slate-50 p-3">
                        <Icon className="h-6 w-6" />
                      </div>

                      <p className="text-sm font-medium text-slate-900">
                        {node.name}
                      </p>

                      <p className="mt-1 text-xs capitalize opacity-80">
                        {node.status}
                      </p>
                    </div>

                    {index < nodes.length - 1 && (
                      <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-cyan-400/30 xl:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card className="border-red-500/20 bg-red-500/5">
            <CardContent className="p-4 sm:p-5">
              <p className="text-sm text-slate-600">Critical Risks</p>
              <p className="mt-2 text-3xl font-semibold text-red-700">1</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-4 sm:p-5">
              <p className="text-sm text-slate-600">High Risks</p>
              <p className="mt-2 text-3xl font-semibold text-orange-700">1</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4 sm:p-5">
              <p className="text-sm text-slate-600">Medium Risks</p>
              <p className="mt-2 text-3xl font-semibold text-amber-700">1</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-4 sm:p-5">
              <p className="text-sm text-slate-600">Low Risks</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-700">1</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {risks.map((risk) => (
            <Card
              key={risk.title}
              className="border-slate-200 bg-white"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_220px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-700" />

                      <h2 className="text-lg font-semibold text-slate-900">
                        {risk.title}
                      </h2>

                      <Badge
                        className={`border ${getSeverityClasses(risk.severity)}`}
                      >
                        {risk.severity}
                      </Badge>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          Business Impact
                        </p>
                        <p className="mt-2 text-sm text-slate-900">
                          {risk.impact}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          Financial Exposure
                        </p>
                        <p className="mt-2 text-sm text-slate-900">
                          {risk.financial}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          AI Confidence
                        </p>
                        <p className="mt-2 text-sm text-slate-900">
                          {risk.confidence}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-cyan-700">
                        Recommended Action
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {risk.action}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Risk Score
                      </p>

                      <p className="mt-2 text-5xl font-semibold">
                        {risk.score}
                      </p>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                          style={{ width: `${risk.score}%` }}
                        />
                      </div>
                    </div>

                    <Button className="mt-6 bg-cyan-400 text-black hover:bg-cyan-300">
                      Investigate Risk
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
