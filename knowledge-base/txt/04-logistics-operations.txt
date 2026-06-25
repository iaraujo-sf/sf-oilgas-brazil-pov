# Logistics Operations — Downstream Oil & Gas Brazil

## Why Logistics Matters in Brazil

Continental scale meets operational reality. Logistics cost = 8-12% of total fuel cost. 1% efficiency = R$500M+ industry savings. In a commodity market, delivery reliability is the last defensible differentiator.

### The Business Reality

| Factor | Business Impact | Scale |
|--------|----------------|-------|
| Continental Distances | Average delivery route: 300-800km. Multi-day routes in North/Midwest | São Paulo to Manaus: 3,900km. Industry moves ~400M km/year by truck |
| Road Dependency | 65% of fuel transported by tanker truck — highest-cost modal | R$15-20B annually in freight costs across industry |
| Infrastructure Gaps | Limited pipeline outside SE. Rail underinvested. River only in Amazon | North: Sabbá dominates via river fleet. Midwest: adds R$0.08-0.12/L |
| Fleet Complexity | Mix of owned, contracted, 3rd-party carriers. Compartmented trucks | Top 3: 3,000-5,000 truck equivalents each. Utilization below 70% |
| Stockout = Customer Loss | Station stockout loses customers permanently. 24h without diesel = fleet switch | Single stockout costs R$10-50K in lost volume + brand damage |

**The Logistics Paradox:** The cheapest delivery (optimize for cost) is rarely the smartest delivery (optimize for revenue protection). A R$500 saving on route consolidation means nothing if a high-value station runs dry and the dealer defects.

## Logistics Operating Model — Five Layers

1. **Network Design & Infrastructure:** Terminal location strategy, pipeline access contracts, import terminal capacity
2. **Primary Transport (Terminal-to-Base):** Pipeline scheduling, cabotage, rail movements, long-haul road transport
3. **Secondary Transport (Base-to-Station):** Route optimization, fleet mix allocation, compartment optimization
4. **Last-Mile Execution:** Delivery scheduling by tank levels, driver safety, proof of delivery, volume reconciliation
5. **Performance & Cost Management:** Cost per liter by route/modal/region, fleet utilization, SLA compliance, empty-mile reduction

## The Logistics Gap — Current State

| Layer | Current Reality | Risk |
|-------|----------------|------|
| Network Design | Annual planning cycle + static models | SUBOPTIMAL CAPEX |
| Primary Transport | TMS disconnected from commercial demand | EXCESS COST |
| Secondary Transport | Manual route planning + driver experience | COST LEAKAGE |
| Last-Mile Execution | Phone calls + driver judgment on sequence | STOCKOUT RISK |
| Cost Management | Monthly reports + manual freight audit | LATE VISIBILITY |

**Core Problem:** Logistics decisions are made independently from commercial priorities. The cheapest delivery may not serve the highest-value customer.

## Salesforce Solution Architecture for Logistics

### Value Metrics
- **97%+** Delivery SLA (from 85-90%)
- **-30%** Stockout Reduction (AI prediction eliminates reactive runs)
- **-15%** Empty Miles (AI-optimized routing clusters stations)
- **Real-time** Cost-per-Liter (automated freight audit)

### Technical Architecture

| Layer | Products | Capability | Impact |
|-------|----------|-----------|--------|
| Intelligence | Agentforce | Predictive delivery scheduling, route optimization, stockout prevention | Zero emergency runs |
| Execution | Field Service + Experience Cloud | Scheduling, dispatch, mobile execution, proof of delivery, dealer portal | 97%+ SLA |
| Data Foundation | Data Cloud + Tableau | Tank telemetry, fleet GPS, demand patterns, infrastructure capacity | Live visibility |
| Integration | MuleSoft | TMS, IoT platform, SAP MM/WM, carrier EDI, GPS trackers, SEFAZ NF-e | Unified data |

### Five Logistics Layers — Product Mapping

| Layer | Products | Business Capability | Impact |
|-------|----------|--------------------|----|
| Network Design | Tableau + Data Cloud | Demand heat maps + AI-driven capacity planning | Data-backed CAPEX decisions |
| Primary Transport | MuleSoft + Data Cloud | TMS integration + demand-triggered positioning | Eliminates over/under positioning |
| Secondary Transport | Field Service + Agentforce | AI-optimized routing based on tank telemetry + commercial priority | -15% empty miles, -25% emergency runs |
| Last-Mile | Field Service Mobile | Real-time tracking, automated PoD, volume reconciliation | 97%+ SLA compliance |
| Cost Management | Tableau + CRM Analytics | Cost-per-liter dashboards by route/region/customer | Real-time vs. monthly detection |

