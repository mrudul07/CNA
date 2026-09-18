import { NavLink, useLocation } from "react-router-dom";
import {
    BarChart,
    Network,
    Briefcase,
    Users,
    FileText,
    Clock,
    Bell,
    BrainCircuit,
    Activity,
    FolderKanban,
    Pin,
    Video
} from "lucide-react";
import { cn } from "../utils/utils";

const NAV_ITEMS = [
    { name: "Case Briefing", path: "/briefing", icon: Video, code: "BRIEF-01" },
    { name: "Intel Alerts", path: "/alerts", icon: Bell, code: "ALERT-02" },
    { name: "Overview Board", path: "/", icon: BarChart, code: "BOARD-03" },
    { name: "Spy Flow Explorer", path: "/network", icon: Network, code: "SPY-04" },
    { name: "Active Cases", path: "/investigations", icon: Briefcase, code: "CASE-05" },
    { name: "Subject Register", path: "/entities", icon: Users, code: "SUBJ-06" },
    { name: "Evidence Timeline", path: "/timeline", icon: Clock, code: "TIME-07" },
    { name: "AI Telegraph Engine", path: "/ai-analysis", icon: BrainCircuit, code: "AI-08" },
    { name: "Case Records", path: "/cases", icon: FileText, code: "REC-09" },
    { name: "System Audit", path: "/audit", icon: Activity, code: "LOG-10" },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <aside className="w-64 bg-[#140f0c] border-r border-[#362920] h-screen flex flex-col pt-4 pb-4 px-3 shrink-0 relative overflow-hidden shadow-2xl z-30 font-typewriter">
            {/* Dark wood texture accent border */}
            <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-[#ef4444]/60 via-[#4a382b] to-[#ef4444]/40" />

            {/* Dossier Header Logo Section */}
            <div className="flex flex-col items-center justify-center mb-5 px-1 relative z-10">
                <div className="flex items-center gap-3 w-full p-2.5 rounded bg-[#1f1813] border border-[#4a382b] shadow-lg group">
                    <div className="bg-[#ef4444]/20 p-2 rounded text-[#ef4444] border border-[#ef4444]/40 group-hover:scale-105 transition-transform">
                        <FolderKanban size={22} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-agency text-sm font-bold tracking-[0.2em] text-[#f4efe6] leading-tight">
                            N E X U S
                        </h1>
                        <p className="font-mono text-[9px] text-[#ef4444] uppercase tracking-widest font-semibold">
                            CRIME INTEL WORKSPACE
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Reordered for Investigator Accessibility */}
            <nav className="flex-1 space-y-1.5 relative z-10 overflow-y-auto pr-1">
                <div className="text-[9px] font-mono text-[#a8988a] uppercase tracking-widest px-2 mb-2 font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1">
                        <Pin size={10} className="text-[#ef4444]" /> INVESTIGATOR ORDER
                    </span>
                    <span className="text-[8px] text-[#ef4444] font-bold">10 TABS</span>
                </div>
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== "/" && item.path !== "/briefing" && location.pathname.startsWith(item.path));
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold transition-all relative group border hover:rotate-1",
                                isActive
                                    ? "bg-[#281e17] text-[#f4efe6] border-[#ef4444]/60 shadow-lg"
                                    : "text-[#a8988a] bg-[#1a1410]/80 border-[#2e221b] hover:bg-[#221a14] hover:text-[#f4efe6] hover:border-[#4a382b]"
                            )}
                        >
                            {/* Pushpin indicator on active link */}
                            {isActive && (
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444] animate-pulse" />
                            )}
                            <item.icon size={16} className={isActive ? "text-[#ef4444]" : "text-[#7a6b5d] group-hover:text-[#ef4444] transition-colors"} />
                            <span className="flex-1 truncate">{item.name}</span>
                            <span className={cn(
                                "text-[8px] font-mono px-1.5 py-0.5 rounded border",
                                isActive ? "bg-[#ef4444]/20 border-[#ef4444]/50 text-[#ef4444]" : "bg-[#140f0c] border-[#2a1e16] text-[#6e5d50]"
                            )}>
                                {item.code}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Operational Status Box */}
            <div className="mt-auto px-1 pt-3 border-t border-[#362920] relative z-10">
                <div className="flex items-center gap-2.5 p-2.5 rounded bg-[#1a1410] border border-[#3a2c22]">
                    <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                        <div className="h-2 w-2 rounded-full bg-[#ef4444] absolute top-0 left-0 animate-ping opacity-75" />
                    </div>
                    <div className="font-mono text-[10px]">
                        <p className="text-[#f4efe6] font-bold">SPY FLOW LIVE</p>
                        <p className="text-[9px] text-[#ef4444] font-semibold">AGENCY DEMO ACTIVE</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}


