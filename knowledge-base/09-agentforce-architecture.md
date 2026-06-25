# Agentforce Architecture & Capabilities for Oil & Gas

## What is Agentforce

Agentforce is Salesforce's autonomous AI agent platform that enables businesses to deploy intelligent agents that operate 24/7 within business-defined guardrails. Unlike traditional automation (rules-based), Agentforce agents combine AI reasoning with real CRM data to make decisions, take actions, and escalate when outside their scope.

## How Agentforce Works — Four Components

1. **Trigger** — Event that initiates the agent (data change, timer, external input, user request)
2. **Reasoning** — Business logic the agent applies (rules + AI understanding of context)
3. **Action** — What the agent does (create record, send alert, escalate, approve, generate document)
4. **Guardrails** — Business-defined limits (never approve above X, always escalate Y, audit trail Z)

## Key Principles

- Agents operate within **business-defined guardrails** — not unlimited AI
- **Human-in-the-loop** for exceptions (escalation with full context)
- **Complete audit trail** of every decision made
- Uses **real CRM data** (no hallucination on non-existent data)
- **24/7 operation** for environments that never stop (offshore, logistics, trading)
- **Atlas Reasoning Engine** processes triggers, applies guardrails, executes within boundaries

## Why Agentforce Matters in Oil & Gas

Oil & Gas operations have unique characteristics that make autonomous agents especially valuable:

- **Pricing agents** respond to market moves in minutes vs. days
- **Offshore agents** operate when humans are sleeping or in rotation (14/14 or 21/21 schedules)
- **Compliance agents** track regulatory changes across ANP, IBAMA, ANTT 24/7
- **Logistics agents** predict issues before they become customer-impacting
- **Trading agents** monitor market signals across time zones continuously

## Complete Agent Inventory — Oil & Gas Brazil

### Downstream Pricing Agents (3)

| Agent | Trigger | Action | Products |
|-------|---------|--------|----------|
| Cost Monitor Agent | Petrobras gate price change, BRL/USD >0.5%, biofuel spot shift | Recalculates landed cost per product/state. Recommends new price bands | Data Cloud + MuleSoft |
| Deal Margin Guardian | Every B2B deal submitted for approval | Auto-approves 80% within guardrails. Escalates exceptions with context | Revenue Cloud + Sales Cloud |
| Competitive Response Agent | Regional price movements from ANP data | Recommends targeted response (match/hold/differentiate) with ROI simulation | Tableau + Einstein AI |

### Downstream Logistics Agents (2)

| Agent | Trigger | Action | Products |
|-------|---------|--------|----------|
| Predictive Delivery Agent | Tank telemetry drops below threshold | Predicts stockout 36-72h ahead. Auto-schedules delivery weighted by account value | Data Cloud + Field Service + Agentforce |
| Route Optimization Agent | Daily delivery schedule generation | Clusters nearby stations, considers compartments, driver hours, commercial priority | Field Service + Agentforce |

### Downstream Commercial Agents (3)

| Agent | Trigger | Action | Products |
|-------|---------|--------|----------|
| Churn Prevention Agent | Daily monitoring of 44,000 stations | Detects risk 60 days before unbrand. Triggers specific intervention | Data Cloud + Einstein + Sales Cloud |
| Opportunity Spotter Agent | Market signals (harvest, CAPEX, expansion) | Creates qualified leads with full context and demand sizing | Data Cloud + Sales Cloud |
| Deal Desk Agent | B2B proposal submitted | Reviews margin/credit/logistics feasibility. Auto-approves standard deals | Revenue Cloud + Flow |

### Upstream Agents (8)

| Agent | Trigger | Action | Products |
|-------|---------|--------|----------|
| Supplier Compliance Agent | FPSO contract award | Auto-maps local content requirements. Monitors vendor certifications | Service Cloud + Experience Cloud |
| Well Integrity Agent | Pressure/temperature anomalies | Classifies severity. Creates work orders. Escalates critical | Data Cloud + Service Cloud |
| Permit Tracker Agent | Daily scan of IBAMA/ANP portals | Escalates delays. Tracks compliance deadlines | Service Cloud + MuleSoft |
| HSE Investigation Agent | Incident reported | Classifies, assigns investigation team, suggests probable causes | Service Cloud |
| Crew Rotation Agent | Schedule change request | Maintains POB and competency compliance. Handles substitutions | Field Service |
| ESG Reporting Agent | Monthly trigger | Collects emissions data. Calculates carbon intensity. Generates reports | Data Cloud + Tableau |
| Gas Nomination Agent | 24/7 nomination receipt | Processes/confirms volumes. Validates against capacity/contracts | Revenue Cloud |
| Production Allocation Agent | Daily production data | Calculates JV partner shares. Generates statements. Reduces disputes 80% | Revenue Cloud + Data Cloud |

