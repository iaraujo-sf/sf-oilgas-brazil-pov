# Pricing Intelligence — Downstream Oil & Gas Brazil

## Why Pricing Is Different in Brazil

Pricing in Brazilian fuel distribution is the most consequential business decision made daily. A 1 centavo/liter error across a major distributor's volume means R$5M+ in annual margin leakage.

### The Multi-Variable Equation

| Factor | Business Impact | Scale of Exposure |
|--------|----------------|-------------------|
| PPI Abandonment (2022) | Petrobras no longer follows International Parity Price — creates opacity and unpredictability in cost basis | Affects 100% of domestically-sourced volume. R$200B+ in annual purchases with no transparent pricing formula |
| FX Exposure | BRL/USD volatility directly impacts import costs | 15-20% annual BRL volatility × 12% import share = R$3-5B in annual unhedged exposure |
| Tax Labyrinth | ICMS monofásico + PIS/COFINS + CIDE + state tax substitution — each product/state combination is different | 27 states × 6+ fuel types = 162+ tax scenarios |
| Biofuel Mandates | Ethanol (27%) and Biodiesel (15%) blend ratios shift effective cost per liter | Ethanol inter-safra price swings up to 40%. 1-week delay = R$0.03-0.05/L margin loss |
| Competitive Pressure | White-flag stations undercut branded networks by R$0.10-0.30/L | 42% of stations are white-flag. Each lost dealer = ~2M liters/year |

**The Cost of Getting It Wrong:** In a market with R$0.08-0.15/L gross margin, every pricing decision is existential. A 48h delay means 48 hours of selling below cost or losing volume.

## Pricing Decision Velocity — The Competitive Gap

| Market Event | Best-in-Class Response | Industry Average | Margin Impact per Day of Delay |
|-------------|----------------------|------------------|-------------------------------|
| Petrobras gate price change | <2 hours (auto-calculated) | 24-48 hours (manual + committee) | R$500K-2M/day for a major |
| FX movement >2% | Same-day contract adjustment | Next pricing committee (weekly) | R$1-3M/week unhedged |
| Competitor price undercut | Same-day targeted response | Discovered in monthly P&L review | 5-15% volume loss in 7 days |
| Ethanol parity crossing 70% | Hours — dynamic display pricing | Days — manual survey + adjustment | 10-20% volume shift per day |
| B2B contract renewal (indexed) | Auto-generated with current market | 5-10 days manual calculation | Competitor pre-empts with faster offer |

## The Pricing Operating Model — Five Layers

1. **Cost Basis Construction:** Petrobras gate price (or import landed cost) + biofuel blending cost + freight to terminal + tax burden per state/product
2. **Market Intelligence:** Competitor pricing monitoring (ANP data), regional demand elasticity, channel-specific willingness to pay
3. **Margin Rules Engine:** Floor margin by product/region/channel, target margin bands by customer tier, escalation triggers
4. **Dynamic Pricing Execution:** B2B contract pricing (indexed), spot pricing for TRR, promotional pricing for retail network
5. **Performance Monitoring:** Realized margin vs. target (daily), price-volume trade-off analysis, competitor response tracking

## The Pricing Gap — Current State

| Layer | Current Reality | Risk |
|-------|----------------|------|
| Cost Basis Construction | SAP extract + manual FX lookup + tax team email | MARGIN EROSION |
| Market Intelligence | Manual pump surveys + weekly ANP reports + WhatsApp | BLIND SPOTS |
| Margin Rules Engine | Pricing committee weekly + Excel guardrails | MARGIN LEAKAGE |
| Dynamic Pricing | Sales rep discretion + email approval chains | SPEED LOSS |
| Performance Monitoring | Monthly P&L + ad-hoc reports | LATE DETECTION |

**Core Problem:** The gap between cost movement and price adjustment is where margin disappears.

## Salesforce Solution Architecture for Pricing

### Value Metrics
- **<1h** Pricing Response Time (from 24-48h delay)
- **R$50M+** Annual Margin Protection (automated guardrails)
- **100%** Deal Margin Visibility (every B2B deal validated)
- **Real-time** Cost-per-Liter View (continuous feed ingestion)

### Technical Architecture Stack

