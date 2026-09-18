import {
    mockCases,
    mockEntities,
    mockAlerts,
    mockGraphElements
} from "../data/mockData";
import type { BaseEntity, InvestigationCase, Alert } from "../types";

export const MockService = {
    getOverviewMetrics: async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
            casesAnalyzed: 128,
            entitiesIdentified: 742,
            relationships: 5281,
            flaggedPatterns: 27,
            communities: 18,
            highPriorityEntities: 9,
        };
    },

    getNetworkGraph: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return mockGraphElements;
    },

    getEntityDetails: async (id: string): Promise<BaseEntity | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return mockEntities.find((e) => e.id === id);
    },

    getAllEntities: async (): Promise<BaseEntity[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return mockEntities;
    },

    getCases: async (): Promise<InvestigationCase[]> => {
        await new Promise((resolve) => setTimeout(resolve, 900));
        return mockCases;
    },

    getAlerts: async (): Promise<Alert[]> => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        return mockAlerts;
    },

    runAIAnalysis: async (onProgress: (progress: number, step: string) => void) => {
        const steps = [
            "Loading records...",
            "Extracting entities...",
            "Resolving duplicate entities...",
            "Extracting relationships...",
            "Building knowledge graph...",
            "Computing graph metrics...",
            "Detecting communities...",
            "Running anomaly detection...",
            "Generating insights..."
        ];

        for (let i = 0; i < steps.length; i++) {
            onProgress(Math.floor((i / steps.length) * 100), steps[i]);
            await new Promise((resolve) => setTimeout(resolve, 1200));
        }

        onProgress(100, "ANALYSIS COMPLETE");
        return true;
    }
};
