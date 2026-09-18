export type SourceReference = {
    id: string;
    type: "file" | "entity" | "timeline" | "relationship" | "alert";
    label: string;
    description?: string;
};

export type InvestigatorResponse = {
    answer: string;
    type:
    | "entity"
    | "relationship"
    | "timeline"
    | "alert"
    | "file"
    | "network"
    | "general";
    sources: SourceReference[];
    relatedEntities?: string[];
    relatedFiles?: string[];
};

export type CaseFile = {
    id: string;
    name: string;
    type: string;
    category: "FIR / Police Reports" | "Communication Records" | "Financial Records" | "Vehicle Records" | "Location Records" | "Other";
    caseId: string;
    uploadDate: string;
    size: number; // in KB
    status: "UPLOADED" | "PROCESSING" | "ANALYZED" | "PENDING REVIEW" | "FAILED" | "ARCHIVED";
    entities: string[];
    relationships: number;
    description: string;
};
