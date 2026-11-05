"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquareText,
  PhoneCall,
  AlertTriangle,
  TrendingUp,
  Activity,
  Sparkles,
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

const calls = [
  {
    id: "Customer #1842",
    text: "My delivery was promised Tuesday but tracking has not updated.",
    issue: "Delivery Delay",
    sentiment: "Negative",
    confidence: "94%",
    echo: 84,
  },
  {
    id: "Customer #2191",
    text: "This is the second delayed shipment this month.",
    issue: "Repeated Delay",
    sentiment: "Negative",
    confidence: "91%",
    echo: 88,
  },
  {
    id: "Customer #5520",
    text: "The product is unavailable again. When will it be restocked?",
    issue: "Product Availability",
    sentiment: "Negative",
    confidence: "89%",
    echo: 79,
  },
];

const chartData = [
  { week: "W1", late: 12, availability: 8, quality: 4 },
  { week: "W2", late: 18, availability: 10, quality: 5 },
  { week: "W3", late: 21, availability: 13, quality: 7 },
  { week: "W4", late: 29, availability: 15, quality: 6 },
  { week: "W5", late: 36, availability: 17, quality: 8 },
  { week: "W6", late: 42, availability: 22, quality: 9 },
];

export default function CustomerSignalsPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <Badge className="mb-3 border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            Voice-of-Customer Intelligence
          </Badge>

          <h1 className="text-3xl font-semibold tracking-tight">
            Customer Signals Intelligence
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Turn customer conversations into operational early warnings by
            connecting complaints, sentiment, and service patterns to upstream
            supply-chain problems.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard title="Calls Analysed" value="1,284" />
          <MetricCard title="Negative Sentiment" value="31%" />
          <MetricCard title="Delay Complaints" value="+38%" />
          <MetricCard title="Customer Echo Score" value="81/100" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/10 bg-[#0B1225]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-300" />
                <CardTitle>Customer Issue Trends</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="h-[330px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="week" stroke="#64748b" />
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
                      dataKey="late"
                      stroke="#22d3ee"
                      strokeWidth={3}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="availability"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="quality"
                      stroke="#f59e0b"
                      strokeWidth={3}
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
                <CardTitle>AI Operational Insight</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-slate-300">
                Late-delivery complaints increased by 38% this week and show a
                strong operational correlation with congestion at Distribution
                Hub 3.
              </p>

              <div className="mt-6 rounded-xl border border-red-500/10 bg-red-500/5 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-300" />
                  <p className="text-xs uppercase tracking-wider text-red-300">
                    Emerging Risk
                  </p>
                </div>

                <p className="mt-2 text-sm text-slate-300">
                  Distribution Hub 3 congestion may begin affecting priority
                  customers within 48 hours.
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Operational Correlation
                </p>
                <p className="mt-2 text-3xl font-semibold text-cyan-300">67%</p>
              </div>

              <Button className="mt-6 w-full bg-cyan-400 text-black hover:bg-cyan-300">
                Create Operational Risk
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {calls.map((call) => (
              <Card
                key={call.id}
                className="border-white/10 bg-[#0B1225]"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                      <PhoneCall className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {call.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Anonymized service-call summary
                          </p>
                        </div>

                        <Badge className="bg-red-500/10 text-red-300">
                          {call.sentiment}
                        </Badge>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <MessageSquareText className="mb-3 h-4 w-4 text-slate-500" />

                        <p className="text-sm leading-6 text-slate-300">
                          “{call.text}”
                        </p>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        <SmallMetric title="Detected Issue" value={call.issue} />
                        <SmallMetric
                          title="AI Confidence"
                          value={call.confidence}
                        />
                        <SmallMetric
                          title="Echo Score"
                          value={`${call.echo}/100`}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="border-cyan-500/20 bg-cyan-500/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyan-300" />
                  <CardTitle className="text-base">
                    Customer Echo Score
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-5xl font-semibold text-cyan-300">
                  81
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Measures how strongly customer complaints reflect an upstream
                  operational problem.
                </p>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[81%] rounded-full bg-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0B1225]">
              <CardHeader>
                <CardTitle className="text-base">Top Signal Sources</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <SignalRow label="Late Delivery" value="42%" />
                <SignalRow label="Availability" value="22%" />
                <SignalRow label="Damaged Product" value="16%" />
                <SignalRow label="Quality" value="11%" />
                <SignalRow label="Other" value="9%" />
              </CardContent>
            </Card>
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

function SmallMetric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <p className="text-xs text-slate-500">{title}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function SignalRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}