### Midstream Agents (5)

| Agent | Trigger | Action | Products |
|-------|---------|--------|----------|
| Pipeline Scheduling Agent | Nomination received | Optimizes batch sequencing. Minimizes product interfaces | Revenue Cloud + Data Cloud |
| Terminal Operations Agent | Ship arrival notification | Coordinates with tank availability. Manages loading schedules | Service Cloud + Field Service |
| Gas Processing Agent | Gas quality change detected | Adjusts processing specs. Ensures transport contract compliance | Data Cloud + MuleSoft |
| Imbalance Agent | Real-time balance update | Alerts on contractual limits. Suggests spot trades to reduce exposure | Revenue Cloud + Data Cloud |
| Market Signal Agent | Market data feeds | Aggregates indicators (Brent, cracks, FX). Alerts trading desk | Tableau + Data Cloud |

## Total Agent Count: 21 Autonomous Agents

- Downstream: 8 agents (Pricing: 3, Logistics: 2, Commercial: 3)
- Upstream: 8 agents
- Midstream: 5 agents

## Agentforce vs. Traditional Automation

| Dimension | Traditional (Flow/Rules) | Agentforce |
|-----------|-------------------------|------------|
| Decision complexity | If/then rules only | AI reasoning with context |
| Data sources | Single object/record | Cross-object, cross-system |
| Adaptability | Fixed logic, manual updates | Learns from patterns |
| Escalation | Binary (yes/no) | Contextual (with full analysis) |
| Coverage | Business hours dependent | 24/7/365 |
| Audit trail | Action log only | Reasoning + decision log |

## Architecture Pattern for O&G

```
External Data Sources (SCADA, IoT, Market Feeds, Regulatory Portals)
         ↓
    MuleSoft (Integration Bus)
         ↓
    Data Cloud (Unification + Intelligence)
         ↓
    Agentforce (Reasoning + Action)
         ↓
    Application Layer (Sales/Service/Revenue/Field Service Cloud)
         ↓
    Human Interface (Salesforce UI + Experience Cloud Portals + Alerts)
```

## Guardrail Examples in O&G

- **Pricing:** Never approve deal below X% floor margin without VP sign-off
- **HSE:** Always escalate incidents classified above severity 3 to HSE Director
- **Credit:** Never extend credit above R$Y without CFO approval
- **Compliance:** Always generate audit record for any regulatory interaction
- **Production:** Never modify allocation formula without all JV partner notification
- **Crew:** Never schedule rotation that violates minimum rest requirements (NR-37)

## Business Value Summary

| Vertical | Key Agent Value | Quantified Impact |
|----------|----------------|-------------------|
| Downstream Pricing | Sub-hour market response vs. 24-48h | R$50M+ annual margin protection |
| Downstream Logistics | Predictive delivery vs. reactive | -30% stockouts, -15% empty miles |
| Downstream Commercial | 60-day churn early warning | -50% dealer churn |
| Upstream Operations | 24/7 safety monitoring | Zero undetected anomalies |
| Upstream Compliance | Automated regulatory tracking | Zero missed deadlines |
| Midstream Trading | Real-time market intelligence | Reduced imbalance penalties |

## Salesforce Opportunity Sizing

| Vertical | Deal Size (ARR) | Cloud Mix |
|----------|----------------|-----------|
| Downstream Major Distributor | $2-5M | Revenue + Data + MuleSoft + Tableau + Agentforce |
| Upstream E&P Operator | $3-8M | Service + Data + Field Service + MuleSoft + Agentforce |
| Midstream Operator | $1.5-4M | Service + Revenue + Data + MuleSoft + Agentforce |
| Cross-Vertical (Full Platform) | $8-15M | All clouds + platform |
