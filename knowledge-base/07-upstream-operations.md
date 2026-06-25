# Upstream Oil & Gas Brazil — Salesforce POV

## Industry Overview

Brazil's upstream E&P (Exploration & Production) sector is dominated by pre-salt deepwater operations, making it one of the most technically complex and capital-intensive oil provinces in the world.

### Key Metrics
- **84** E&P economic groups operating in Brazil
- **134,824** regulated agents (ANP)
- **50+** active offshore platforms (mainly pre-salt)
- Petrobras dominates but private operators growing rapidly
- Each platform generates **10K+ data points/day**
- Crew operates **14x14 or 21x21** day rotation offshore
- Typical Salesforce deal size: **$3-8M ARR** for E&P operators

## Salesforce Solutions for Upstream

| Product | Use Case |
|---------|----------|
| Service Cloud | HSE tracking, incident management, work orders |
| Sales Cloud | Supplier relationship management, JV partner engagement |
| Data Cloud (360) | IoT sensor ingestion, predictive analytics |
| Field Service | Offshore crew management, maintenance scheduling |
| Experience Cloud | Supplier/partner portals, crew self-service |
| Agentforce | 8 autonomous agents (see below) |
| MuleSoft | Integration with SCADA, DCS, ANP/IBAMA portals |

## Eight Autonomous Agents for Upstream

### 1. Supplier Compliance Agent
- Auto-maps local content requirements on FPSO contract award
- Monitors vendor certifications and compliance deadlines
- Triggers renewal workflows 90 days before expiration

### 2. Well Integrity Agent
- Detects pressure/temperature anomalies from sensor data
- Classifies severity using historical patterns
- Creates work orders automatically for maintenance teams
- Escalates critical anomalies to operations manager immediately

### 3. Permit Tracker Agent
- Daily scan of IBAMA/ANP portals for permit status changes
- Escalates delays that could impact drilling schedules
- Tracks environmental compliance deadlines across all blocks

### 4. HSE Investigation Agent
- Classifies incidents by type, severity, and root cause category
- Assigns investigation teams based on expertise and availability
- Suggests probable causes based on historical incident database
- Ensures regulatory reporting deadlines are met

### 5. Crew Rotation Agent
- Manages schedule changes while maintaining POB (Personnel On Board) compliance
- Ensures competency requirements are met for each rotation
- Handles emergency substitutions maintaining certification coverage
- Integrates with travel logistics for helicopter/boat scheduling

### 6. ESG Reporting Agent
- Monthly emissions data collection from all platforms
- Carbon intensity calculation per barrel produced
- Generates investor-ready reports aligned with TCFD/SASB frameworks
- Tracks progress against Net Zero commitments

### 7. Gas Nomination Agent
- 24/7 volume nomination processing and confirmation
- Validates nominations against pipeline capacity and contracts
- Handles imbalance alerts and penalty avoidance
- Coordinates between multiple JV partners

### 8. Production Allocation Agent
- Daily JV partner share calculation based on production data
- Reduces allocation disputes by 80% through transparent methodology
- Automated statement generation for all consortium members
- Handles complex scenarios (commingled production, fiscal metering)

## Regulatory Environment

### ANP (Agência Nacional do Petróleo)
- Regulates entire E&P chain from exploration to production
- Manages bidding rounds for new blocks
- Enforces local content requirements
- Monitors production data and royalties

### IBAMA (Instituto Brasileiro do Meio Ambiente)
- Environmental licensing for all E&P activities
- EIA/RIMA requirements for new developments
- Oil spill response plan approval
- Decommissioning oversight

### Local Content Requirements
- Minimum Brazilian content mandatory in E&P contracts
- Percentages vary by contract vintage and activity type
- Non-compliance = financial penalties + contract risk
- Supplier qualification and tracking is operational challenge

## Pre-Salt Operations

Brazil's pre-salt basin is the crown jewel of the upstream sector:
- Located 5,000-7,000 meters below sea level
- Ultra-deepwater operations requiring specialized FPSOs
- High productivity wells (some exceeding 30,000 barrels/day)
- Complex reservoir management with CO2 injection
- Massive capital intensity ($2-4B per FPSO)

## Salesforce Value Proposition for Upstream

### Compliance & Governance
- Unified view of all regulatory obligations across ANP, IBAMA, ANTT
- Automated deadline tracking and escalation
- Audit trail for every compliance decision
- Supplier qualification and local content tracking

### Operations & Safety
- Real-time integration with SCADA/DCS systems via MuleSoft
- HSE case management with trend analysis
- Crew management with competency and certification tracking
- Predictive maintenance reducing unplanned downtime

### Partner & Stakeholder Management
- JV partner portal for production data transparency
- Supplier performance scoring and qualification
- Government/regulatory relationship tracking
- Community engagement management for social license

### Data & Intelligence
- IoT data ingestion from offshore sensors (10K+ data points/day/platform)
- Predictive analytics for equipment failure
- Production forecasting with AI models
- ESG metrics dashboards for investor reporting
