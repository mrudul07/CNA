import { useState, useEffect } from "react";
import { NetworkGraph } from "../components/NetworkGraph";
import { MockService } from "../services/mockService";
import type { GraphNode, GraphEdge } from "../types";
import { EntityDrawer } from "../components/EntityDrawer";
import { Filter, Search, Pin } from "lucide-react";

export default function NetworkExplorer() {
    const [graphData, setGraphData] = useState<(GraphNode | GraphEdge)[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    useEffect(() => {
        MockService.getNetworkGraph().then(g => {
            setGraphData(g);
            setLoading(false);
        });
    }, []);

    const handleNodeClick = (id: string) => {
        setSelectedNodeId(id);
    };

    return (
        <div className="flex h-full max-w-[1600px] overflow-hidden font-typewriter">
            {/* Left Filter Panel Styled as Detective File Cabinet */}
            <aside className="w-72 bg-[#16120e] border-r border-[#3d2e24] flex flex-col overflow-y-auto shrink-0 z-20 shadow-2xl relative">
                <div className="p-4 border-b border-[#3d2e24] bg-[#221812] flex items-center justify-between">
                    <h2 className="font-agency font-bold text-sm text-[#f4efe6] flex items-center gap-2 uppercase tracking-wider">
                        <Filter size={16} className="text-[#ef4444]" /> EXPLORER FILTERS
                    </h2>
                    <Pin size={14} className="text-[#ef4444]" />
                </div>

                <div className="p-4 space-y-6 flex-1 text-xs">
                    <div>
                        <h3 className="text-[10px] font-mono font-bold text-[#ef4444] uppercase tracking-widest mb-3">EVIDENCE PIN CATEGORY</h3>
                        <div className="space-y-2">
                            {['Person', 'Phone', 'Vehicle', 'Location', 'Organization', 'Bank Account', 'Case'].map(type => (
                                <label key={type} className="flex items-center gap-2 text-[#f4efe6] cursor-pointer hover:text-[#ef4444] transition-colors">
                                    <input type="checkbox" defaultChecked className="rounded border-[#4a382b] bg-[#120d09] text-[#ef4444] focus:ring-[#ef4444]" />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-[#2d221b] pt-4">
                        <h3 className="text-[10px] font-mono font-bold text-[#ef4444] uppercase tracking-widest mb-2">LINKAGE DEPTH</h3>
                        <select className="w-full bg-[#120d09] border border-[#4a382b] text-[#f4efe6] rounded px-3 py-1.5 outline-none focus:border-[#ef4444] font-mono text-xs">
                            <option>1 Degree Linkage</option>
                            <option>2 Degrees Linkage</option>
                            <option>3 Degrees Linkage</option>
                        </select>
                    </div>

                    <div className="border-t border-[#2d221b] pt-4">
                        <h3 className="text-[10px] font-mono font-bold text-[#ef4444] uppercase tracking-widest mb-3">THREAT SEVERITY</h3>
                        <div className="space-y-2">
                            {['All', 'Normal', 'Flagged', 'High Priority'].map(imp => (
                                <label key={imp} className="flex items-center gap-2 text-[#f4efe6] cursor-pointer hover:text-[#ef4444] transition-colors">
                                    <input type="checkbox" defaultChecked={imp !== 'Normal'} className="rounded border-[#4a382b] bg-[#120d09] text-[#ef4444]" />
                                    <span>{imp}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="w-full mt-4 bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] font-agency font-bold uppercase tracking-wider py-2 rounded text-xs flex items-center justify-center gap-2 transition-colors shadow-lg">
                        <Search size={14} /> FILTER CORKBOARD
                    </button>
                </div>
            </aside>

            {/* Main Corkboard Graph Area */}
            <div className="flex-1 relative corkboard-surface wood-frame border-0">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-[#a8988a] font-typewriter text-xs animate-pulse">
                        Mapping Corkboard Topology & Red Yarn Strings...
                    </div>
                ) : (
                    <NetworkGraph
                        elements={graphData}
                        onNodeClick={handleNodeClick}
                        className="border-0 rounded-none shadow-none"
                    />
                )}
            </div>

            <EntityDrawer entityId={selectedNodeId} onClose={() => setSelectedNodeId(null)} />
        </div>
    );
}

