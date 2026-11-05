"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Truck,
  Factory,
  Recycle,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const carbonData = [
  { month: "Jan", emissions: 84 },
  { month: "Feb", emissions: 79 },
  { month: "Mar", emissions: 76 },
  { month: "Apr", emissions: 69 },
  { month: "May", emissions: 63 },
  { month: "Jun", emissions: 58 },
];

const suppliers = [
  {
    name: "Supplier A",
    cost: "₹105/unit",
    distance: "1,250 km",
    carbon: "High",
    leadTime: "6 days",
    local: "No",
  },
  {
    name: "Supplier B",
    cost: "₹109/unit",
    distance: "320 km",
    carbon: "Low",
    leadTime: "3 days",
    local: "Yes",
  },
];

export default function SustainabilityPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
            Sustainable Supply Intelligence
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Sustainability Intelligence
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Compare business decisions not only by cost and risk, but also by
            emissions, material waste, transport efficiency, and sourcing
            distance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <MetricCard
            title="Sustainability Score"
            value="78/100"
            icon={<Leaf className="h-5 w-5 text-emerald-300" />}
          />

          <MetricCard
            title="CO₂ Reduction"
            value="-31%"
            icon={<Factory className="h-5 w-5 text-cyan-300" />}
          />

          <MetricCard
            title="Material Waste"
            value="-18%"
            icon={<Recycle className="h-5 w-5 text-violet-300" />}
          />

          <MetricCard
            title="Local Sourcing"
            value="46%"
            icon={<MapPin className="h-5 w-5 text-amber-300" />}
          />

          <MetricCard
            title="Transport Efficiency"
            value="86%"
            icon={<Truck className="h-5 w-5 text-cyan-300" />}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/10 bg-[#0B1225]">
            <CardHeader>
              <CardTitle>Carbon Emissions Trend</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-[330px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={carbonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />

                    <Tooltip
                      contentStyle={{
                        background: "#0B1225",
                        border: "1px solid #1f2937",
                        borderRadius: 12,
                      }}
                    />

                    <Bar
                      dataKey="emissions"
                      fill="#34d399"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-400/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-300" />
                <CardTitle>Green Decision Insight</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-slate-300">
                Shifting more Component X volume to Supplier B may reduce
                estimated transport emissions by 61%, while increasing unit
                cost by only 3.8%.
              </p>

              <div className="mt-5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />

                  <p className="text-xs uppercase tracking-wider text-emerald-300">
                    Greener Choice
                  </p>
                </div>

                <p className="mt-2 text-lg font-semibold text-white">
                  Supplier B
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Lower transport emissions, shorter delivery distance, and
                  faster replenishment.
                </p>
              </div>

              <Button className="mt-6 w-full bg-emerald-400 text-black hover:bg-emerald-300">
                Apply Sustainable Strategy
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Green Decision Comparator
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Compare sourcing options across commercial and environmental
              impact.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {suppliers.map((supplier) => (
              <Card
                key={supplier.name}
                className={
                  supplier.name === "Supplier B"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-white/10 bg-[#0B1225]"
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {supplier.name}
                    </h3>

                    {supplier.name === "Supplier B" && (
                      <Badge className="bg-emerald-400/10 text-emerald-300">
                        Recommended
                      </Badge>
                    )}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InfoBox label="Unit Cost" value={supplier.cost} />
                    <InfoBox label="Distance" value={supplier.distance} />
                    <InfoBox label="Carbon Impact" value={supplier.carbon} />
                    <InfoBox label="Lead Time" value={supplier.leadTime} />
                    <InfoBox label="Local Supplier" value={supplier.local} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="border-white/10 bg-[#0B1225]">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Waste Reduction
              </p>

              <p className="mt-2 text-4xl font-semibold text-violet-300">
                18%
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Estimated reduction in material waste through better demand
                planning and procurement alignment.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#0B1225]">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Transport Efficiency
              </p>

              <p className="mt-2 text-4xl font-semibold text-cyan-300">
                86%
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Consolidated shipments and shorter sourcing distances improve
                fleet utilization.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#0B1225]">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Local Sourcing
              </p>

              <p className="mt-2 text-4xl font-semibold text-emerald-300">
                46%
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Nearly half of current procurement volume is now sourced from
                shorter-distance suppliers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-white/10 bg-[#0B1225]">
      <CardContent className="p-5">
        <div className="mb-4">{icon}</div>

        <p className="text-sm text-slate-400">{title}</p>

        <p className="mt-2 text-2xl font-semibold text-white">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-2 text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}