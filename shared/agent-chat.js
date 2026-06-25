/**
 * Agentforce POV Chat Widget — Cross-Vertical Oil & Gas Assistant
 * Embeds in any POV page via <script src="../shared/agent-chat.js"></script>
 *
 * Connects to real Agentforce agent via local proxy (node shared/agent-proxy.js).
 * Falls back to local knowledge base when proxy is unavailable.
 */
(function() {
  'use strict';

  const AGENT_NAME = 'Agentforce';
  const IS_REMOTE = window.location.protocol === 'https:';
  const PROXY_URL = 'http://localhost:3001';
  let proxyAvailable = false;
  let clientId = null;

  const AVATAR_PATH = (document.querySelector('meta[name="agent-avatar"]') || {}).content
    || (window.location.pathname.includes('/downstream/') || window.location.pathname.includes('/upstream/') || window.location.pathname.includes('/midstream/')
        ? '../assets/agentforce-avatar.png'
        : 'assets/agentforce-avatar.png');

  async function checkProxy() {
    if (IS_REMOTE) {
      proxyAvailable = false;
      return;
    }
    try {
      const res = await fetch(PROXY_URL + '/health', { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        proxyAvailable = true;
        const session = await fetch(PROXY_URL + '/session', { method: 'POST' });
        const data = await session.json();
        clientId = data.clientId;
        console.log('[Agentforce] Connected to live agent via local proxy');
      }
    } catch {
      proxyAvailable = false;
    }
  }

  async function askAgent(message) {
    if (!proxyAvailable) return null;
    try {
      const res = await fetch(PROXY_URL + '/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, message })
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.fallback) return null;
      return data.reply || null;
    } catch {
      return null;
    }
  }

  checkProxy();

  const KNOWLEDGE_BASE = {
    downstream: {
      pricing: {
        keywords: ['pricing','price','margin','petrobras','deal','contract','indexation','cost monitor','guardian'],
        link: '../downstream/',
        content: `In Downstream, Salesforce operates with 3 autonomous pricing agents:

**1. Cost Monitor Agent** — Monitors Petrobras price movements, BRL/USD exchange rates, and biofuels. When it detects a >0.5% shift, it recalculates landed cost per product/state in minutes and alerts the commercial team with recommended price bands.

**2. Deal Margin Guardian** — Validates every B2B deal against margin rules by product/region/channel/tier. Auto-approves 80% of deals within guardrails and escalates exceptions with full analysis to the VP.

**3. Competitive Response Agent** — Detects regional price movements via ANP data + field intelligence. Recommends competitive response (match, hold, or differentiate) with ROI simulation.

**Stack:** Revenue Cloud + Data Cloud + MuleSoft + Tableau + Agentforce
**Typical Deal Size:** $2-5M ARR for major distributors`
      },
      logistics: {
        keywords: ['logistics','delivery','route','fleet','stockout','field service','TMS','transport'],
        link: '../downstream/',
        content: `Logistics in Brazil accounts for 8-12% of total fuel cost. 1% efficiency gain = R$500M+ in savings.

**Logistics Agents:**
- **Predictive Delivery Agent** — Uses IoT + Data Cloud to predict stockout 36-72h in advance. Proactively schedules delivery before the station calls.
- **Route Optimization Agent** — Optimizes routes considering commercial priority + tank urgency + truck compartments + driver hours + ANTT regulation.
- **Delivery Reconciliation Agent** — Field Service mobile captures volumetric data, GPS, photos, and signature. Eliminates disputes and freight auditing.

**Stack:** Field Service + Data Cloud (IoT) + Experience Cloud + Agentforce + MuleSoft
**Deal Size:** $1.5-4M ARR`
      },
      commercial: {
        keywords: ['commercial','sales','dealer','channel','b2b','crm','loyalty'],
        link: '../downstream/',
        content: `In downstream, the CRM goes beyond sales pipeline — it's the nerve center of dealer and B2B customer relationships.

**Agentforce Scenarios:**
- **Dealer Health Agent** — Monitors dealer health indicators (volume, margin, satisfaction, NPS). Alerts when churn score rises and suggests preventive action.
- **Contract Renewal Agent** — 90 days before expiration, prepares renewal proposal with optimized conditions based on dealer history.
- **Volume Forecast Agent** — Analyzes seasonal patterns + regional events + macro forecasts to project demand per station/region.

**Salesforce Differentiator:** Connecting commercial data (Sales Cloud) with field execution (Field Service) + intelligent pricing (Revenue Cloud).`
      }
    },
    upstream: {
      operations: {
        keywords: ['upstream','E&P','FPSO','offshore','platform','well','production','integrity'],
        link: '../upstream/',
        content: `In Upstream, Agentforce operates 24/7 in offshore environments where operations never stop:

**Operational Agents:**
- **Well Integrity Agent** — Detects anomalies in pressure/temperature sensors, cross-references with well history, classifies severity, creates work orders, and notifies the offshore superintendent.
- **Production Allocation Agent** — Daily calculation of each JV partner's share, reconciles against fiscal metering, prepares statements, and flags discrepancies. Reduces disputes by 80%.
- **Gas Nomination Agent** — Processes nominations 24/7, validates against contracted capacity, confirms scheduling with the transporter.

**Numbers:** 84 E&P groups, 50+ active platforms, 10K+ data points/day per platform.`
      },
      compliance: {
        keywords: ['compliance','regulatory','ANP','IBAMA','local content','supplier','permit','license','HSE','safety'],
        link: '../upstream/',
        content: `Compliance in the Brazilian upstream is complex and critical:

**Compliance Agents:**
- **Supplier Compliance Agent** — When a new FPSO contract is awarded, auto-maps local content requirements, identifies qualified Brazilian suppliers, sends onboarding invitations, and monitors certification expiry.
- **Permit Tracker Agent** — Daily scan of IBAMA/ANP portals, compares with project timeline, escalates if delays detected, prepares response documents.
- **HSE Investigation Agent** — Classifies incident severity, assigns investigation team, searches historical similar incidents, and suggests probable causes from the knowledge base.

**Result:** Compliance starts day-1, audit risk reduced by 60%.`
      },
      workforce: {
        keywords: ['crew','rotation','workforce','competency','offshore workers','POB','schedule'],
        link: '../upstream/',
        content: `Offshore crew management is a unique challenge:

**Crew Rotation Agent** — When a crew member requests a swap or a medical flag is raised:
1. Verifies competency requirements for the role
2. Identifies available substitutes
3. Validates that certifications are current
4. Proposes swap to the supervisor

**Context:** POB (Persons On Board) and competency compliance must be maintained 100% of the time. Each platform operates with ~150-300 people on rotation (14x14 or 21x21 day schedules).

**Stack:** Service Cloud + Experience Cloud + Agentforce + MuleSoft (integration with training/certification systems)`
      }
    },
    midstream: {
      pipeline: {
        keywords: ['midstream','pipeline','transport','gas','nomination','scheduling','capacity','terminal'],
        link: '../midstream/',
        content: `Midstream connects production to distribution — pipelines, terminals, gas processing:

**Agentforce Scenarios for Midstream:**
- **Pipeline Scheduling Agent** — Manages capacity nominations, optimizes batch sequencing, minimizes product interface in the pipeline.
- **Terminal Operations Agent** — Coordinates ship arrival, tank availability, and loading schedules. Integrates with Port Authority and shipper systems.
- **Gas Processing Agent** — Monitors natural gas quality, adjusts processing specifications, ensures compliance with transport contracts.

**Brazil Challenge:** ~7,500 km of gas pipelines + terminals in 40+ locations. ANP regulation mandates transparency and open access.`
      },
      trading: {
        keywords: ['trading','trading desk','commodity','spot','hedge','balancing','imbalance'],
        link: '../midstream/',
        content: `Trading and balancing in midstream:

**Scenarios:**
- **Imbalance Agent** — Monitors balance position in real time, alerts when approaching contractual limits, suggests spot trades to rebalance.
- **Market Signal Agent** — Aggregates market indicators (Brent, crack spreads, FX, inventories), generates alerts for the trading desk when conditions hit predefined thresholds.

**Integration:** MuleSoft connects with CTRM (Commodity Trading & Risk Management) systems + exchanges + clearinghouses.`
      }
    },
    general: {
      salesforce: {
        keywords: ['salesforce','platform','cloud','product','stack','architecture'],
        link: null,
        content: `The Salesforce platform for Oil & Gas combines:

**Core Clouds:**
- **Sales Cloud** — Pipeline management, account planning, dealer relationships
- **Service Cloud** — Case management, field operations, HSE tracking
- **Revenue Cloud** — CPQ, indexed contracts, pricing engine
- **Data Cloud** — Unified data platform, IoT ingestion, AI/ML models
- **Field Service** — Scheduling, mobile workforce, delivery management
- **Experience Cloud** — Portals for dealers, suppliers, JV partners
- **Tableau** — Analytics, dashboards, embedded intelligence
- **MuleSoft** — Integration platform, API management
- **Agentforce** — Autonomous AI agents with guardrails

**Differentiator:** No other CRM platform offers this breadth + depth + native AI on a single platform.`
      },
      agentforce: {
        keywords: ['agentforce','what is','how does','autonomous','guardrail','agent','ai agent'],
        link: null,
        content: `**Agentforce** is Salesforce's autonomous AI agent platform:

**How it works:**
1. **Trigger** — Event that initiates the agent (data change, timer, external input)
2. **Reasoning** — Business logic the agent applies (rules + AI)
3. **Action** — What the agent does (create record, send alert, escalate, approve)
4. **Guardrails** — Business-defined limits (never approve above X, always escalate Y)

**Principles:**
- Operate within business-defined guardrails
- Escalate when out of scope (human-in-the-loop)
- Complete audit trail of every decision
- Use real CRM data (no hallucination on non-existent data)

**In Oil & Gas:** Agents operate 24/7 in scenarios where seconds matter (offshore safety, market moves, logistics). Humans define rules and handle exceptions — agents execute at volume.`
      },
      brazil: {
        keywords: ['brazil','market','ANP','regulation','petrobras','distribution','opportunity'],
        link: null,
        content: `The Oil & Gas market in Brazil:

**Structure:**
- **Upstream:** Dominated by Petrobras (pre-salt) + 84 E&P groups + 134,824 regulated agents
- **Midstream:** Transpetro (pipelines) + independent distributors + terminals
- **Downstream:** Top 5 distributors (Vibra, Ipiranga, Raizen, Alesat, Taurus) + 42,000+ stations

**Regulation:** ANP (National Petroleum Agency) regulates the entire chain.

**Salesforce Opportunity:**
- Downstream: $2-5M ARR per major distributor (pricing + logistics + dealer management)
- Upstream: $3-8M ARR per E&P operator (compliance + operations + workforce)
- Midstream: $1.5-4M ARR (pipeline scheduling + trading + terminal ops)

**Total addressable:** 84 E&P groups + ~10 mid/downstream majors = significant opportunity.`
      }
    }
  };

  const PAGE_BASE = window.location.pathname.includes('/downstream/') || window.location.pathname.includes('/upstream/') || window.location.pathname.includes('/midstream/')
    ? '../' : '';

  const PAGE_INDEX = [
    { keywords: ['pre-salt','pre salt','pré-sal','presal','santos basin','buzios','tupi','lula field'], page: 'upstream/', anchor: '#pre-salt', title: 'Pre-Salt Deep Dive', summary: 'Brazil\'s pre-salt reserves are among the largest deep-water discoveries in history. Located 5-7km below the ocean floor under a thick salt layer, these fields (Santos & Campos basins) produce 70%+ of Brazil\'s oil. Key fields: Búzios, Tupi/Lula, Mero, Sépia.' },
    { keywords: ['fpso','floating production','turret','hull','topside'], page: 'upstream/', anchor: '#fpso', title: 'FPSO Fleet & Operations', summary: 'Brazil operates the world\'s largest FPSO fleet with 50+ units. Each FPSO processes 150-200k bbl/day. Petrobras plans 14 new FPSOs through 2028. Key challenges: local content requirements, maintenance cycles, and workforce management.' },
    { keywords: ['production','barrels','bpd','output','record','million barrels'], page: 'upstream/', anchor: '#production', title: 'Production Records', summary: 'Brazil produces 4+ million barrels of oil equivalent per day (2024 record). Growth driven by pre-salt ramp-up. Target: 5.4M boe/d by 2029 (Petrobras Strategic Plan).' },
    { keywords: ['reserves','sedimentary','basin','campos basin','equatorial margin','exploration'], page: 'upstream/', anchor: '#reserves', title: 'Reserves & Sedimentary Basins', summary: 'Brazil has ~15 billion barrels of proven reserves across multiple sedimentary basins. Key producing basins: Santos, Campos. Frontier: Equatorial Margin (Foz do Amazonas), Pelotas.' },
    { keywords: ['investment','capex','spending','billions'], page: 'upstream/', anchor: '#investments', title: 'Investment & CAPEX', summary: 'Petrobras alone plans $102B in CAPEX (2024-2028). Private operators investing $30B+. Focus: pre-salt expansion, FPSO construction, and decommissioning.' },
    { keywords: ['licensing','bid round','auction','leilão','concession','sharing'], page: 'upstream/', anchor: '#licensing', title: 'Licensing & Bid Rounds', summary: 'ANP conducts regular bid rounds for E&P blocks under concession and production-sharing regimes. Recent rounds attract Shell, TotalEnergies, Equinor, and Chinese NOCs.' },
    { keywords: ['operator','petrobras','shell','total','equinor','private'], page: 'upstream/', anchor: '#operators', title: 'Operators & Key Players', summary: '84 E&P groups operate in Brazil. Petrobras dominates (75%+ of production) but private sector growing fast. Key IOCs: Shell, TotalEnergies, Equinor, Repsol, Galp.' },
    { keywords: ['regulatory','regulation','anp regulation','ibama','environmental','permit'], page: 'upstream/', anchor: '#regulatory', title: 'Regulatory Framework', summary: 'ANP regulates E&P, IBAMA handles environmental licensing, ANM for mining. Complex permitting process: EIA/RIMA required for all offshore operations.' },
    { keywords: ['carbon','emission','esg','sustainability','intensity','net zero','climate'], page: 'upstream/', anchor: '#carbon', title: 'Carbon & ESG Performance', summary: 'Brazil\'s pre-salt has one of the lowest carbon intensities globally (avg 10 kgCO2/boe vs. 18 world average). ESG reporting increasingly required by investors.' },
    { keywords: ['ccus','hydrogen','energy transition','ccs','carbon capture','green hydrogen'], page: 'upstream/', anchor: '#transition', title: 'CCUS & Hydrogen', summary: 'Brazil advancing CCUS with Petrobras leading Santos Basin CO2 reinjection (10M+ tonnes). Green hydrogen pilots in Ceará, Bahia. Fuel of the Future Law (14,993/2024) sets framework.' },
    { keywords: ['challenge','pain point','digital transformation','legacy'], page: 'upstream/', anchor: '#challenges', title: 'Industry Challenges', summary: 'Key upstream challenges: aging infrastructure, talent shortage, regulatory complexity, data silos across operations, and decommissioning costs.' },
    { keywords: ['use case','business process','supply chain','procurement','asset'], page: 'upstream/', anchor: '#use-cases', title: 'Use Cases & Business Processes', summary: '8 core upstream use cases: Stakeholder Management, Supply Chain, Asset Optimization, HSE & Compliance, Workforce Management, Licensing & Permitting, ESG Reporting, Gas Commercialization.' },
    { keywords: ['history','timeline','discovery','70 years','petrobras history'], page: 'upstream/', anchor: '#history', title: 'Historical Timeline', summary: 'From Petrobras founding (1953) to 4M+ bpd today — 70 years of technological achievement in deep-water E&P.' },
    { keywords: ['architecture','enterprise','platform','integration','mulesoft','data flow'], page: 'upstream/', anchor: '#architecture', title: 'Enterprise Architecture Vision', summary: 'Layered architecture for upstream digital platform: Data Layer (IoT/SCADA), Integration (MuleSoft), Platform (Salesforce), Intelligence (AI/Agentforce).' },
    { keywords: ['discovery','qualification','meddpicc','ae questions','se questions'], page: 'upstream/', anchor: '#discovery', title: 'Discovery & Qualification Guide', summary: 'MEDDPICC framework adapted for upstream: qualifying questions for AE, technical discovery for SE, platform conversation for EA.' },
    { keywords: ['biofuel','ethanol','biodiesel','renovabio','cbio','mandate'], page: 'downstream/', anchor: '#sec-biofuels', title: 'Biofuels & Ethanol Market', summary: 'Brazil is the world\'s #2 ethanol producer. Mandatory blends: 27% ethanol in gasoline, 14% biodiesel in diesel. RenovaBio carbon credit program (CBIOs) drives compliance.' },
    { keywords: ['market overview','fuel market','value chain','distributor','vibra','ipiranga','raizen'], page: 'downstream/', anchor: '#sec-market-overview', title: 'Brazilian Fuel Market Overview', summary: 'R$700B+ annual market. Top 5 distributors: Vibra, Ipiranga, Raízen, Alesat, Taurus. 42,000+ gas stations. 65% transported by tanker truck.' },
    { keywords: ['market size','growth','consumption','fuel demand'], page: 'downstream/', anchor: '#sec-market-size', title: 'Market Size & Growth', summary: 'Fuel consumption growing 3-5% annually. 215 billion liters/year. Gasoline and diesel dominant, ethanol growing fastest.' },
    { keywords: ['transport','fleet','vehicle','ev','electrification','highway'], page: 'downstream/', anchor: '#sec-transport-trends', title: 'Transportation Trends', summary: 'Brazil\'s vehicle fleet: 115M+ units, growing 3%/year. Highway-dependent logistics (60% of freight). EV penetration <2% — minimal disruption to fuel demand through 2035.' },
    { keywords: ['refinery','refining','capacity','petrobras refinery','rlam','replan'], page: 'downstream/', anchor: '#sec-refineries', title: 'Refineries & Capacity', summary: 'Brazil has 18 refineries (2.4M bpd total capacity). Petrobras operates 11. Utilization ~85%. Import dependence for diesel (~25% imported).' },
    { keywords: ['import','dependence','diesel import','gasoline import'], page: 'downstream/', anchor: '#sec-imports', title: 'Import Dependence', summary: 'Brazil imports ~25% of diesel and ~10% of gasoline consumed. Creates pricing complexity tied to international markets + FX.' },
    { keywords: ['consolidation','m&a','acquisition','alesat','taurus'], page: 'downstream/', anchor: '#sec-consolidation', title: 'Market Consolidation', summary: 'Downstream undergoing consolidation. Top 3 hold 65%+ market share. Mid-tier players (Alesat, Taurus) growing through acquisitions.' },
    { keywords: ['data cloud','360','iot','unified data','customer 360'], page: 'downstream/', anchor: '#sec-arch-datacloud', title: 'Data Cloud Architecture', summary: 'Data Cloud unifies IoT telemetry, CRM data, and external feeds into a single platform. Enables real-time tank monitoring, predictive analytics, and AI-driven decisions.' },
    { keywords: ['impact','roi','value','business case','savings'], page: 'downstream/', anchor: '#sec-impact', title: 'Business Impact & ROI', summary: 'Projected impact: 15-25% faster pricing response, 8-12% logistics cost reduction, 30% fewer stockouts, 2x dealer engagement.' },
    { keywords: ['why salesforce','compete','sap','oracle','objection'], page: 'downstream/', anchor: '#sec-why-sf', title: 'Why Salesforce', summary: 'Salesforce vs. SAP/Oracle: breadth of customer engagement + native AI + single platform advantage. SAP strong in ERP but weak in CX. No CRM competitor in O&G-specific workflows.' },
    { keywords: ['pipeline','midstream pipeline','duto','gasoduto','transpetro','scheduling'], page: 'midstream/', anchor: '', title: 'Midstream Pipeline Operations', summary: '~7,500 km of gas pipelines in Brazil. Transpetro dominant operator. ANP mandates open access and transparency. Growing LNG regasification capacity.' },
    { keywords: ['terminal','port','loading','ship','vessel','storage','tank farm'], page: 'midstream/', anchor: '', title: 'Terminal Operations', summary: '40+ terminal locations across Brazil. Coordinate ship arrival, tank availability, and loading schedules. Integration with Port Authority systems.' },
    { keywords: ['lng','regasification','natural gas','gas market','gas processing'], page: 'midstream/', anchor: '', title: 'LNG & Gas Processing', summary: 'Brazil expanding LNG regasification capacity. Natural gas demand growing with thermal power plants and industrial use. Gas processing plants ensure transport-quality specs.' },
  ];

  function findBestMatch(query) {
    const q = query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let bestScore = 0;
    let bestContent = null;
    let bestLink = null;

    for (const vertical of Object.values(KNOWLEDGE_BASE)) {
      for (const topic of Object.values(vertical)) {
        let score = 0;
        for (const kw of topic.keywords) {
          const normalizedKw = kw.normalize('NFD').replace(/[̀-ͯ]/g, '');
          if (q.includes(normalizedKw)) {
            score += normalizedKw.length;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestContent = topic.content;
          bestLink = topic.link || null;
        }
      }
    }

    let bestPageScore = 0;
    let bestPage = null;
    for (const entry of PAGE_INDEX) {
      let score = 0;
      for (const kw of entry.keywords) {
        const normalizedKw = kw.normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (q.includes(normalizedKw)) {
          score += normalizedKw.length;
        }
      }
      if (score > bestPageScore) {
        bestPageScore = score;
        bestPage = entry;
      }
    }

    if (bestPage && bestPageScore >= bestScore) {
      const link = PAGE_BASE + bestPage.page + bestPage.anchor;
      const content = bestContent && bestScore > 0
        ? bestContent + `\n\n📄 **[${bestPage.title} →](${link})**`
        : `**${bestPage.title}**\n\n${bestPage.summary}\n\n📄 **[Read the full section →](${link})**`;
      return content;
    }

    if (bestContent && bestLink) {
      const resolvedLink = PAGE_BASE + bestLink.replace('../', '');
      bestContent += `\n\n📄 **[Learn more →](${resolvedLink})**`;
    }
    return bestContent;
  }

  function respond(userMessage) {
    const match = findBestMatch(userMessage);
    if (match) return match;

    const greetings = ['hello','hi','hey','good morning','good afternoon','good evening'];
    if (greetings.some(g => userMessage.toLowerCase().includes(g))) {
      return `Hello! I'm the Agentforce assistant for Oil & Gas Brazil. I can help you with:

• **Downstream** — Dynamic pricing, logistics, dealer management
• **Upstream** — Offshore operations, compliance, workforce
• **Midstream** — Pipelines, terminals, trading

What would you like to know more about?`;
    }

    return `I can help you with Salesforce for Oil & Gas across three verticals:

• **Pricing & Commercial** — "How does the Cost Monitor Agent work?"
• **Logistics** — "How to prevent stockouts?"
• **Upstream Operations** — "Well Integrity Agent"
• **Compliance** — "How does the Permit Tracker work?"
• **Midstream** — "Pipeline scheduling"
• **Agentforce** — "What is it and how does it work?"

Try asking about any of these topics!`;
  }

  function createWidget() {
    const style = document.createElement('style');
    style.textContent = `
      .af-chat-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #006272 0%, #004d5a 100%);
        border: 2px solid rgba(94,234,212,0.3);
        box-shadow: 0 4px 24px rgba(0,98,114,0.4), 0 0 0 0 rgba(94,234,212,0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: transform 0.2s, box-shadow 0.2s;
        animation: af-pulse 2s infinite;
      }
      .af-chat-fab:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 32px rgba(0,98,114,0.5), 0 0 0 4px rgba(94,234,212,0.2);
      }
      .af-chat-fab img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      .af-chat-fab.af-hidden { display: none; }

      @keyframes af-pulse {
        0%, 100% { box-shadow: 0 4px 24px rgba(0,98,114,0.4), 0 0 0 0 rgba(94,234,212,0.4); }
        50% { box-shadow: 0 4px 24px rgba(0,98,114,0.4), 0 0 0 8px rgba(94,234,212,0); }
      }

      .af-chat-panel {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 380px;
        max-width: calc(100vw - 48px);
        height: 520px;
        max-height: calc(100vh - 48px);
        border-radius: 16px;
        background: #0a1628;
        border: 1px solid rgba(94,234,212,0.15);
        box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 1px rgba(94,234,212,0.3);
        display: flex;
        flex-direction: column;
        z-index: 10001;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .af-chat-panel.af-open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .af-chat-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        background: linear-gradient(135deg, #006272 0%, #004d5a 100%);
        border-bottom: 1px solid rgba(94,234,212,0.2);
      }
      .af-chat-header img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
        border: 1.5px solid rgba(94,234,212,0.4);
      }
      .af-chat-header-info {
        flex: 1;
      }
      .af-chat-header-name {
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        font-family: 'SalesforceSans', -apple-system, sans-serif;
      }
      .af-chat-header-sub {
        font-size: 11px;
        color: rgba(255,255,255,0.6);
        font-family: 'SalesforceSans', -apple-system, sans-serif;
      }
      .af-chat-close {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: none;
        background: rgba(255,255,255,0.1);
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s;
      }
      .af-chat-close:hover { background: rgba(255,255,255,0.2); }

      .af-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-family: 'SalesforceSans', -apple-system, sans-serif;
      }
      .af-chat-messages::-webkit-scrollbar { width: 4px; }
      .af-chat-messages::-webkit-scrollbar-track { background: transparent; }
      .af-chat-messages::-webkit-scrollbar-thumb { background: rgba(94,234,212,0.2); border-radius: 2px; }

      .af-msg {
        max-width: 88%;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.5;
        color: #e2e8f0;
        animation: af-fadeIn 0.3s ease;
      }
      .af-msg-agent {
        align-self: flex-start;
        background: rgba(0,98,114,0.15);
        border: 1px solid rgba(94,234,212,0.12);
        border-top-left-radius: 4px;
      }
      .af-msg-user {
        align-self: flex-end;
        background: rgba(6,106,254,0.15);
        border: 1px solid rgba(6,106,254,0.2);
        border-top-right-radius: 4px;
        color: #bfdbfe;
      }
      .af-msg strong { color: #5eead4; }
      .af-msg-agent strong { color: #5eead4; }
      .af-msg-user strong { color: #93c5fd; }

      @keyframes af-fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .af-cursor {
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #5eead4;
        margin-left: 1px;
        vertical-align: text-bottom;
        animation: af-blink 0.6s infinite;
      }
      @keyframes af-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      .af-typing {
        align-self: flex-start;
        padding: 10px 14px;
        background: rgba(0,98,114,0.1);
        border: 1px solid rgba(94,234,212,0.08);
        border-radius: 12px;
        border-top-left-radius: 4px;
        display: flex;
        gap: 4px;
        align-items: center;
      }
      .af-typing-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #5eead4;
        opacity: 0.4;
        animation: af-bounce 1.4s infinite;
      }
      .af-typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .af-typing-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes af-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-4px); opacity: 1; }
      }

      .af-chat-input-area {
        padding: 12px 16px;
        border-top: 1px solid rgba(94,234,212,0.1);
        display: flex;
        gap: 8px;
        background: rgba(0,20,40,0.5);
      }
      .af-chat-input {
        flex: 1;
        padding: 10px 14px;
        border-radius: 20px;
        border: 1px solid rgba(94,234,212,0.15);
        background: rgba(0,30,60,0.6);
        color: #e2e8f0;
        font-size: 13px;
        font-family: 'SalesforceSans', -apple-system, sans-serif;
        outline: none;
        transition: border-color 0.2s;
      }
      .af-chat-input::placeholder { color: rgba(255,255,255,0.3); }
      .af-chat-input:focus { border-color: rgba(94,234,212,0.4); }
      .af-chat-send {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: #006272;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s, transform 0.1s;
      }
      .af-chat-send:hover { background: #007d8a; transform: scale(1.05); }
      .af-chat-send:active { transform: scale(0.95); }
      .af-chat-send svg { width: 16px; height: 16px; }

      .af-chip-row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        padding: 0 16px 12px;
      }
      .af-chip {
        padding: 5px 10px;
        border-radius: 12px;
        font-size: 11px;
        background: rgba(0,98,114,0.12);
        border: 1px solid rgba(94,234,212,0.15);
        color: #5eead4;
        cursor: pointer;
        transition: background 0.15s, border-color 0.15s;
        font-family: 'SalesforceSans', -apple-system, sans-serif;
      }
      .af-chip:hover {
        background: rgba(0,98,114,0.25);
        border-color: rgba(94,234,212,0.3);
      }

      @media (max-width: 480px) {
        .af-chat-panel {
          width: calc(100vw - 16px);
          height: calc(100vh - 80px);
          bottom: 8px;
          right: 8px;
          border-radius: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    const fab = document.createElement('div');
    fab.className = 'af-chat-fab';
    fab.innerHTML = `<img src="${AVATAR_PATH}" alt="${AGENT_NAME}">`;
    fab.title = 'Talk to Agentforce';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.className = 'af-chat-panel';
    panel.innerHTML = `
      <div class="af-chat-header">
        <img src="${AVATAR_PATH}" alt="${AGENT_NAME}">
        <div class="af-chat-header-info">
          <div class="af-chat-header-name">${AGENT_NAME} — Oil & Gas</div>
          <div class="af-chat-header-sub">Cross-vertical AI Assistant</div>
        </div>
        <button class="af-chat-close" aria-label="Close chat">×</button>
      </div>
      <div class="af-chat-messages" id="afMessages"></div>
      <div class="af-chip-row">
        <span class="af-chip" data-q="What is Agentforce?">What is Agentforce?</span>
        <span class="af-chip" data-q="How does the pricing agent work?">Pricing Agent</span>
        <span class="af-chip" data-q="Well Integrity Agent">Upstream Ops</span>
        <span class="af-chip" data-q="Pipeline scheduling in midstream">Midstream</span>
      </div>
      <div class="af-chat-input-area">
        <input class="af-chat-input" id="afInput" placeholder="Ask about Oil & Gas + Salesforce..." autocomplete="off">
        <button class="af-chat-send" id="afSend" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    const messages = panel.querySelector('#afMessages');
    const input = panel.querySelector('#afInput');
    const sendBtn = panel.querySelector('#afSend');
    const closeBtn = panel.querySelector('.af-chat-close');
    const chips = panel.querySelectorAll('.af-chip');

    function formatMarkdown(text) {
      return text
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#5eead4;text-decoration:underline;">$1</a>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    }

    function addMessage(text, isAgent) {
      const div = document.createElement('div');
      div.className = `af-msg ${isAgent ? 'af-msg-agent' : 'af-msg-user'}`;
      div.innerHTML = formatMarkdown(text);
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function streamMessage(text) {
      return new Promise((resolve) => {
        const div = document.createElement('div');
        div.className = 'af-msg af-msg-agent';
        div.innerHTML = '<span class="af-cursor"></span>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;

        const chars = text.split('');
        let i = 0;
        let buffer = '';
        const speed = Math.max(8, Math.min(20, 2000 / chars.length));

        function tick() {
          if (i >= chars.length) {
            div.innerHTML = formatMarkdown(text);
            messages.scrollTop = messages.scrollHeight;
            resolve();
            return;
          }
          const chunk = Math.min(i + (Math.random() < 0.3 ? 3 : 1), chars.length);
          buffer += chars.slice(i, chunk).join('');
          i = chunk;
          div.innerHTML = formatMarkdown(buffer) + '<span class="af-cursor"></span>';
          messages.scrollTop = messages.scrollHeight;
          setTimeout(tick, speed + (Math.random() * speed * 0.5));
        }
        tick();
      });
    }

    function showTyping() {
      const t = document.createElement('div');
      t.className = 'af-typing';
      t.id = 'afTyping';
      t.innerHTML = '<div class="af-typing-dot"></div><div class="af-typing-dot"></div><div class="af-typing-dot"></div>';
      messages.appendChild(t);
      messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
      const t = document.getElementById('afTyping');
      if (t) t.remove();
    }

    async function sendMessage(text) {
      if (!text.trim()) return;
      addMessage(text, false);
      input.value = '';
      showTyping();

      await new Promise(r => setTimeout(r, 300 + Math.random() * 400));
      hideTyping();
      const answer = respond(text) || 'I can help with Downstream, Upstream, Midstream, and Agentforce topics. Try asking about pricing, pre-salt, pipelines, or how agents work!';
      await streamMessage(answer);
    }

    fab.addEventListener('click', () => {
      panel.classList.add('af-open');
      fab.classList.add('af-hidden');
      input.focus();
      if (!messages.hasChildNodes()) {
        streamMessage(`Hello! I'm **Agentforce**, your AI assistant for Oil & Gas Brazil.\n\n🟢 **Powered by Salesforce Agentforce**\n\nI can explain how autonomous agents transform operations in **Downstream**, **Upstream**, and **Midstream** — and guide you to the right content. Try the chips below or ask your question!`);
      }
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.remove('af-open');
      fab.classList.remove('af-hidden');
    });

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage(input.value);
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        sendMessage(chip.dataset.q);
      });
    });

    // Activate the sidebar agent link if present
    const agentLink = document.getElementById('agentLink');
    if (agentLink) {
      agentLink.style.opacity = '1';
      agentLink.style.pointerEvents = 'auto';
      agentLink.style.color = '#5eead4';
      agentLink.textContent = '';
      agentLink.innerHTML = `<img src="${AVATAR_PATH}" width="20" height="20" style="border-radius:50%;object-fit:cover;" alt="Agentforce"> 🤖 Talk to our Agent`;
      agentLink.addEventListener('click', (e) => {
        e.preventDefault();
        panel.classList.add('af-open');
        fab.classList.add('af-hidden');
        input.focus();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
