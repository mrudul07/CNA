import { useState, useEffect } from "react";
import { MockService } from "../services/mockService";
import type { InvestigationCase } from "../types";
import { Search, Filter, ShieldAlert, Folder, Network, Activity, Pin } from "lucide-react";
import { cn } from "../utils/utils";
import { format, parseISO } from "date-fns";

export default function Investigations() {
    const [cases, setCases] = useState<InvestigationCase[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        MockService.getCases().then(data => {
            setCases(data);
            setLoading(false);
        });
    }, []);

    const filteredCases = cases.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col font-typewriter">
            <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#16120e] p-5 rounded-lg border border-[#3d2e24] shadow-xl">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Pin size={16} className="text-[#ef4444]" />
                        <span className="text-xs font-mono text-[#ef4444] font-bold tracking-widest uppercase">
                            AGENCY DOSSIER VAULT
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-agency font-bold text-[#f4efe6] flex items-center gap-3 uppercase tracking-wider">
                        <Folder size={26} className="text-[#ef4444]" /> Active Case Investigations
                    </h1>
                    <p className="text-xs text-[#a8988a] mt-1">
                        Classified criminal case dossiers, suspect webs & ongoing field intelligence.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8988a]" size={15} />
                        <input
                            type="text"
                            placeholder="Filter case ID or title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#120d09] border border-[#4a382b] rounded pl-9 pr-4 py-1.5 text-xs text-[#f4efe6] outline-none focus:border-[#ef4444] w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-[#241b15] border border-[#4a382b] rounded px-3 py-1.5 text-xs font-bold text-[#f4efe6] hover:bg-[#2e221b] transition-colors">
                        <Filter size={14} className="text-[#ef4444]" /> FILTERS
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex-1 space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-36 bg-[#1a1410] border border-[#362920] rounded-lg animate-pulse" />)}
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto space-y-5 pb-10 pr-1">
                    {filteredCases.map((c) => (
                        <div key={c.id} className="polaroid-card-dark p-6 rounded-lg hover:border-[#ef4444]/60 transition-all cursor-pointer group relative">
                            {/* Top Pushpin */}
                            <div className="push-pin-red" />

                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded flex items-center justify-center font-bold text-sm border shadow-md shrink-0 mt-0.5",
                                        c.priority === 'High' ? "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/50" :
                                            c.priority === 'Medium' ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/50" :
                                                "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/50"
                                    )}>
                                        {c.priority === 'High' ? <ShieldAlert size={20} /> : <Activity size={20} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold text-[#ef4444] tracking-widest">{c.id}</span>
                                            <span className="text-[9px] font-mono text-[#a8988a] uppercase">• {c.priority} PRIORITY</span>
                                        </div>
                                        <h3 className="text-lg font-agency font-bold text-[#f4efe6] group-hover:text-[#ef4444] transition-colors uppercase tracking-wide">
                                            {c.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="confidential-stamp text-[10px] py-0.5 px-2">
                                        CLASSIFIED
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded text-xs font-mono font-bold tracking-wider uppercase border",
                                        c.status === 'ACTIVE' ? "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40" : "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40"
                                    )}>
                                        {c.status}
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-[#a8988a] font-typewriter mb-5 leading-relaxed bg-[#120d09] p-3 rounded border border-[#2a1e16]">
                                {c.description}
                            </p>

                            <div className="flex items-center gap-6 pt-3 border-t border-[#362920] font-mono text-xs text-[#f4efe6]">
                                <div className="flex items-center gap-2">
                                    <Network size={14} className="text-[#ef4444]" />
                                    <span>{c.entityCount}</span>
                                    <span className="text-[#a8988a]">Suspect Entities</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-[#f59e0b]" />
                                    <span>{c.relationshipCount}</span>
                                    <span className="text-[#a8988a]">Known Linkages</span>
                                </div>
                                <div className="ml-auto text-[10px] text-[#a8988a]">
                                    DOSSIER OPENED: {format(parseISO(c.date), "MMM d, yyyy")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

