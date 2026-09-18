import { Search, Bell, UserCircle, SearchX, Shield, AlertTriangle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { mockEntities } from "../data/mockData";

export function TopNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const searchResults = mockEntities.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const getPageTitle = (pathname: string) => {
        switch (pathname) {
            case "/": return "OVERVIEW BOARD";
            case "/network": return "NETWORK EXPLORER";
            case "/investigations": return "ACTIVE CASE FILES";
            case "/entities": return "SUBJECT REGISTER";
            case "/cases": return "CASE RECORDS";
            case "/timeline": return "EVIDENCE TIMELINE";
            case "/alerts": return "INTEL ALERTS";
            case "/data": return "DATA SOURCES";
            case "/ai-analysis": return "AI TELEGRAPH ANALYSIS";
            case "/audit": return "SYSTEM AUDIT LOG";
            default: return "NEXUS INTEL";
        }
    };

    return (
        <header className="h-16 bg-[#16120e]/95 backdrop-blur-xl border-b border-[#362920] flex items-center justify-between px-6 shrink-0 z-40 sticky top-0 shadow-2xl relative overflow-hidden">
            {/* Top metallic frame accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ef4444] to-transparent opacity-80" />

            {/* Left section - Luxe Leviathan 49 Agency Header */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#241b15] border border-[#4a382b] shadow-inner">
                    <Shield size={18} className="text-[#ef4444] animate-pulse" />
                    <div className="flex flex-col">
                        <span className="font-agency text-xs font-bold tracking-[0.3em] text-[#f4efe6] uppercase">
                            L u x e &nbsp; L e v i a t h a n &nbsp; 4 9 &nbsp; A g e n c y
                        </span>
                        <span className="text-[9px] font-mono text-[#ef4444] tracking-widest font-semibold uppercase">
                            CASE DOSSIER DIVISION // {getPageTitle(location.pathname)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Center & Right section */}
            <div className="flex items-center gap-5">
                {/* Search Bar Styled as Confidential Document Finder */}
                <div className="relative group" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8988a] group-focus-within:text-[#ef4444] transition-colors" size={15} />
                    <input
                        type="text"
                        placeholder="Search suspects, dossier ID, evidence..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={() => setShowResults(true)}
                        className="w-72 bg-[#120d09] border border-[#4a382b] text-[#f4efe6] font-typewriter rounded-md pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#ef4444] focus:border-[#ef4444] transition-all hover:bg-[#1a140f] placeholder:text-[#78695c]"
                    />
                    
                    {/* Search Results Dropdown */}
                    {showResults && searchQuery.length > 0 && (
                        <div className="absolute top-11 left-0 w-96 bg-[#1a140f] border border-[#ef4444]/40 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                            <div className="bg-[#2a1e16] px-4 py-2 text-[10px] font-agency font-bold text-[#ef4444] uppercase tracking-widest border-b border-[#3a281c] flex justify-between items-center">
                                <span>🔍 DOSSIER SEARCH RESULTS</span>
                                <span className="font-mono text-[9px] text-[#a8988a]">TOP MATCHES</span>
                            </div>
                            {searchResults.length > 0 ? (
                                <div className="max-h-80 overflow-y-auto">
                                    {searchResults.map((res) => (
                                        <div
                                            key={res.id}
                                            className="p-3.5 border-b border-[#2e221b] hover:bg-[#281e17] cursor-pointer flex items-center justify-between transition-all group/result"
                                            onClick={() => {
                                                setShowResults(false);
                                                setSearchQuery("");
                                                navigate('/network');
                                            }}
                                        >
                                            <div className="flex-1">
                                                <div className="text-[9px] font-mono font-bold text-[#ef4444] uppercase mb-0.5 tracking-wider">{res.type}</div>
                                                <div className="text-xs font-semibold text-[#f4efe6] group-hover/result:text-[#ef4444] transition-colors">{res.name}</div>
                                                <div className="text-[10px] text-[#a8988a] font-mono mt-0.5">{res.id}</div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ef4444]/10 border border-[#ef4444]/30">
                                                    <span className="text-[10px] font-mono font-bold text-[#ef4444]">{res.connections}</span>
                                                    <span className="text-[9px] text-[#a8988a]">links</span>
                                                </div>
                                                <div className="text-[9px] text-[#a8988a] mt-1 font-mono">{res.cases} cases</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-center text-[#a8988a] flex flex-col items-center justify-center font-typewriter">
                                    <SearchX size={28} className="mb-2 text-[#ef4444]/50" />
                                    <p className="text-xs font-bold">No dossier matching "{searchQuery}"</p>
                                    <p className="text-[10px] text-[#7a6b5d] mt-0.5">Check spelling or search by record ID</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Agency Controls */}
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[#362920]">
                    {/* Confidential Evidence Alerts Bell */}
                    <button 
                        onClick={() => navigate('/alerts')}
                        className="relative text-[#a8988a] hover:text-[#ef4444] transition-colors p-2 hover:bg-[#241b15] rounded-md border border-transparent hover:border-[#4a382b]"
                        title="View Intelligence Alerts"
                    >
                        <Bell size={18} />
                        <span className="absolute -top-1 -right-1 bg-[#ef4444] text-[#ffffff] font-mono text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-[#16120e] animate-pulse">
                            27
                        </span>
                    </button>

                    {/* Agent Dossier Badge */}
                    <div className="flex items-center gap-2 pl-1">
                        <div className="flex items-center gap-2 bg-[#241b15] border border-[#4a382b] px-3 py-1 rounded-md">
                            <div className="p-1 bg-[#ef4444]/15 rounded text-[#ef4444] border border-[#ef4444]/30">
                                <UserCircle size={16} />
                            </div>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="font-typewriter text-xs font-bold text-[#f4efe6]">DET. AGENT-01</span>
                                <span className="text-[9px] text-[#ef4444] font-mono uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
                                    CLASSIFIED
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

