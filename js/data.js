// Mock Intelligence Data for SIH Detective Tactical Platform

// Role Definitions
const ROLES = {
    CALL_OPERATOR: {
        id: "call_operator",
        title: "Call Center Operator",
        badge: "ROLE 1: CALL OPERATOR",
        icon: "📞",
        description: "Ingest Call Data Records (CDR), emergency logs & phone anomalies.",
        allowedViews: ["briefing", "profiles", "data", "subjects", "alerts"]
    },
    LOCATION_POLICE: {
        id: "location_police",
        title: "Location Field Police",
        badge: "ROLE 2: FIELD POLICE",
        icon: "📍",
        description: "Ingest ANPR vehicle sightings, checkpoint logs & GPS coordinates.",
        allowedViews: ["briefing", "profiles", "data", "timeline", "subjects"]
    },
    FIR_POLICE: {
        id: "fir_police",
        title: "FIR Crime Desk Police",
        badge: "ROLE 3: FIR POLICE",
        icon: "📁",
        description: "Register comprehensive FIR crime filings, suspect intake & evidence PDF dossiers.",
        allowedViews: ["briefing", "fir-form", "profiles", "cases", "subjects", "timeline", "alerts"]
    },
    HIGHER_AUTHORITY: {
        id: "higher_authority",
        title: "Agency Director / Higher Command",
        badge: "ROLE 4: COMMAND DIRECTOR [FULL ACCESS]",
        icon: "🎖️",
        description: "Full war room access to GNN Spy Flow graph, AI Engine & Audit Ledger.",
        allowedViews: ["briefing", "profiles", "fir-form", "alerts", "overview", "spy-flow", "cases", "subjects", "timeline", "ai-engine", "data", "audit"]
    }
};

let currentRole = ROLES.HIGHER_AUTHORITY;
let currentOfficerSession = { badge: "DIR-001", unit: "Central War Room" };

const mockCases = [
    {
        id: "FIR-2026-1104",
        title: "Cross-Community Association",
        description: "Investigation into structured financial anomalies crossing two distinct regional network communities.",
        status: "ACTIVE",
        date: "2026-08-12",
        entityCount: 34,
        relationshipCount: 102,
        priority: "High",
        pdfAttached: "FIR_1104_ChargeSheet_Signed.pdf"
    },
    {
        id: "FIR-2026-1048",
        title: "Coordinated Communication Pattern",
        description: "Pattern of synchronized burner phone registrations near key facilities.",
        status: "UNDER REVIEW",
        date: "2026-08-01",
        entityCount: 27,
        relationshipCount: 83,
        priority: "Medium",
        pdfAttached: null
    },
    {
        id: "FIR-2026-1023",
        title: "Organized Financial Activity",
        description: "Sequential cash transfers involving multiple dummy construction firms.",
        status: "ACTIVE",
        date: "2026-07-15",
        entityCount: 18,
        relationshipCount: 46,
        priority: "High",
        pdfAttached: "FIR_1023_Bank_Audit.pdf"
    }
];

const mockEntities = [
    {
        id: "PER-00421",
        name: "Rahul Sharma",
        type: "person",
        connections: 43,
        cases: 6,
        status: "flagged",
        importance: "High",
        community: "C-BRIDGE",
        metrics: { degreeCentrality: 0.72, betweenness: 0.91, pageRank: 0.84 },
        details: {
            "Known aliases": ["R. Sharma", "Rahul S."],
            "Related cases": ["FIR-2026-1104", "FIR-2026-1048"],
            "Location": "Sector 4, New Delhi",
            "Risk Score": "94 / 100",
            "Gang Affiliation": "Shadow Syndicate",
            "Vehicle Sightings": "MH12AB1234 (White SUV)",
            "Secret Notes": "Frequently changes burner SIM cards every Thursday."
        }
    },
    {
        id: "PER-00219",
        name: "Amit Patil",
        type: "person",
        connections: 31,
        cases: 4,
        status: "review",
        importance: "High",
        community: "C-01",
        metrics: { degreeCentrality: 0.86, betweenness: 0.45, pageRank: 0.71 },
        details: {
            "Known aliases": ["A. Patil"],
            "Related cases": ["FIR-2026-1104"],
            "Location": "Pune, Maharashtra",
            "Weapon Sightings": "Licensed 9mm Pistol"
        }
    },
    {
        id: "ORG-0091",
        name: "Apex Logistics",
        type: "organization",
        connections: 18,
        cases: 2,
        status: "normal",
        importance: "Medium",
        community: "C-04",
        metrics: { degreeCentrality: 0.52, betweenness: 0.21, pageRank: 0.79 },
        details: {
            "Registration": "REG-88192-DEL",
            "Related cases": ["FIR-2026-1023"],
            "Offshore Escrow": "Acct 4421-XX"
        }
    },
    {
        id: "VEH-1234",
        name: "MH12AB1234",
        type: "vehicle",
        connections: 12,
        cases: 3,
        status: "normal",
        importance: "Medium",
        community: "C-01",
        details: {
            "Make": "White SUV",
            "Registered To": "Apex Logistics"
        }
    },
    {
        id: "PHN-0987",
        name: "+91 98765 43210",
        type: "phone",
        connections: 22,
        cases: 5,
        status: "flagged",
        importance: "High",
        community: "C-BRIDGE",
        details: {
            "Carrier": "Airtel Delhi",
            "IMEI": "864920194810294"
        }
    },
    {
        id: "LOC-882",
        name: "Hinjewadi IT Junction",
        type: "location",
        connections: 45,
        cases: 8,
        status: "normal",
        importance: "Low",
        details: {
            "Coordinates": "18.5912° N, 73.7389° E",
            "District": "Pune Metro"
        }
    }
];

