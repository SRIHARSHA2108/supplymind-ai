# SupplyMind AI

SupplyMind AI is a responsive supply-chain intelligence cockpit for teams that need to understand operational risk before it becomes a production or customer problem.

The product combines risk monitoring, demand forecasting, organizational memory, customer signals, sustainability analysis, and a what-if factory Digital Twin in one friendly dashboard.

## What the app includes

- **Command Center** — high-level production, inventory, logistics, customer, and resilience health.
- **Risk Intelligence** — prioritized supplier, inventory, production, and logistics risks.
- **Memory Atlas** — searchable organizational memory for incidents, decisions, and outcomes.
- **Crisis Studio / What-if Digital Twin** — change supplier delay, inventory buffer, demand, transport, production, and machine downtime to see projected impact.
- **Customer Signals** — connect service complaints and sentiment to operational risks.
- **Decision Hub** — review recommendations, approve or reject actions, and inspect decision history.
- **Smart Forecast** — explore demand trends and stockout countdowns.
- **Sustainability** — compare sourcing decisions by cost, distance, emissions, and efficiency.
- **Responsive themes** — light and dark themes with a persistent theme toggle in the top bar.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/SRIHARSHA2108/supplymind-ai.git
cd supplymind-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Environment variables

Copy the example file and add your Supabase project values locally:

```bash
cp .env.example .env.local
```

```text
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The app remains usable with local sample/simulation behavior when Supabase is not configured.

## Optional live Digital Twin feed

Crisis Studio can subscribe to a Supabase Realtime table named `factory_state`. To create the table and enable its Realtime publication, run [`supabase/factory-state.sql`](supabase/factory-state.sql) in the Supabase SQL Editor.

The expected row is `id = 'current'` with these fields:

```text
supplier_delay
inventory_buffer
demand_surge
transport_capacity
production_availability
machine_downtime
updated_at
```

Your ERP, IoT service, or operations tool can update that row. Connected Crisis Studio sessions will receive the new state without a page refresh.

## Project structure

```text
app/                     Next.js routes and dashboard pages
components/              Shared layout, theme, and UI components
lib/supabase/             Supabase browser client
supabase/                 Database and Realtime setup SQL
public/                   Static assets
```

## Deployment

The project is configured for Vercel:

```bash
npx vercel --prod
```

For a production deployment, add the Supabase environment variables in **Vercel → Project Settings → Environment Variables**, select **Production**, save, and redeploy.

## Design direction

SupplyMind uses a calm light canvas with cyan and violet intelligence accents. Cards, badges, and charts use color to communicate status—not decoration alone. The theme toggle provides a dark workspace for low-light operations while preserving the same visual hierarchy and contrast.
