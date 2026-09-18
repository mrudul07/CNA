import { useState, useEffect } from "react";
import { X, Network, Share2, Briefcase, FileText, CheckCircle2, AlertTriangle, ShieldAlert, Pin } from "lucide-react";
import { MockService } from "../services/mockService";
import type { BaseEntity } from "../types";
import { cn } from "../utils/utils";

interface EntityDrawerProps {
    entityId: string | null;
    onClose: () => void;
}

export function EntityDrawer({ entityId, onClose }: EntityDrawerProps) {
    const [entity, setEntity] = useState<BaseEntity | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (entityId) {
            setLoading(true);
            MockService.getEntityDetails(entityId).then(data => {
                if (data) setEntity(data);
                setLoading(false);
            });
        }
    }, [entityId]);

    if (!entityId) return null;

    return (
        <div className={cn(
            "fixed top-16 right-0 bottom-0 bg-[#140f0c] border-l border-[#3d2e24] shadow-2xl z-50 transition-all duration-300 transform font-typewriter",
            entity ? "translate-x-0" : "translate-x-full"
        )} style={{ width: '420px' }}>

            {/* Loading State */}
            {loading && (
                <div className="p-6 h-full flex flex-col gap-4 animate-pulse">
                    <div className="h-6 w-8 bg-[#241b15] rounded self-end mb-4"></div>
                    <div className="h-8 w-48 bg-[#241b15] rounded mb-2"></div>
                    <div className="h-4 w-32 bg-[#1f1712] rounded mb-8"></div>
                    <div className="h-24 w-full bg-[#1c150f] rounded mb-4"></div>
                    <div className="h-64 w-full bg-[#18110b] rounded mb-4"></div>
                </div>
            )}

            {/* Content */}
            {!loading && entity && (
                <div className="h-full flex flex-col relative">
                    {/* Top Pushpin */}
                    <div className="push-pin-red" />

                    <header className="px-6 py-5 border-b border-[#3d2e24] flex items-start justify-between bg-[#1e1712] text-[#f4efe6] relative">
                        <div className="confidential-stamp text-[8px] py-0.5 px-2 absolute top-3 right-12">
                            CONFIDENTIAL
                        </div>
                        <div>
                            <div className="text-[9px] uppercase tracking-widest text-[#ef4444] font-mono font-bold mb-1 flex items-center gap-1.5">
                                <Pin size={12} /> PERSON OF INTEREST DOSSIER
                            </div>
                            <h2 className="text-xl font-agency font-bold text-[#f4efe6] uppercase tracking-wide">{entity.name}</h2>
                            <div className="text-xs text-[#a8988a] font-mono mt-0.5">{entity.id}</div>

                            <div className={cn(
                                "mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded border uppercase",
                                entity.status === 'flagged' ? "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40" :
                                    entity.status === 'review' ? "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40" :
                                        "bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/40"
                            )}>
                                {entity.status === 'flagged' ? <AlertTriangle size={13} /> :
                                    entity.status === 'review' ? <ShieldAlert size={13} /> : <CheckCircle2 size={13} />}
                                {entity.status.toUpperCase() === 'NORMAL' ? 'CLEARED' : entity.status.toUpperCase() + ' STATUS'}
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 text-[#a8988a] hover:bg-[#2e221b] hover:text-[#f4efe6] rounded transition-colors">
                            <X size={18} />
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#1c1510] p-4 rounded border border-[#3d2e24]">
                                <Network className="text-[#ef4444] mb-1.5" size={18} />
                                <div className="text-2xl font-typewriter font-bold text-[#f4efe6]">{entity.connections}</div>
                                <div className="text-[9px] font-mono text-[#a8988a] uppercase tracking-wider">Known Links</div>
                            </div>
                            <div className="bg-[#1c1510] p-4 rounded border border-[#3d2e24]">
                                <Briefcase className="text-[#f59e0b] mb-1.5" size={18} />
                                <div className="text-2xl font-typewriter font-bold text-[#f4efe6]">{entity.cases}</div>
                                <div className="text-[9px] font-mono text-[#a8988a] uppercase tracking-wider">Active Cases</div>
                            </div>
                        </div>

                        {entity.metrics && (
                            <div className="border border-[#3d2e24] rounded overflow-hidden bg-[#18120d]">
                                <div className="bg-[#241b15] px-4 py-2 border-b border-[#3d2e24] text-[10px] font-agency font-bold text-[#ef4444] uppercase tracking-widest">GRAPH CENTRALITY METRICS</div>
                                <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-2 font-mono text-xs">
                                    <div>
                                        <div className="text-[9px] text-[#a8988a] uppercase">Degree Centrality</div>
                                        <div className="font-bold text-[#f4efe6]">{entity.metrics.degreeCentrality.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-[#a8988a] uppercase">Betweenness</div>
                                        <div className="font-bold text-[#f59e0b]">{entity.metrics.betweenness.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-[#a8988a] uppercase">PageRank Score</div>
                                        <div className="font-bold text-[#f4efe6]">{entity.metrics.pageRank.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-[#a8988a] uppercase">Sub-Community</div>
                                        <div className="font-bold text-[#ef4444]">{entity.community || "NONE"}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {entity.status === 'flagged' && (
                            <div className="border border-[#ef4444]/40 rounded overflow-hidden bg-[#ef4444]/10 p-4">
                                <h3 className="font-agency font-bold text-[#ef4444] mb-2 text-xs uppercase tracking-wider flex items-center gap-2">
                                    <ShieldAlert size={14} />
                                    FLAGGED REASONING (EXPLAINABLE AI)
                                </h3>
                                <ul className="text-xs text-[#a8988a] space-y-1.5 font-typewriter">
                                    <li className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-[#ef4444] mt-0.5 shrink-0" /> High cross-community connectivity</li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-[#ef4444] mt-0.5 shrink-0" /> Appears across multiple active cases</li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-[#ef4444] mt-0.5 shrink-0" /> Unusual communication burst</li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-[#ef4444] mt-0.5 shrink-0" /> Repeated association with flagged nodes</li>
                                </ul>
                            </div>
                        )}

                        <div className="mt-2 space-y-2 font-mono">
                            <button className="w-full py-2 bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] rounded font-agency font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
                                <FileText size={15} /> VIEW FULL SUSPECT PROFILE
                            </button>
                            <button className="w-full py-2 bg-[#241b15] hover:bg-[#2e221b] text-[#f4efe6] border border-[#4a382b] rounded font-agency font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                                <Share2 size={15} /> EXPAND CORKBOARD NETWORK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

