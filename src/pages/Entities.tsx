import { useState, useEffect } from "react";
import { MockService } from "../services/mockService";
import type { BaseEntity } from "../types";
import { Users, Filter, ChevronDown, CheckCircle2, AlertTriangle, ShieldAlert, Pin } from "lucide-react";
import { cn } from "../utils/utils";

export default function Entities() {
    const [entities, setEntities] = useState<BaseEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("People");

    const tabs = ["People", "Phones", "Vehicles", "Locations", "Organizations", "Bank Accounts"];

    useEffect(() => {
        MockService.getAllEntities().then(data => {
            setEntities(data);
            setLoading(false);
        });
    }, []);

    const getTabTypeMap = (tab: string) => {
        switch (tab) {
            case "People": return "person";
            case "Phones": return "phone";
            case "Vehicles": return "vehicle";
            case "Locations": return "location";
            case "Organizations": return "organization";
            case "Bank Accounts": return "bank_account";
            default: return "";
        }
    };

    const filtered = entities.filter(e => e.type === getTabTypeMap(activeTab));

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col font-typewriter">
            <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#16120e] p-5 rounded-lg border border-[#3d2e24] shadow-xl">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Pin size={16} className="text-[#ef4444]" />
                        <span className="text-xs font-mono text-[#ef4444] font-bold tracking-widest uppercase">
                            MASTER SUBJECT LOG
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-agency font-bold text-[#f4efe6] flex items-center gap-3 uppercase tracking-wider">
                        <Users size={26} className="text-[#ef4444]" /> Entity Register Database
                    </h1>
                    <p className="text-xs text-[#a8988a] mt-1">
                        Centralized register of resolved subjects, wiretaps, vehicles, locations & organizations.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#241b15] border border-[#4a382b] rounded px-3.5 py-2 text-xs font-bold text-[#f4efe6] hover:bg-[#2e221b] transition-colors">
                    <Filter size={14} className="text-[#ef4444]" /> SEARCH FILTERS
                </button>
            </header>

            {/* Folder Tab Dock Header */}
            <div className="flex flex-wrap gap-1.5 border-b border-[#3d2e24] pb-2 mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-4 py-2 text-xs font-agency font-bold uppercase transition-all rounded-t-md border-t border-x",
                            activeTab === tab
                                ? "bg-[#281e17] text-[#ef4444] border-[#ef4444]/60 shadow-lg"
                                : "bg-[#140f0c] text-[#a8988a] border-[#2e221b] hover:text-[#f4efe6] hover:bg-[#1a1410]"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table Dossier Surface */}
            <div className="flex-1 bg-[#16120e] border border-[#3d2e24] rounded-lg shadow-2xl relative overflow-hidden flex flex-col">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse text-[#a8988a] font-typewriter">
                        Querying Agency Central Database...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-[#221913] text-[#ef4444] uppercase font-agency tracking-wider border-b border-[#3d2e24]">
                                <tr>
                                    <th className="px-6 py-3.5">SUBJECT / ENTITY <ChevronDown size={14} className="inline ml-1" /></th>
                                    <th className="px-6 py-3.5">RECORD ID</th>
                                    <th className="px-6 py-3.5 text-center">CONNECTIONS</th>
                                    <th className="px-6 py-3.5 text-center">CASES</th>
                                    <th className="px-6 py-3.5">THREAT LEVEL</th>
                                    <th className="px-6 py-3.5">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2a1e16]">
                                {filtered.length > 0 ? filtered.map(row => (
                                    <tr key={row.id} className="hover:bg-[#221812] transition-colors cursor-pointer group">
                                        <td className="px-6 py-4 font-bold text-[#f4efe6] group-hover:text-[#ef4444] transition-colors font-typewriter">{row.name}</td>
                                        <td className="px-6 py-4 text-[#a8988a]">{row.id}</td>
                                        <td className="px-6 py-4 text-center font-bold text-[#ef4444]">{row.connections}</td>
                                        <td className="px-6 py-4 text-center">{row.cases}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[9px] font-bold uppercase border",
                                                row.importance === 'High' ? "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40" :
                                                    row.importance === 'Medium' ? "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40" : "bg-[#241b15] text-[#a8988a] border-[#362920]"
                                            )}>{row.importance}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 font-bold">
                                                {row.status === 'flagged' ? <AlertTriangle size={14} className="text-[#f59e0b]" /> :
                                                    row.status === 'review' ? <ShieldAlert size={14} className="text-[#ef4444]" /> :
                                                        <CheckCircle2 size={14} className="text-[#22c55e]" />}
                                                <span className={cn(
                                                    row.status === 'flagged' ? "text-[#f59e0b]" :
                                                        row.status === 'review' ? "text-[#ef4444]" : "text-[#22c55e]"
                                                )}>
                                                    {row.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-[#a8988a] font-typewriter">
                                            No dossier records found for category "{activeTab}".
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

