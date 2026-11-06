"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BrainCircuit,
  Search,
  History,
  GitBranch,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type Incident = {
  id: number;
  title: string;
  incident_type: string | null;
  supplier: string | null;
  material: string | null;
  severity: string | null;
  problem: string | null;
  impact: string | null;
  decision: string | null;
  outcome: string | null;
  confidence: number | null;
  created_at: string;
};

const similarityFactors = [
  { name: "Same supplier", value: 100 },
  { name: "Same component", value: 100 },
  { name: "Similar demand pattern", value: 82 },
  { name: "Similar inventory buffer", value: 74 },
];

export default function MemoryPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadIncidents() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/incidents", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load organizational memory."
          );
        }

        setIncidents(result.incidents ?? []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load organizational memory."
        );
      } finally {
        setLoading(false);
      }
    }

    loadIncidents();
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    const searchableText = `
      ${incident.title}
      ${incident.incident_type ?? ""}
      ${incident.supplier ?? ""}
      ${incident.material ?? ""}
      ${incident.severity ?? ""}
      ${incident.problem ?? ""}
      ${incident.impact ?? ""}
      ${incident.decision ?? ""}
      ${incident.outcome ?? ""}
    `.toLowerCase();

    return searchableText.includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-violet-400/20 bg-violet-400/10 text-violet-700">
            Persistent Organizational Memory
          </Badge>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Memory Atlas
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            The organizational memory of every disruption, decision, and
            outcome. SupplyMind uses historical incidents to improve future
            recommendations.
          </p>
        </div>

        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-white to-cyan-400/5">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-700">
                    <BrainCircuit className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-700">
                      FailureDNA
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-slate-900">
                      Similar Incident Detected
                    </h2>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-700">
                  The current Supplier A delay shares an estimated{" "}
                  <span className="font-semibold text-cyan-700">
                    87% similarity
                  </span>{" "}
                  with a previous Component X shortage stored in organizational
                  memory.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {similarityFactors.map((factor) => (
                    <div
                      key={factor.name}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-700">
                          {factor.name}
                        </p>

                        <span className="text-sm font-medium text-slate-900">
                          {factor.value}%
                        </span>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                          style={{
                            width: `${factor.value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-400/10 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-wider text-cyan-700">
                  Recovered Strategy
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Reuse the successful supplier diversification strategy:
                  redirect 30–35% of Component X demand to Supplier B before
                  inventory falls below the safety threshold.
                </p>

                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Historical Success Rate
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-slate-900">
                    91%
                  </p>
                </div>

                <Button className="mt-5 w-full bg-cyan-400 text-black hover:bg-cyan-300">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Apply Past Solution
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4 sm:p-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search organizational memory..."
                className="h-12 border-slate-200 bg-slate-50 pl-11 text-slate-900 placeholder:text-slate-500"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {loading && (
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                    Loading organizational memory...
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && error && (
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-4 sm:p-6">
                  <p className="font-medium text-red-700">
                    Failed to load memory
                  </p>

                  <p className="mt-2 text-sm text-red-700/70">
                    {error}
                  </p>
                </CardContent>
              </Card>
            )}

            {!loading &&
              !error &&
              filteredIncidents.length === 0 && (
                <Card className="border-slate-200 bg-white">
                  <CardContent className="p-4 text-slate-600 sm:p-6">
                    No matching incidents found.
                  </CardContent>
                </Card>
              )}

            {!loading &&
              !error &&
              filteredIncidents.map((incident, index) => (
                <Card
                  key={incident.id}
                  className="border-slate-200 bg-white"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700">
                          <History className="h-4 w-4" />
                        </div>

                        {index < filteredIncidents.length - 1 && (
                          <div className="mt-3 h-full min-h-48 w-px bg-gradient-to-b from-violet-500/40 to-transparent" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-xs text-slate-500">
                              {new Date(
                                incident.created_at
                              ).toLocaleDateString()}
                            </p>

                            <h2 className="mt-1 text-lg font-semibold text-slate-900">
                              {incident.title}
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                              Source:{" "}
                              {incident.supplier ??
                                "Unknown source"}
                            </p>

                            {incident.material && (
                              <p className="mt-1 text-xs text-slate-500">
                                Material: {incident.material}
                              </p>
                            )}
                          </div>

                          <Badge className="border-amber-400/20 bg-amber-400/10 text-amber-700">
                            {incident.severity ?? "Unknown"}
                          </Badge>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-700" />

                              <p className="text-xs uppercase tracking-wider text-red-700">
                                Problem
                              </p>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {incident.problem ??
                                "No problem description available."}
                            </p>
                          </div>

                          <div className="rounded-xl border border-orange-500/10 bg-orange-500/5 p-4">
                            <p className="text-xs uppercase tracking-wider text-orange-700">
                              Impact
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {incident.impact ??
                                "No impact description available."}
                            </p>
                          </div>

                          <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4">
                            <div className="flex items-center gap-2">
                              <GitBranch className="h-4 w-4 text-cyan-700" />

                              <p className="text-xs uppercase tracking-wider text-cyan-700">
                                Decision
                              </p>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {incident.decision ??
                                "No decision recorded."}
                            </p>
                          </div>

                          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-700" />

                              <p className="text-xs uppercase tracking-wider text-emerald-700">
                                Outcome
                              </p>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {incident.outcome ??
                                "No outcome recorded yet."}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4">
                          <span className="text-sm text-slate-600">
                            Memory Confidence
                          </span>

                          <span className="text-lg font-semibold text-violet-700">
                            {incident.confidence ?? 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="space-y-4">
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-base">
                  Organizational Memory
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Stored Incidents
                  </p>

                  <p className="mt-1 text-3xl font-semibold">
                    {incidents.length}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Successful Recoveries
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-emerald-700">
                    {
                      incidents.filter(
                        (item) =>
                          item.outcome &&
                          item.outcome.trim().length > 0
                      ).length
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Reusable Strategies
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-cyan-700">
                    {
                      incidents.filter(
                        (item) =>
                          item.decision &&
                          item.decision.trim().length > 0
                      ).length
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader>
                <CardTitle className="text-base">
                  Decision Learning Score
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-5xl font-semibold text-violet-700">
                  89
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Measures how effectively SupplyMind learns from historical
                  decisions and actual outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
