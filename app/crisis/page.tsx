"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
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
  Factory,
  Gauge,
  PackageOpen,
  Play,
  Sparkles,
  Truck,
} from "lucide-react";

export default function CrisisPage() {
  const [supplierDelay, setSupplierDelay] = useState(6);
  const [inventoryBuffer, setInventoryBuffer] = useState(42);
  const [demandSurge, setDemandSurge] = useState(28);
  const [transportCapacity, setTransportCapacity] = useState(74);
  const [productionAvailability, setProductionAvailability] =
    useState(88);

  const simulation = useMemo(() => {
    const disruptionScore = Math.min(
      100,
      Math.round(
        supplierDelay * 5.5 +
          demandSurge * 0.45 +
          (100 - inventoryBuffer) * 0.25 +
          (100 - transportCapacity) * 0.2 +
          (100 - productionAvailability) * 0.3
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

    return {
      disruptionScore,
      productionImpact,
      fulfillment,
      estimatedDelay,
      exposure,
      dissatisfaction,
      carbonImpact,
    };
  }, [
    supplierDelay,
    inventoryBuffer,
    demandSurge,
    transportCapacity,
    productionAvailability,
  ]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-700">
            What-If Simulation Engine
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Crisis Studio
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Simulate disruptions before they happen, compare recovery
            strategies, and understand operational impact before making a
            decision.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Scenario Controls</CardTitle>
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
                <CardTitle>Projected Impact</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6 flex items-end justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5">
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
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-700" />
            <h2 className="text-xl font-semibold">
              AI Recovery Strategies
            </h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
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
      <CardContent className="p-6">
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

        <div className="mt-6 grid grid-cols-3 gap-3">
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