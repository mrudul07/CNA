import { useEffect, useState } from "react";
import { KPICard } from "../components/KPICard";
import { NetworkGraph } from "../components/NetworkGraph";
import { EntityDrawer } from "../components/EntityDrawer";
import { MockService } from "../services/mockService";
import type { GraphNode, GraphEdge } from "../types";
import { ShieldAlert, Users, Link as LinkIcon, AlertTriangle, Network, SearchX, Pin, LayoutGrid, Rows } from "lucide-react";
import { format } from "date-fns";

export default function Overview() {
    const [metrics, setMetrics] = useState<any>(null);
    const [graphData, setGraphData] = useState<(GraphNode | GraphEdge)[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [dashboardPosition, setDashboardPosition] = useState<"top" | "side">("top");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [m, g] = await Promise.all([
                MockService.getOverviewMetrics(),
                MockService.getNetworkGraph()
            ]);
            setMetrics(m);
            setGraphData(g);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleNodeClick = (id: string) => {
        const node = graphData?.find(d => 'id' in d.data && d.data.id === id);
        if (node && 'type' in node.data && node.data.type !== 'case') {
            setSelectedNodeId(id);
        }
    };

    if (loading) {
        return (
            <div className="p-8 h-full flex flex-col font-typewriter">
                <div className="h-8 w-64 bg-[#241b15] rounded animate-pulse mb-3" />
                <div className="h-5 w-96 bg-[#1a1410] rounded animate-pulse mb-8" />
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-36 bg-[#1c1612] rounded-lg animate-pulse border border-[#362920]" />)}
                </div>
                <div className="flex-1 bg-[#1a1410] rounded-lg border border-[#362920] animate-pulse" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pb-12 relative z-10">
            {/* Header Desk Banner */}
            <header className="mb-6 bg-[#16120e]/80 p-5 rounded-lg border border-[#3d2e24] shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <div className="confidential-stamp">CONFIDENTIAL</div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="push-pin-red !static !transform-none inline-block mr-1" />
                            <span className="font-mono text-xs text-[#ef4444] tracking-widest font-bold uppercase">
                                LUXE LEVIATHAN 49 AGENCY // CASE EVIDENCE ROOM
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-agency font-bold text-[#f4efe6] tracking-wider uppercase">
                            Investigative Intelligence Board
                        </h1>
                        <p className="text-xs font-typewriter text-[#a8988a] mt-1">
                            Uncovering suspect webs, criminal cells & hidden network linkages across evidence files.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2 bg-[#241b15] px-3 py-1.5 rounded border border-[#4a382b] text-[11px] font-mono text-[#a8988a]">
                            <div><span className="text-[#f4efe6] font-bold">LAST SYNC:</span> {format(new Date(), "PPpp")}</div>
                        </div>

                        {/* Dashboard Position Toggle */}
                        <div className="flex items-center gap-1.5 bg-[#120d09] p-1 rounded border border-[#362920]">
                            <span className="text-[10px] font-mono text-[#a8988a] px-2 font-bold uppercase">DASHBOARD POSITION:</span>
                            <button
                                onClick={() => setDashboardPosition("top")}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                                    dashboardPosition === "top"
                                        ? "bg-[#ef4444] text-[#ffffff] shadow-md"
                                        : "text-[#a8988a] hover:text-[#f4efe6]"
                                }`}
                                title="Position Dashboard Metrics at the Top Bulletin Board"
                            >
                                <LayoutGrid size={12} /> TOP BOARD
                            </button>
                            <button
                                onClick={() => setDashboardPosition("side")}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                                    dashboardPosition === "side"
                                        ? "bg-[#ef4444] text-[#ffffff] shadow-md"
                                        : "text-[#a8988a] hover:text-[#f4efe6]"
                                }`}
                                title="Position Dashboard Metrics on the Side Dock"
                            >
                                <Rows size={12} /> SIDE RACK
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Content Layout (Flexible based on Dashboard Position) */}
            <div className={`flex-1 flex ${dashboardPosition === "top" ? "flex-col" : "flex-col lg:flex-row"} gap-6`}>
                {/* KPI Metrics Dashboard Rack */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                    dashboardPosition === "top" ? "lg:grid-cols-6 mb-2" : "lg:w-80 lg:grid-cols-1 space-y-4"
                } gap-4 shrink-0`}>
                    <KPICard title="Cases Analyzed" value={metrics.casesAnalyzed} icon={ShieldAlert} trend={4.2} severity="normal" />
                    <KPICard title="Entities Identified" value={metrics.entitiesIdentified} icon={Users} trend={12.4} severity="normal" />
                    <KPICard title="Relationships" value={metrics.relationships} icon={LinkIcon} trend={18.1} severity="normal" />
                    <KPICard title="Flagged Patterns" value={metrics.flaggedPatterns} icon={AlertTriangle} trend={-2.1} severity="warning" />
                    <KPICard title="Communities" value={metrics.communities} icon={Network} severity="normal" />
                    <KPICard title="High Priority Suspects" value={metrics.highPriorityEntities} icon={SearchX} severity="critical" />
                </div>

                {/* Main Corkboard Evidence Network Graph Workspace */}
                <div className="flex-1 flex flex-col min-h-[520px]">
                    <div className="flex items-center justify-between mb-3 bg-[#1e1813] px-4 py-2.5 rounded border border-[#3d2e24]">
                        <div className="flex items-center gap-2">
                            <Pin size={16} className="text-[#ef4444]" />
                            <h2 className="text-sm font-agency font-bold text-[#f4efe6] uppercase tracking-wider">
                                SUSPECT RELATIONSHIP EVIDENTIAL CORKBOARD
                            </h2>
                        </div>
                        <span className="text-[10px] font-mono text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/30 px-2 py-0.5 rounded font-bold uppercase">
                            LIVE NODE LINKAGES
                        </span>
                    </div>

                    <div className="flex-1 w-full rounded-lg wood-frame corkboard-surface relative overflow-hidden min-h-[480px]">
                        {graphData && (
                            <NetworkGraph
                                elements={graphData}
                                onNodeClick={handleNodeClick}
                            />
                        )}
                    </div>
                </div>
            </div>

            <EntityDrawer entityId={selectedNodeId} onClose={() => setSelectedNodeId(null)} />
        </div>
    );
}