| Layer | Salesforce Products | Business Capability | Impact |
|-------|--------------------|--------------------|--------|
| Cost Basis | Data Cloud + MuleSoft | Real-time SAP cost ingestion + FX feeds + tax engine. Single cost-per-liter view across states | Eliminates 24-48h delay |
| Market Intelligence | Tableau + Data Cloud | ANP data integration, competitor monitoring, AI-detected pricing anomalies | Same-day detection vs. weekly |
| Margin Rules | Revenue Cloud + Flow | Automated floor/ceiling guardrails per product/region/channel. Escalation triggers | Zero deals below floor |
| Dynamic Pricing | Revenue Cloud + Agentforce | AI recommends optimal price per B2B opportunity. Auto-generates indexed contracts | B2B cycle 10 days → 2-3 days |
| Performance | CRM Analytics + Tableau | Daily realized margin dashboards. Automated alerts when margin drifts | Daily detection vs. monthly |

### Integration Layer — MuleSoft as the Pricing Data Bus

MuleSoft provides the real-time integration backbone connecting:
- SAP (cost of goods)
- Petrobras gate price API
- B3/Bloomberg (FX rates)
- SEFAZ (state tax engines)
- ANP (regulatory data)

All feeds converge in Data Cloud to create a single, continuously-updated cost-per-liter model.

## Agentforce Pricing Agents

### Agent 1: Cost Monitor Agent
- **Products:** Data Cloud + MuleSoft
- **Trigger:** Petrobras gate price change, BRL/USD movement >0.5%, biofuel spot price shift
- **Reasoning:** Calculates new landed cost per product/state within minutes of market move
- **Action:** Triggers pricing review alert with recommended new price bands + impact simulation
- **Value:** Eliminates the 24-48h blind spot where margin disappears

### Agent 2: Deal Margin Guardian
- **Products:** Revenue Cloud + Sales Cloud
- **Trigger:** Every B2B deal submitted for approval in Sales Cloud pipeline
- **Reasoning:** Validates margin against floor rules by product/region/channel/customer tier
- **Action:** Auto-approves deals within guardrails (80% of volume). Escalates exceptions with full context
- **Value:** Zero deals slip below floor margin. VP approves in minutes vs. days

### Agent 3: Competitive Response Agent
- **Products:** Tableau + Einstein AI
- **Trigger:** Regional price movements detected from ANP data + field intelligence
- **Reasoning:** Detects competitor undercuts in micro-regions. Correlates with account stickiness and renewal dates
- **Action:** Recommends targeted response (match, hold, or differentiate) with ROI simulation
- **Value:** Same-day competitive response vs. discovering damage in monthly P&L

### Agent Orchestration Flow

1. **MuleSoft** — Detects Petrobras gate price change (API polling every 5 min)
2. **Data Cloud** — Recalculates landed cost per product/state/tax regime instantly
3. **Agentforce (Cost Monitor)** — Generates new price bands + margin impact per customer tier
4. **Revenue Cloud** — Updates guardrails. Auto-adjusts indexed contracts. Flags at-risk deals
5. **Tableau** — Live margin dashboard reflects new position. Alerts pricing committee

## Fuel Mix & Margin Profiles

| Product | Margin Profile | Key Dynamic |
|---------|---------------|-------------|
| Gasoline C | R$0.08-0.12/L | Ethanol parity (70% rule) makes demand elastic daily |
| Diesel S10/S500 | R$0.10-0.18/L | Inelastic demand (freight must move). Margin via B2B contracts |
| Hydrated Ethanol | R$0.05-0.10/L | Seasonal (inter-safra drives scarcity). Price correlated to sugar |
| Biodiesel | Mandated blend | 15% mandatory. Margin captured at producer level |
| Aviation (QAV) | R$0.15-0.25/L | Highest margin. Concentrated buyers. Airport logistics = barrier |

## Salesforce Opportunity — Why We Win

| Differentiator | Salesforce Capability | Selling Angle |
|----------------|----------------------|---------------|
| Real-time data unification | Data Cloud + MuleSoft — single cost-per-liter model | "Show me your cost-per-liter right now, per state, per product." If they can't answer in <5 min, that's the gap |
| Guardrails without friction | Revenue Cloud CPQ enforces margin floors automatically | "How many deals last quarter were approved below your target margin?" |
| Speed-to-decision | Agentforce responds to market moves in minutes | "When Petrobras moved last Tuesday, how long until your pricing reflected it?" |
| Competitive intelligence | Tableau + Data Cloud ingest ANP data + competitor moves | "Are you losing dealers because a competitor dropped price 3 weeks ago and you didn't notice?" |
| Full audit + compliance | Every pricing decision logged, traceable, defensible | Post-Americanas scandal, every CFO wants pricing governance |

**Revenue Potential:** Multi-cloud deal: Revenue Cloud + Data Cloud + MuleSoft + Tableau + Agentforce. Average deal: $2-5M ARR for a major distributor.
