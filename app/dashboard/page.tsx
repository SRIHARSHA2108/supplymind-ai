"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Boxes,
  Factory,
  PackageCheck,
  Truck,
  Users,
  WandSparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { day: "Mon", output: 68 },
  { day: "Tue", output: 72 },
  { day: "Wed", output: 76 },
  { day: "Thu", output: 71 },
  { day: "Fri", output: 84 },
  { day: "Sat", output: 88 },
  { day: "Sun", output: 92 },
];

const riskItems = [
  { label: "Supplier Delay Risk", value: "72%", level: "High" },
  { label: "Raw Material Shortage", value: "46%", level: "Medium" },
  { label: "Production Bottleneck", value: "38%", level: "Medium" },
  { label: "Delivery Risk", value: "12%", level: "Low" },
];

const chain = [
  { label: "Suppliers", value: "12 Active", icon: Boxes },
  { label: "Inventory", value: "94% Healthy", icon: PackageCheck },
  { label: "Production", value: "Running", icon: Factory },
  { label: "Logistics", value: "On Time", icon: Truck },
  { label: "Customers", value: "96% Satisfied", icon: Users },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-cyan-400/20 bg-cyan-400/10 text-cyan-700">
            Live Intelligence
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Command Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Real-time production and supply-chain intelligence powered by
            persistent AI memory.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
          {chain.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="relative overflow-hidden border-slate-200 bg-white"
              >
                <CardContent className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">{item.label}</p>
                  <p className="mt-1 font-medium text-slate-900">{item.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Production Output</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="fillOutput" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#22d3ee"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#22d3ee"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />

                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 12,
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="output"
                      stroke="#22d3ee"
                      fill="url(#fillOutput)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Supply Chain Resilience</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex h-[320px] flex-col items-center justify-center">
                <div className="flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-cyan-400/20 shadow-[0_0_50px_rgba(34,211,238,0.12)]">
                  <div className="text-center">
                    <div className="text-5xl font-semibold">92</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Resilience Score
                    </div>
                  </div>
                </div>

                <Badge className="mt-5 bg-emerald-400/10 text-emerald-700">
                  Strong
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>AI Risk Overview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {riskItems.map((risk) => (
                <div
                  key={risk.label}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-700" />

                    <div>
                      <p className="text-sm text-slate-900">{risk.label}</p>
                      <p className="text-xs text-slate-500">{risk.level}</p>
                    </div>
                  </div>

                  <span className="text-lg font-semibold text-slate-900">
                    {risk.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-400/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <WandSparkles className="h-5 w-5 text-violet-700" />
                <CardTitle>AI Recommendation</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-slate-700">
                Shift 30% of Component X orders from Supplier A to Supplier B.
                This may reduce the estimated delivery-delay exposure by 72%
                while maintaining production continuity.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">Confidence</p>
                  <p className="mt-1 font-semibold">91%</p>
                </div>

                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">Recovery</p>
                  <p className="mt-1 font-semibold">2 Days</p>
                </div>

                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">Risk</p>
                  <p className="mt-1 font-semibold text-emerald-700">Low</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="bg-cyan-400 text-black hover:bg-cyan-300">
                  Apply Plan
                </Button>

                <Button
                  variant="outline"
                  className="border-slate-200 bg-slate-100 text-slate-900"
                >
                  View Impact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}