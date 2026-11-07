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
  const [outcome, setOutcome] = useState({ delay: "", loss: "", recovery: "" });
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [savingOutcome, setSavingOutcome] = useState(false);
  const [predictionAccuracy, setPredictionAccuracy] = useState(91);
  const [learningScore, setLearningScore] = useState(89);

  function updateDecision(index: number, value: string) {
    setStatus((prev) => ({
      ...prev,
      [index]: value,
    }));
  }

  async function recordOutcome() {
    const actualRecovery = Number(outcome.recovery);
    if (!actualRecovery || savingOutcome) return;
    setSavingOutcome(true);
    const predictedRecovery = 2;
    const accuracy = Math.max(0, Math.round(100 - (Math.abs(predictedRecovery - actualRecovery) / predictedRecovery) * 100));
    const confidenceBefore = 84;
    const confidenceAfter = Math.min(99, Math.round(confidenceBefore + (accuracy >= 80 ? 7 : -5)));
    const content = `Incident: Supplier A delay affecting Component X. Action: Shifted 35% of Component X orders to Supplier B. Predicted delay: 6 days. Predicted production loss: 12 hours. Predicted recovery: ${predictedRecovery} days. AI confidence: ${confidenceBefore}%. Human decision: ${status[0] || "Approved"}. Actual delay: ${outcome.delay || "not recorded"} days. Actual production loss: ${outcome.loss || "not recorded"} hours. Actual recovery: ${actualRecovery} days. Prediction accuracy: ${accuracy}%. Outcome: ${accuracy >= 80 ? "Successful" : "Needs review"}. Updated strategy confidence: ${confidenceAfter}%.`;
    try {
      const response = await fetch("/api/hindsight", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ operation: "retain", content, context: "Closed-loop prediction evaluation from SupplyMind Decision Hub." }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save evaluation.");
      setEvaluation(`Prediction accuracy: ${accuracy}% · Strategy outcome: ${accuracy >= 80 ? "Successful" : "Needs review"} · Confidence updated: ${confidenceBefore}% → ${confidenceAfter}% · Memory saved`);
      setPredictionAccuracy(accuracy);
      setLearningScore(Math.round((accuracy + confidenceAfter) / 2));
    } catch (error) { setEvaluation(error instanceof Error ? error.message : "Unable to save evaluation."); }
    finally { setSavingOutcome(false); }
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-violet-400/20 bg-violet-400/10 text-violet-700">
            Human-in-the-Loop Intelligence
          </Badge>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Decision Hub
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Track what the AI recommended, what humans decided, what actually
            happened, and how each outcome improves future decisions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <MetricCard title="Pending Decisions" value="3" />
          <MetricCard title="Approval Rate" value="82%" />
          <MetricCard title="Prediction Accuracy" value={`${predictionAccuracy}%`} />
          <MetricCard title="Decision Learning Score" value={`${learningScore}`} />
        </div>

        <Tabs defaultValue="recommended" className="space-y-5">
          <TabsList className="flex h-auto max-w-full flex-wrap justify-start gap-1 border border-slate-200 bg-white p-1">
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
                className="border-slate-200 bg-white"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Sparkles className="h-5 w-5 text-violet-700" />

                        <h2 className="text-lg font-semibold text-slate-900">
                          {item.title}
                        </h2>

                        <Badge className="bg-cyan-400/10 text-cyan-700">
                          {item.category}
                        </Badge>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs text-slate-500">
                            Predicted Impact
                          </p>

                          <p className="mt-2 text-sm text-slate-900">
                            {item.impact}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs text-slate-500">
                            AI Confidence
                          </p>

                          <p className="mt-2 text-sm text-slate-900">
                            {item.confidence}
                          </p>
                        </div>
                      </div>

                      {status[index] && (
                        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <p className="text-xs text-slate-500">
                            Current Human Decision
                          </p>

                          <p className="mt-2 font-medium text-slate-900">
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
                        className="border-red-400/20 bg-red-400/5 text-red-700"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>

                      <Button
                        onClick={() => updateDecision(index, "Simulation Requested")}
                        variant="outline"
                        className="border-slate-200 bg-slate-100 text-slate-900"
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
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-cyan-700" />
                  <CardTitle>Decision History</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.recommendation}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
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

        <Card className="border-cyan-400/20 bg-white">
          <CardHeader>
            <div className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-cyan-700" /><CardTitle>Hindsight Update</CardTitle></div>
            <p className="text-sm text-slate-600">Close the loop by entering what actually happened. SupplyMind compares it with the prediction and saves the lesson to Hindsight.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <OutcomeField label="Actual delay (days)" value={outcome.delay} onChange={(value) => setOutcome({ ...outcome, delay: value })} />
              <OutcomeField label="Actual production loss (hours)" value={outcome.loss} onChange={(value) => setOutcome({ ...outcome, loss: value })} />
              <OutcomeField label="Actual recovery (days)" value={outcome.recovery} onChange={(value) => setOutcome({ ...outcome, recovery: value })} />
            </div>
            <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3"><HistoryItem label="Predicted recovery" value="2.0 days" /><HistoryItem label="Confidence before" value="84%" /><HistoryItem label="Strategy" value="Shift 35% to Supplier B" /></div>
            <Button onClick={recordOutcome} disabled={savingOutcome || !outcome.recovery} className="mt-5 bg-cyan-400 text-black hover:bg-cyan-300">{savingOutcome ? "Evaluating and saving…" : "Evaluate outcome + update memory"}</Button>
            {evaluation && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{evaluation}</p>}
          </CardContent>
        </Card>

        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-white to-cyan-400/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-violet-700" />
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

            <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-600">
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
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-4 sm:p-5">
        <p className="text-sm text-slate-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}

function OutcomeField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-sm text-slate-600">{label}<input type="number" min="0" step="0.1" value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-cyan-400" /></label>;
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
      <p className="mt-2 text-sm font-medium leading-5 text-slate-900">
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
    <div className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-sm font-medium text-slate-900">{title}</p>
    </div>
  );
}

function LoopArrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <ArrowRight className="h-5 w-5 text-cyan-700" />
    </div>
  );
}
