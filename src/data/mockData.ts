import type { BaseEntity, GraphNode, GraphEdge, InvestigationCase, Alert } from "../types";

export const mockCases: InvestigationCase[] = [
    {
        id: "FIR-2026-1104",
        title: "Cross-Community Association",
        description: "Investigation into structured financial anomalies crossing two distinct regional network communities.",
        status: "ACTIVE",
        date: "2026-08-12",
        entityCount: 34,
        relationshipCount: 102,
        priority: "High"
    },
    {
        id: "FIR-2026-1048",
        title: "Coordinated Communication Pattern",
        description: "Pattern of synchronized burner phone registrations near key facilities.",
        status: "UNDER REVIEW",
        date: "2026-08-01",
        entityCount: 27,
        relationshipCount: 83,
        priority: "Medium"
    },
    {
        id: "FIR-2026-1023",
        title: "Organized Financial Activity",
        description: "Sequential cash transfers involving multiple dummy construction firms.",
        status: "ACTIVE",
        date: "2026-07-15",
        entityCount: 18,
        relationshipCount: 46,
        priority: "High"
    }
];

export const mockEntities: BaseEntity[] = [
    {
        id: "PER-00421",
        name: "Rahul Sharma",
        type: "person",
        connections: 43,
        cases: 6,
        status: "flagged",
        importance: "High",
        community: "C-BRIDGE",
        metrics: {
            degreeCentrality: 0.72,
            betweenness: 0.91,
            pageRank: 0.84,
        },
        details: {
            "Known aliases": ["R. Sharma", "Rahul S."],
            "Related cases": ["FIR-2026-1104", "FIR-2026-1048"],
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
        metrics: { degreeCentrality: 0.86, betweenness: 0.45, pageRank: 0.71 }
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
        metrics: { degreeCentrality: 0.52, betweenness: 0.21, pageRank: 0.79 }
    },
    {
        id: "VEH-1234",
        name: "MH12AB1234",
        type: "vehicle",
        connections: 12,
        cases: 3,
        status: "normal",
        importance: "Medium",
        community: "C-01"
    },
    {
        id: "PHN-0987",
        name: "9876543210",
        type: "phone",
        connections: 22,
        cases: 5,
        status: "flagged",
        importance: "High",
        community: "C-BRIDGE"
    },
    {
        id: "LOC-882",
        name: "Hinjewadi IT Junction",
        type: "location",
        connections: 45,
        cases: 8,
        status: "normal",
        importance: "Low"
    }
];

export const mockAlerts: Alert[] = [
    {
        id: "ALT-001",
        title: "COMMUNICATION BURST",
        entityId: "PER-00421",
        description: "217 communications detected within an unusually short period.",
        anomalyScore: 0.93,
        severity: "High",
        date: "2026-08-12T10:02:00Z",
        evidence: [
            "High network centrality",
            "Cross-community relationship",
            "Unusual communication frequency"
        ],
        records: ["CDR-8821", "CDR-9124", "FIR-2026-1104"]
    },
    {
        id: "ALT-002",
        title: "CROSS-COMMUNITY CONNECTION",
        entityId: "PER-00672",
        description: "Potential bridge between two network communities.",
        anomalyScore: 0.88,
        severity: "Medium",
        date: "2026-08-11T14:30:00Z",
        evidence: ["Betweenness centrality spike"],
        records: ["FIR-2026-1048"]
    }
];

// Let's create a reasonably complex mock graph centered around Rahul Sharma.
export const mockGraphElements: (GraphNode | GraphEdge)[] = [
    // Nodes
    { data: { id: "PER-00421", label: "Rahul Sharma", type: "person", status: "flagged", importance: "High" } },
    { data: { id: "PER-00219", label: "Amit Patil", type: "person", status: "review", importance: "High" } },
    { data: { id: "ORG-0091", label: "Apex Logistics", type: "organization", status: "normal" } },
    { data: { id: "VEH-1234", label: "MH12AB1234", type: "vehicle", status: "normal" } },
    { data: { id: "PHN-0987", label: "9876543210", type: "phone", status: "flagged" } },
    { data: { id: "LOC-882", label: "Hinjewadi", type: "location", status: "normal" } },
    { data: { id: "CAS-1104", label: "FIR-2026-1104", type: "case", status: "normal" } },

    // Community B Nodes
    { data: { id: "PER-0081", label: "Vishal M.", type: "person", status: "normal" } },
    { data: { id: "ACC-552", label: "Acct 4421-XX", type: "bank_account", status: "review" } },

    // Edges
    { data: { id: "e1", source: "PER-00421", target: "PER-00219", relationship: "CALLS" } },
    { data: { id: "e2", source: "PER-00421", target: "PHN-0987", relationship: "USES" } },
    { data: { id: "e3", source: "PER-00421", target: "VEH-1234", relationship: "OWNS" } },
    { data: { id: "e4", source: "PER-00421", target: "LOC-882", relationship: "VISITED" } },
    { data: { id: "e5", source: "PER-00219", target: "ORG-0091", relationship: "WORKS_FOR" } },
    { data: { id: "e6", source: "ORG-0091", target: "VEH-1234", relationship: "REGISTERED_TO" } },
    { data: { id: "e7", source: "PER-00421", target: "CAS-1104", relationship: "MENTIONED_IN" } },

    // Bridge to Community B
    { data: { id: "e8", source: "PER-00421", target: "PER-0081", relationship: "ASSOCIATED_WITH" } },
    { data: { id: "e9", source: "PER-0081", target: "ACC-552", relationship: "OWNS" } },
];
