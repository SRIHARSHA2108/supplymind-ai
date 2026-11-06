"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Activity,
  AlertTriangle,
  Boxes,
  Factory,
  Gauge,
  PackageOpen,
  Play,
  Sparkles,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

export default function CrisisPage() {
  const [supplierDelay, setSupplierDelay] = useState(6);
  const [inventoryBuffer, setInventoryBuffer] = useState(42);
  const [demandSurge, setDemandSurge] = useState(28);
  const [transportCapacity, setTransportCapacity] = useState(74);
  const [productionAvailability, setProductionAvailability] =
    useState(88);
  const [machineDowntime, setMachineDowntime] = useState(8);
  const [liveConnected, setLiveConnected] = useState(false);
  const [liveUpdatedAt, setLiveUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let channel: ReturnType<ReturnType<typeof createClient>["channel"]> | undefined;

    const applyLiveState = (state: Record<string, unknown> | null) => {
      if (!state) return;

      const numberValue = (key: string, fallback: number) =>
        typeof state[key] === "number" ? state[key] : fallback;

      setSupplierDelay(numberValue("supplier_delay", 6));
      setInventoryBuffer(numberValue("inventory_buffer", 42));
      setDemandSurge(numberValue("demand_surge", 28));
      setTransportCapacity(numberValue("transport_capacity", 74));
      setProductionAvailability(numberValue("production_availability", 88));
      setMachineDowntime(numberValue("machine_downtime", 8));
      setLiveUpdatedAt(
        typeof state.updated_at === "string" ? state.updated_at : new Date().toISOString()
      );
    };

    async function connectLiveState() {
      try {
        const response = await fetch("/api/factory-state", { cache: "no-store" });
        const result = await response.json();
        applyLiveState(result.state);

        const supabase = createClient();
        channel = supabase
          .channel("factory-state-live")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "factory_state" },
            (payload) => {
              applyLiveState(payload.new as Record<string, unknown>);
              setLiveConnected(true);
            }
          )
          .subscribe((status) => setLiveConnected(status === "SUBSCRIBED"));
      } catch {
        setLiveConnected(false);
      }
    }

    connectLiveState();

    return () => {
      if (channel) {
        createClient().removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    if (liveConnected) return;

    const interval = window.setInterval(() => {
      setSupplierDelay((value) => (value >= 10 ? 6 : value + 1));
      setDemandSurge((value) => (value >= 55 ? 28 : value + 3));
      setMachineDowntime((value) => (value >= 24 ? 8 : value + 4));
      setLiveUpdatedAt(new Date().toISOString());
    }, 5000);

    return () => window.clearInterval(interval);
  }, [liveConnected]);

  const simulation = useMemo(() => {
    const disruptionScore = Math.min(
      100,
      Math.round(
        supplierDelay * 5.5 +
          demandSurge * 0.45 +
          (100 - inventoryBuffer) * 0.25 +
          (100 - transportCapacity) * 0.2 +
          (100 - productionAvailability) * 0.3 +
          machineDowntime * 0.35
      )
    );

    const productionImpact = Math.min(
      48,
      Math.round(disruptionScore * 0.38)
    );

    const fulfillment = Math.max(
      52,
      Math.round(100 - disruptionScore * 0.34)
    );

    const estimatedDelay = Math.max(
      0.5,
      Number(
        (
          supplierDelay * 0.42 +
          disruptionScore * 0.018
        ).toFixed(1)
      )
    );

    const exposure = Math.round(
      disruptionScore * 0.31 + 2.5
    );

    const dissatisfaction = Math.min(
      95,
      Math.round(disruptionScore * 0.68)
    );

    const carbonImpact = Math.min(
      75,
      Math.round(
        10 +
          supplierDelay * 1.8 +
          (100 - transportCapacity) * 0.3 +
          demandSurge * 0.18
      )
    );

    const inventoryUnits = Math.round(400 + inventoryBuffer * 8.4);
    const dailyDemand = Math.round(285 * (1 + demandSurge / 100));
    const inventoryRunway = Math.max(
      0.5,
      Number((inventoryUnits / dailyDemand).toFixed(1))
    );
    const supplierCoverage = Math.max(
      0,
      Math.round(100 - supplierDelay * 4 - (100 - transportCapacity) * 0.15)
    );
    const lineOutput = Math.max(
      0,
      Math.round(
        productionAvailability - productionImpact - machineDowntime * 0.35
      )
    );

    return {
      disruptionScore,
      productionImpact,
      fulfillment,
      estimatedDelay,
      exposure,
      dissatisfaction,
      carbonImpact,
      inventoryUnits,
      dailyDemand,
      inventoryRunway,
      supplierCoverage,
      lineOutput,
    };
  }, [
    supplierDelay,
    inventoryBuffer,
    demandSurge,
    transportCapacity,
    productionAvailability,
    machineDowntime,
  ]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-700">
            Factory Digital Twin
          </Badge>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What-if Digital Twin
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Create a virtual representation of your suppliers, inventory,
            production lines, and customers. Change one assumption and see the
            operational impact before making a decision.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle>Scenario Controls</CardTitle>
                <Badge
                  className={
                    liveConnected
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "bg-cyan-400/10 text-cyan-700"
                  }
                >
                  {liveConnected ? "Live feed connected" : "Live demo stream"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-7">
              <ScenarioSlider
                label="Supplier Delay"
                value={supplierDelay}
                setValue={setSupplierDelay}
                max={14}
                suffix=" days"
                icon={
                  <AlertTriangle className="h-4 w-4 text-red-700" />
                }
              />

              <ScenarioSlider
                label="Inventory Buffer"
                value={inventoryBuffer}
                setValue={setInventoryBuffer}
                max={100}
                suffix="%"
                icon={
                  <PackageOpen className="h-4 w-4 text-cyan-700" />
                }
              />

              <ScenarioSlider
                label="Demand Surge"
                value={demandSurge}
                setValue={setDemandSurge}
                max={100}
                suffix="%"
                icon={
                  <Activity className="h-4 w-4 text-violet-700" />
                }
              />

              <ScenarioSlider
                label="Transport Capacity"
                value={transportCapacity}
                setValue={setTransportCapacity}
                max={100}
                suffix="%"
                icon={
                  <Truck className="h-4 w-4 text-amber-700" />
                }
              />

              <ScenarioSlider
                label="Production Availability"
                value={productionAvailability}
                setValue={setProductionAvailability}
                max={100}
                suffix="%"
                icon={
                  <Factory className="h-4 w-4 text-emerald-700" />
                }
              />

              <ScenarioSlider
                label="Machine Downtime"
                value={machineDowntime}
                setValue={setMachineDowntime}
                max={72}
                suffix=" hrs"
                icon={<Factory className="h-4 w-4 text-red-700" />}
              />

              <Button className="h-12 w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:opacity-90">
                <Play className="mr-2 h-4 w-4" />
                Run Simulation
              </Button>
            </CardContent>
          </Card>

          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-white to-cyan-400/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-cyan-700" />
                <CardTitle>Twin Projection</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6 flex flex-col items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Disruption Score
                  </p>

                  <p className="mt-2 text-6xl font-semibold">
                    {simulation.disruptionScore}
                  </p>
                </div>

                <Badge
                  className={
                    simulation.disruptionScore >= 70
                      ? "bg-red-500/10 text-red-700"
                      : simulation.disruptionScore >= 45
                      ? "bg-amber-500/10 text-amber-700"
                      : "bg-emerald-500/10 text-emerald-700"
                  }
                >
                  {simulation.disruptionScore >= 70
                    ? "Critical"
                    : simulation.disruptionScore >= 45
                    ? "Elevated"
                    : "Controlled"}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  title="Production Output Impact"
                  value={`-${simulation.productionImpact}%`}
                />

                <MetricCard
                  title="Order Fulfillment"
                  value={`${simulation.fulfillment}%`}
                />

                <MetricCard
                  title="Estimated Delay"
                  value={`${simulation.estimatedDelay} days`}
                />

                <MetricCard
                  title="Financial Exposure"
                  value={`₹${simulation.exposure} lakh`}
                />

                <MetricCard
                  title="Customer Dissatisfaction Risk"
                  value={`${simulation.dissatisfaction}%`}
                />

                <MetricCard
                  title="Carbon Impact"
                  value={`+${simulation.carbonImpact}%`}
                />
              </div>

              <TwinSnapshot
                inventoryRunway={simulation.inventoryRunway}
                inventoryUnits={simulation.inventoryUnits}
                dailyDemand={simulation.dailyDemand}
                supplierCoverage={simulation.supplierCoverage}
                lineOutput={simulation.lineOutput}
                fulfillment={simulation.fulfillment}
                liveConnected={liveConnected}
                liveUpdatedAt={liveUpdatedAt}
              />

            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-700" />
            <div>
              <h2 className="text-xl font-semibold">Explainable Recovery Plans</h2>
              <p className="mt-1 text-sm text-slate-600">
                Compare actions before a manager approves the response.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <RecoveryCard
              plan="Plan A"
              title="Switch to Alternate Supplier"
              recovery="2 days"
              cost="₹8.2 lakh"
              risk="Low"
              recommended
              description="Redirect 35% of Component X orders to Supplier B and preserve remaining safety stock."
            />

            <RecoveryCard
              plan="Plan B"
              title="Expedited Shipment"
              recovery="1 day"
              cost="₹13.4 lakh"
              risk="Low"
              description="Use priority air freight for the delayed component to restore production faster."
            />

            <RecoveryCard
              plan="Plan C"
              title="Production Rescheduling"
              recovery="4 days"
              cost="₹3.1 lakh"
              risk="Medium"
              description="Reorder production sequence and temporarily prioritize products with available materials."
            />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function ScenarioSlider({
  label,
  value,
  setValue,
  max,
  suffix,
  icon,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  max: number;
  suffix: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}

          <span className="text-sm text-slate-700">
            {label}
          </span>
        </div>

        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900">
          {value}
          {suffix}
        </span>
      </div>

      <Slider
        value={value}
        onValueChange={(nextValue) => {
          if (typeof nextValue === "number") {
            setValue(nextValue);
          } else {
            setValue(nextValue[0] ?? 0);
          }
        }}
        max={max}
        step={1}
      />
    </div>
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
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-xl font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function TwinSnapshot({
  inventoryRunway,
  inventoryUnits,
  dailyDemand,
  supplierCoverage,
  lineOutput,
  fulfillment,
  liveConnected,
  liveUpdatedAt,
}: {
  inventoryRunway: number;
  inventoryUnits: number;
  dailyDemand: number;
  supplierCoverage: number;
  lineOutput: number;
  fulfillment: number;
  liveConnected: boolean;
  liveUpdatedAt: string | null;
}) {
  const nodes = [
    {
      label: "Supplier A",
      value: `${supplierCoverage}% covered`,
      icon: Boxes,
      tone: supplierCoverage < 60 ? "text-red-700 bg-red-500/10" : "text-amber-700 bg-amber-500/10",
    },
    {
      label: "Factory",
      value: `${lineOutput}% output`,
      icon: Factory,
      tone: lineOutput < 60 ? "text-red-700 bg-red-500/10" : "text-cyan-700 bg-cyan-500/10",
    },
    {
      label: "Customers",
      value: `${fulfillment}% filled`,
      icon: Users,
      tone: fulfillment < 70 ? "text-amber-700 bg-amber-500/10" : "text-emerald-700 bg-emerald-500/10",
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-violet-500/20 bg-white/80 p-4 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-violet-700">
            Live twin state
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Inventory and flow health under the current scenario.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm font-semibold text-slate-900">
            {inventoryRunway} days of runway
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {liveConnected && liveUpdatedAt
              ? `Updated ${new Date(liveUpdatedAt).toLocaleTimeString()}`
              : liveUpdatedAt
              ? `Demo updated ${new Date(liveUpdatedAt).toLocaleTimeString()}`
              : "Starting live demo stream"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {nodes.map((node) => {
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <div className={`rounded-lg p-2 ${node.tone}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{node.label}</p>
                <p className="truncate text-sm font-medium text-slate-900">
                  {node.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <Warehouse className="h-3.5 w-3.5" />
        {inventoryUnits.toLocaleString()} units available · {dailyDemand.toLocaleString()} units/day demand
      </div>
    </div>
  );
}

function RecoveryCard({
  plan,
  title,
  recovery,
  cost,
  risk,
  description,
  recommended = false,
}: {
  plan: string;
  title: string;
  recovery: string;
  cost: string;
  risk: string;
  description: string;
  recommended?: boolean;
}) {
  return (
    <Card
      className={
        recommended
          ? "border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-violet-500/10"
          : "border-slate-200 bg-white"
      }
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              {plan}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {title}
            </h3>
          </div>

          {recommended && (
            <Badge className="bg-cyan-400/10 text-cyan-700">
              AI Recommended
            </Badge>
          )}
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Recovery
            </p>

            <p className="mt-1 text-sm font-medium">
              {recovery}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Cost
            </p>

            <p className="mt-1 text-sm font-medium">
              {cost}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Risk
            </p>

            <p className="mt-1 text-sm font-medium">
              {risk}
            </p>
          </div>
        </div>

        <Button
          className={
            recommended
              ? "mt-6 w-full bg-cyan-400 text-black hover:bg-cyan-300"
              : "mt-6 w-full"
          }
          variant={
            recommended
              ? "default"
              : "outline"
          }
        >
          Select Strategy
        </Button>
      </CardContent>
    </Card>
  );
}
