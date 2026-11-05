"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  PackageSearch,
  CalendarClock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const demandData = [
  { day: "Day 1", actual: 62, forecast: 64 },
  { day: "Day 2", actual: 66, forecast: 68 },
  { day: "Day 3", actual: 70, forecast: 72 },
  { day: "Day 4", actual: 73, forecast: 77 },
  { day: "Day 5", actual: 79, forecast: 82 },
  { day: "Day 6", actual: 84, forecast: 88 },
  { day: "Day 7", actual: 90, forecast: 94 },
  { day: "Day 8", actual: 0, forecast: 98 },
  { day: "Day 9", actual: 0, forecast: 102 },
  { day: "Day 10", actual: 0, forecast: 107 },
  { day: "Day 11", actual: 0, forecast: 112 },
  { day: "Day 12", actual: 0, forecast: 117 },
  { day: "Day 13", actual: 0, forecast: 121 },
  { day: "Day 14", actual: 0, forecast: 126 },
];

const materials = [
  {
    name: "Component X",
    current: "1,240 units",
    consumption: "285/day",
    safety: "400 units",
    stockout: "4 days",
    status: "Critical",
  },
  {
    name: "Component Y",
    current: "3,820 units",
    consumption: "190/day",
    safety: "950 units",
    stockout: "15 days",
    status: "Healthy",
  },
  {
    name: "Component Z",
    current: "2,150 units",
    consumption: "140/day",
    safety: "720 units",
    stockout: "10 days",
    status: "Watch",
  },
];

export default function ForecastPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            Predictive Demand Intelligence
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Smart Forecast
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Forecast future demand, detect inventory pressure early, and
            generate proactive procurement actions before stockouts occur.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard title="Forecast Accuracy" value="93%" />
          <MetricCard title="Demand Growth" value="+23%" />
          <MetricCard title="At-Risk Materials" value="2" />
          <MetricCard title="Forecast Horizon" value="14 Days" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-white/10 bg-[#0B1225]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-300" />
                <CardTitle>Demand Forecast — Component X</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />

                    <Tooltip
                      contentStyle={{
                        background: "#0B1225",
                        border: "1px solid #1f2937",
                        borderRadius: 12,
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#22d3ee"
                      strokeWidth={3}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      strokeDasharray="6 6"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-400/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-300" />
                <CardTitle>AI Forecast Insight</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-slate-300">
                Component X demand is projected to increase by approximately
                23% over the next 14 days, driven by higher customer orders and
                lower-than-normal downstream inventory.
              </p>

              <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/5 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-300" />
                  <p className="text-xs uppercase tracking-wider text-red-300">
                    Stockout Warning
                  </p>
                </div>

                <p className="mt-2 text-sm text-slate-300">
                  Component X may fall below safety stock within 4 days.
                </p>
              </div>

              <Button className="mt-6 w-full bg-cyan-400 text-black hover:bg-cyan-300">
                Generate Procurement Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <PackageSearch className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold">
              Inventory Forecast
            </h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {materials.map((item) => (
              <Card
                key={item.name}
                className="border-white/10 bg-[#0B1225]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Material
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                    </div>

                    <Badge
                      className={
                        item.status === "Critical"
                          ? "bg-red-500/10 text-red-300"
                          : item.status === "Watch"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-emerald-500/10 text-emerald-300"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="mt-6 space-y-3">
                    <InfoRow
                      label="Current Inventory"
                      value={item.current}
                    />

                    <InfoRow
                      label="Expected Consumption"
                      value={item.consumption}
                    />

                    <InfoRow
                      label="Safety Stock"
                      value={item.safety}
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-5 w-5 text-violet-300" />

                      <p className="text-sm text-slate-400">
                        Stockout Countdown
                      </p>
                    </div>

                    <p className="mt-3 text-4xl font-semibold text-white">
                      {item.stockout}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card className="border-white/10 bg-[#0B1225]">
      <CardContent className="p-5">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}