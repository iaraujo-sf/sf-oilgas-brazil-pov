# Midstream Oil & Gas Brazil — Salesforce POV

## Industry Overview

Brazil's midstream sector connects upstream production to downstream distribution through a network of over 9,100 km of oil pipelines, 9,400 km of gas pipelines, and 35+ storage and regasification terminals. Operated primarily by Transpetro (a Petrobras subsidiary), the network handles crude oil transport from offshore platforms, natural gas processing, NGL fractionation, and LNG imports.

### Key Metrics
- **~9,100 km** of oil pipelines
- **~9,400 km** of gas pipelines
- **35+** terminal locations (storage and regasification)
- **Transpetro** dominant operator (Petrobras subsidiary)
- Growing independent midstream operators
- LNG regasification terminals expanding
- ANP mandates transparency and open access
- Typical Salesforce deal size: **$1.5-4M ARR**

## Midstream Segments

### Pipeline Operations
- Crude oil transport from offshore platforms to refineries
- Refined product pipelines (SE corridor primarily)
- Natural gas distribution network
- Batch sequencing and product interface management
- Integrity management and predictive maintenance

### Terminal Operations
- Storage terminals for crude and refined products
- Import/export terminals for international trade
- LNG regasification (Guanabara Bay, Pecém, Bahia)
- Ship-to-terminal coordination and berth scheduling
- Tank farm management and product quality assurance

### Gas Processing
- Natural gas treatment (CO2, H2S removal)
- NGL fractionation (propane, butane, naphtha)
- Gas quality specification management
- Processing plant capacity optimization
- Wellstream composition handling

### Trading & Balancing
- Natural gas nomination management
- Capacity contracts and tolling agreements
- Imbalance management and penalty avoidance
- Spot market trading for excess capacity
- Cross-border gas trade (Bolivia pipeline)

## Salesforce Solutions for Midstream

| Product | Use Case |
|---------|----------|
| Service Cloud | Terminal operations, pipeline maintenance scheduling |
| Revenue Cloud | Capacity contracts, nomination management |
| Data Cloud (360) | Real-time pipeline flow data, gas quality monitoring |
| MuleSoft | Integration with SCADA, CTRM systems, exchanges |
| Agentforce | 5 autonomous agents (see below) |
| Tableau | Flow monitoring, capacity utilization, trading dashboards |

## Five Autonomous Agents for Midstream

### 1. Pipeline Scheduling Agent
- Manages nominations from multiple shippers
- Optimizes batch sequencing to minimize product interfaces
- Handles priority allocation during capacity constraints
- Generates scheduling reports for regulatory compliance

### 2. Terminal Operations Agent
- Coordinates ship arrival with tank availability
- Manages loading/unloading schedules
- Optimizes tank utilization across product grades
- Handles berth scheduling and conflict resolution

### 3. Gas Processing Agent
- Monitors incoming gas quality specifications
- Adjusts processing parameters for specification compliance
- Ensures transport contract quality requirements are met
- Alerts operators when gas composition changes significantly

### 4. Imbalance Agent
- Real-time balance monitoring across all shipper accounts
- Alerts when approaching contractual tolerance limits
- Suggests spot trades to reduce imbalance exposure
- Calculates penalty exposure and recommends avoidance strategies

### 5. Market Signal Agent
- Aggregates market indicators (Brent, crack spreads, FX)
- Monitors natural gas spot prices and forward curves
- Alerts trading desk to arbitrage opportunities
- Tracks regulatory changes affecting market structure

## Key Industry Challenges

### Open Access Regulation
- ANP mandates non-discriminatory access to pipelines and terminals
- Capacity allocation must be transparent
- Tariff setting subject to regulatory approval
- Third-party access requests must be processed within defined timelines

### Infrastructure Expansion
- Growing production requiring new pipeline capacity
- LNG import infrastructure expanding to meet gas demand
- New regasification terminals under development
- Private investment increasing in terminal operations

### Gas Market Reform
- "New Gas Market" regulation promoting competition
- Unbundling of transport from commercialization
- Independent system operator models being discussed
- Growing number of gas traders and marketers

## Salesforce Value Proposition for Midstream

### Operational Excellence
- SCADA integration for real-time flow monitoring
- Predictive maintenance for pipeline integrity
- Terminal scheduling optimization
- Crew and contractor management

### Commercial Operations
- Capacity contract management (nominations, schedules, balances)
- Shipper relationship management
- Tariff calculation and billing
- Imbalance settlement automation

### Trading Support
- Market data integration and dashboards
- Position management and P&L tracking
- Counterparty relationship management
- Regulatory reporting and compliance

### Asset Management
- Pipeline integrity management programs
- Corrosion monitoring and inspection scheduling
- Equipment lifecycle management
- Decommissioning planning and tracking