## Logistics as Retention — The Numbers

| Metric | Industry Average | Best-in-Class | Salesforce Target | Impact |
|--------|-----------------|---------------|-------------------|--------|
| Delivery SLA compliance | 85-88% | 92-94% | 97%+ | Each 1% = 200+ fewer stockouts/month |
| Empty miles (% of total km) | 22-28% | 15-18% | 12-14% | Each 1% reduction = R$150-200M/year savings |
| Delivery forecast accuracy | 65-70% (reactive) | 80-85% | 92%+ (IoT) | Fewer emergency runs (3x more expensive) |
| Dealer satisfaction (NPS) | 35-45 | 55-65 | 70+ | NPS >60 correlates with <3% annual churn |
| Delivery dispute resolution | 5-10 business days | 2-3 days | Same-day (digital PoD) | Faster payment = better working capital |

## Connected Intelligence — Predictive Logistics Scenario

### IoT Tank Telemetry → Autonomous Delivery Scheduling

1. **MuleSoft:** IoT sensor at station → tank drops below 40%. Telemetry streamed via integration hub
2. **Data Cloud:** Ingests telemetry + correlates with historical consumption, weather, local events
3. **Agentforce:** Predicts stockout in 36 hours. Evaluates priority based on margin contribution and churn risk
4. **Field Service:** Auto-schedules delivery. Optimizes route clustering. Assigns to available fleet
5. **Experience Cloud:** Dealer Portal notifies: "Delivery confirmed tomorrow 8-10am — 15,000L diesel + 8,000L gasoline"
6. **Tableau:** Updates cost-per-delivery and SLA metrics in real time

### Before vs. After

**Before (Reactive):**
- Station calls dispatcher when tank is low
- Dispatcher manually checks available trucks
- Route planned by driver experience
- No visibility into other stations on route
- Emergency runs at 2x cost when stockout imminent
- Monthly cost reconciliation in spreadsheet

**After (Predictive Connected):**
- AI predicts need 36h before station knows
- System auto-schedules based on fleet availability
- Route optimized for cluster efficiency
- Priority weighted by margin contribution + churn risk
- Zero emergency runs — always ahead of demand
- Real-time cost tracking per delivery, per liter, per route

## Salesforce Differentiator

Unlike standalone TMS/WMS tools, Salesforce Field Service + Data Cloud connects delivery decisions to commercial value. The system knows which station generates the most margin, which customer is at churn risk, and prioritizes accordingly — not just cheapest route.

### Why We Win

| Differentiator | Capability | Selling Angle |
|----------------|-----------|---------------|
| Commercial-aware delivery | Field Service scheduling weighted by account value from Sales Cloud | "When you had shortage, how did you decide who got fuel first?" |
| Predictive scheduling | Data Cloud IoT + Agentforce predicts stockout 36-72h ahead | "What if you delivered before the station knew they needed it?" |
| Proof of delivery | Field Service mobile captures volumetric data, GPS, photos | "How much do you lose annually in delivery disputes?" |
| Route intelligence | AI considers commercial priority + tank urgency + compartments + hours | "Your TMS optimizes for distance. We optimize for revenue-weighted delivery" |
| Dealer experience portal | Experience Cloud: real-time tracking, ETA updates, self-service | "Your dealers call 10x for 'where's my truck?'. That's a cost center we eliminate" |

**Revenue Potential:** Field Service + Data Cloud + Experience Cloud + Agentforce + MuleSoft. Average deal: $1.5-4M ARR. Natural expansion into service cases.

## MuleSoft Integration Layer

MuleSoft connects the physical and digital supply chain:
- TMS (route scheduling, freight costs)
- IoT/telemetry platforms (tank levels, GPS tracking)
- SAP MM/WM (inventory at terminals)
- ANP systems (nota fiscal eletrônica)
- Third-party carriers (EDI for contracted fleet)

This unified data bus enables Field Service and Agentforce to make decisions that were previously impossible due to fragmented data.
