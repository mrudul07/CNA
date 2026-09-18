export type EntityType =
    | "person"
    | "phone"
    | "vehicle"
    | "location"
    | "organization"
    | "bank_account"
    | "case";

export type EntityStatus = "normal" | "review" | "flagged" | "high";

export interface InvestigationCase {
    id: string;
    title: string;
    description: string;
    status: "ACTIVE" | "UNDER REVIEW" | "RESOLVED";
    date: string;
    entityCount: number;
    relationshipCount: number;
    priority: "High" | "Medium" | "Low";
}

export interface BaseEntity {
    id: string;
    name: string;
    type: EntityType;
    connections: number;
    cases: number;
    status: EntityStatus;
    importance: "High" | "Medium" | "Low";
    community?: string;
    metrics?: {
        degreeCentrality: number;
        betweenness: number;
        pageRank: number;
    };
    details?: Record<string, any>;
}

export interface GraphNode {
    data: {
        id: string;
        label: string;
        type: EntityType;
        status?: EntityStatus;
        importance?: "High" | "Medium" | "Low";
        [key: string]: any;
    };
    position?: { x: number; y: number };
}

export interface GraphEdge {
    data: {
        id: string;
        source: string;
        target: string;
        relationship: string;
        weight?: number;
    };
}

export interface Alert {
    id: string;
    title: string;
    entityId: string;
    description: string;
    anomalyScore: number;
    severity: "High" | "Medium" | "Low";
    date: string;
    evidence: string[];
    records: string[];
}