const mockAlerts = [
    {
        id: "ALT-001",
        title: "COMMUNICATION BURST",
        entityId: "PER-00421",
        entityName: "Rahul Sharma",
        description: "217 communications detected within an unusually short period of 15 minutes.",
        anomalyScore: 0.93,
        severity: "High",
        date: "2026-08-12T10:02:00Z",
        evidence: [
            "High network centrality spike (+340%)",
            "Cross-community bridge activation",
            "Unusual encrypted packet bursts"
        ],
        records: ["CDR-8821", "CDR-9124", "FIR-2026-1104"]
    },
    {
        id: "ALT-002",
        title: "CROSS-COMMUNITY CONNECTION",
        entityId: "PER-00672",
        entityName: "Vikram Malhotra",
        description: "Potential bridge between two isolated network communities detected.",
        anomalyScore: 0.88,
        severity: "Medium",
        date: "2026-08-11T14:30:00Z",
        evidence: ["Betweenness centrality spike"],
        records: ["FIR-2026-1048"]
    },
    {
        id: "ALT-003",
        title: "UNREGISTERED ASSET MOVEMENT",
        entityId: "VEH-1234",
        entityName: "MH12AB1234",
        description: "ANPR camera flagged vehicle near high-value secure checkpoint.",
        anomalyScore: 0.85,
        severity: "High",
        date: "2026-08-10T19:15:00Z",
        evidence: ["ANPR Match", "Geo-fence Breach"],
        records: ["CAM-9912", "FIR-2026-1023"]
    }
];

const mockTimeline = [
    {
        id: "TL-01",
        date: "2026-08-01 09:15 AM",
        title: "Burner Sim Registration",
        description: "Phone +91 98765 43210 activated using fake credentials at Lajpat Nagar kiosk.",
        entity: "Rahul Sharma (+91 98765 43210)",
        type: "COMMUNICATION",
        severity: "High"
    },
    {
        id: "TL-02",
        date: "2026-08-05 02:40 PM",
        title: "Logistics Vehicle Sighted",
        description: "Vehicle MH12AB1234 spotted on CCTV entering Hinjewadi IT Junction hub.",
        entity: "MH12AB1234",
        type: "SURVEILLANCE",
        severity: "Medium"
    },
    {
        id: "TL-03",
        date: "2026-08-08 11:10 AM",
        title: "Dummy Firm Cash Transfer",
        description: "Apex Logistics initiated wire transfer of ₹45,00,000 to offshore escrow.",
        entity: "Apex Logistics",
        type: "FINANCIAL",
        severity: "High"
    },
    {
        id: "TL-04",
        date: "2026-08-12 10:02 AM",
        title: "Encrypted Burst Signal",
        description: "217 call data records generated between primary suspects within 15 minutes.",
        entity: "Rahul Sharma & Amit Patil",
        type: "ALERT",
        severity: "High"
    }
];

const mockGraphElements = [
    // Nodes
    { data: { id: "PER-00421", label: "Rahul Sharma", type: "person", status: "flagged", importance: "High" } },
    { data: { id: "PER-00219", label: "Amit Patil", type: "person", status: "review", importance: "High" } },
    { data: { id: "ORG-0091", label: "Apex Logistics", type: "organization", status: "normal" } },
    { data: { id: "VEH-1234", label: "MH12AB1234", type: "vehicle", status: "normal" } },
    { data: { id: "PHN-0987", label: "+91 98765 43210", type: "phone", status: "flagged" } },
    { data: { id: "LOC-882", label: "Hinjewadi", type: "location", status: "normal" } },
    { data: { id: "CAS-1104", label: "FIR-2026-1104", type: "case", status: "normal" } },
    { data: { id: "PER-0081", label: "Vishal M.", type: "person", status: "normal" } },
    { data: { id: "ACC-552", label: "Acct 4421-XX", type: "bank_account", status: "review" } },

    // Directional Edges (Spy Flow arrows)
    { data: { id: "e1", source: "PER-00421", target: "PER-00219", relationship: "CALLS" } },
    { data: { id: "e2", source: "PER-00421", target: "PHN-0987", relationship: "USES" } },
    { data: { id: "e3", source: "PER-00421", target: "VEH-1234", relationship: "OWNS" } },
    { data: { id: "e4", source: "PER-00421", target: "LOC-882", relationship: "VISITED" } },
    { data: { id: "e5", source: "PER-00219", target: "ORG-0091", relationship: "WORKS_FOR" } },
    { data: { id: "e6", source: "ORG-0091", target: "VEH-1234", relationship: "REGISTERED_TO" } },
    { data: { id: "e7", source: "PER-00421", target: "CAS-1104", relationship: "MENTIONED_IN" } },
    { data: { id: "e8", source: "PER-00421", target: "PER-0081", relationship: "ASSOCIATED_WITH" } },
    { data: { id: "e9", source: "PER-0081", target: "ACC-552", relationship: "OWNS" } }
];
