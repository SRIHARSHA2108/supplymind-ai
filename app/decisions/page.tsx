"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  FlaskConical,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  History,
} from "lucide-react";

const recommendations = [
  {
    title: "Switch Supplier A → Supplier B",
    impact: "Avoid 72% delivery-delay risk",
    confidence: "91%",
    category: "Supplier Risk",
  },
  {
    title: "Increase Component X buffer by 15%",
    impact: "Reduce shortage probability by 64%",
    confidence: "88%",
    category: "Inventory",
  },
  {
    title: "Reschedule Production Line 2",
    impact: "Recover 2 days of production capacity",
    confidence: "84%",
    category: "Production",
  },
];

const history = [
  {
    recommendation: "Shift Component X to Supplier B",
    decision: "Approved",
    expected: "2-day recovery",
    actual: "1.8-day recovery",
    accuracy: "91%",
  },
  {
    recommendation: "Reroute priority orders through Hub 2",
    decision: "Approved",
    expected: "35-hour backlog recovery",
    actual: "36-hour recovery",
    accuracy: "97%",
  },
  {
    recommendation: "Delay preventive maintenance",
    decision: "Rejected",
    expected: "9% short-term capacity gain",
    actual: "Maintenance proceeded as scheduled",
    accuracy: "N/A",
  },
];

export default function DecisionsPage() {
  const [status, setStatus] = useState<Record<number, string>>({});

  function updateDecision(index: number, value: string) {
    setStatus((prev) => ({
      ...prev,
      [index]: value,
    }));
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-violet-400/20 bg-violet-400/10 text-violet-300">
            Human-in-the-Loop Intelligence
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Decision Hub
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Track what the AI recommended, what humans decided, what actually
            happened, and how each outcome improves future decisions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard title="Pending Decisions" value="3" />
          <MetricCard title="Approval Rate" value="82%" />
          <MetricCard title="Prediction Accuracy" value="91%" />
          <MetricCard title="Decision Learning Score" value="89" />
        </div>

        <Tabs defaultValue="recommended" className="space-y-5">
          <TabsList className="border border-white/10 bg-[#0B1225]">
            <TabsTrigger value="recommended">
              Recommended Decisions
            </TabsTrigger>

            <TabsTrigger value="history">
              Decision History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4">
            {recommendations.map((item, index) => (
              <Card
                key={item.title}
                className="border-white/10 bg-[#0B1225]"
              >
                <CardContent className="p-6">
                  <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Sparkles className="h-5 w-5 text-violet-300" />

                        <h2 className="text-lg font-semibold text-white">
                          {item.title}
                        </h2>

                        <Badge className="bg-cyan-400/10 text-cyan-300">
                          {item.category}
                        </Badge>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-white/[0.03] p-4">
                          <p className="text-xs text-slate-500">
                            Predicted Impact
                          </p>

                          <p className="mt-2 text-sm text-white">
                            {item.impact}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/[0.03] p-4">
                          <p className="text-xs text-slate-500">
                            AI Confidence
                          </p>

                          <p className="mt-2 text-sm text-white">
                            {item.confidence}
                          </p>
                        </div>
                      </div>

                      {status[index] && (
                        <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                          <p className="text-xs text-slate-500">
                            Current Human Decision
                          </p>

                          <p className="mt-2 font-medium text-white">
                            {status[index]}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <Button
                        onClick={() => updateDecision(index, "Approved")}
                        className="bg-emerald-400 text-black hover:bg-emerald-300"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </Button>

                      <Button
                        onClick={() => updateDecision(index, "Rejected")}
                        variant="outline"
                        className="border-red-400/20 bg-red-400/5 text-red-300"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>

                      <Button
                        onClick={() => updateDecision(index, "Simulation Requested")}
                        variant="outline"
                        className="border-white/10 bg-white/5 text-white"
                      >
                        <FlaskConical className="mr-2 h-4 w-4" />
                        Simulate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-white/10 bg-[#0B1225]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-cyan-300" />
                  <CardTitle>Decision History</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.recommendation}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                  >
                    <div className="grid gap-4 md:grid-cols-5">
                      <HistoryItem
                        label="AI Recommendation"
                        value={item.recommendation}
                      />

                      <HistoryItem
                        label="Human Decision"
                        value={item.decision}
                      />

                      <HistoryItem
                        label="Expected Outcome"
                        value={item.expected}
                      />

                      <HistoryItem
                        label="Actual Outcome"
                        value={item.actual}
                      />

                      <HistoryItem
                        label="Prediction Accuracy"
                        value={item.accuracy}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-[#0B1225] to-cyan-400/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-violet-300" />
              <CardTitle>Decision Learning Loop</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-6">
              <LoopStep title="Observe" />
              <LoopArrow />
              <LoopStep title="Predict" />
              <LoopArrow />
              <LoopStep title="Recommend" />
              <LoopArrow />
              <LoopStep title="Human Decision" />
              <LoopArrow />
              <LoopStep title="Outcome" />
              <LoopArrow />
              <LoopStep title="Memory Update" />
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
              Every approved or rejected recommendation becomes part of
              SupplyMind&apos;s organizational memory, allowing the system to
              compare predicted outcomes against real results and improve future
              recommendations.
            </p>
          </CardContent>
        </Card>
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

function HistoryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-5 text-white">
        {value}
      </p>
    </div>
  );
}

function LoopStep({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex min-h-24 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
      <p className="text-sm font-medium text-white">{title}</p>
    </div>
  );
}

function LoopArrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <ArrowRight className="h-5 w-5 text-cyan-300" />
    </div>
  );
}