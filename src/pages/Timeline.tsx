import { useState, useEffect } from "react";
import { Clock, Phone, ArrowRightLeft, MapPin, Users, Search, Filter, Pin } from "lucide-react";
import { mockTimelineEvents } from "../data/mockTimeline";
import { cn } from "../utils/utils";

export default function Timeline() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setEvents(mockTimelineEvents);
            setLoading(false);
        }, 600);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'CALL': return <Phone size={14} />;
            case 'TRANSACTION': return <ArrowRightLeft size={14} />;
            case 'LOCATION': return <MapPin size={14} />;
            case 'MEETING': return <Users size={14} />;
            default: return <Clock size={14} />;
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto h-full flex flex-col font-typewriter">
            <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#16120e] p-5 rounded-lg border border-[#3d2e24] shadow-xl">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Pin size={16} className="text-[#ef4444]" />
                        <span className="text-xs font-mono text-[#ef4444] font-bold tracking-widest uppercase">
                            CHRONOLOGICAL EVIDENCE LINE
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-agency font-bold text-[#f4efe6] flex items-center gap-3 uppercase tracking-wider">
                        <Clock size={26} className="text-[#ef4444]" /> Investigation Timeline
                    </h1>
                    <p className="text-xs text-[#a8988a] mt-1">
                        Sequential red yarn timeline linking wiretaps, transactions & suspect meetings.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#241b15] border border-[#4a382b] rounded px-3.5 py-2 text-xs font-bold text-[#f4efe6] hover:bg-[#2e221b] transition-colors">
                    <Filter size={14} className="text-[#ef4444]" /> FILTER BY CASE DOSSIER
                </button>
            </header>

            {loading ? (
                <div className="flex-1 space-y-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-[#1a1410] border border-[#362920] rounded-lg" />)}
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-4 pb-12 relative">
                    {/* Red Yarn String Line */}
                    <div className="absolute left-[88px] top-0 bottom-0 w-1 bg-[#ef4444] z-0 shadow-[0_0_8px_#ef4444]" />

                    <div className="space-y-6 relative z-10">
                        {events.map((evt) => (
                            <div key={evt.id} className="flex gap-6 items-start group">
                                <div className="w-16 text-right shrink-0 pt-2 text-xs font-mono font-bold text-[#ef4444]">
                                    {evt.time}
                                </div>

                                <div className="relative shrink-0 pt-1.5 z-10">
                                    <div className="w-9 h-9 rounded-full bg-[#1c1612] border-2 border-[#ef4444] flex items-center justify-center text-[#ef4444] shadow-lg">
                                        {getIcon(evt.type)}
                                    </div>
                                </div>

                                <div className="polaroid-card-dark flex-1 p-5 rounded-lg border border-[#3d2e24] hover:border-[#ef4444]/60 transition-all cursor-pointer relative">
                                    <div className="push-pin-bronze" />
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-[9px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444]">
                                                {evt.type}
                                            </span>
                                            <h3 className="text-sm font-agency font-bold text-[#f4efe6] uppercase tracking-wide">{evt.title}</h3>
                                        </div>
                                        <span className="text-[10px] font-mono text-[#a8988a]">{evt.date}</span>
                                    </div>

                                    <p className="text-xs text-[#a8988a] font-typewriter mb-4 leading-relaxed bg-[#120d09] p-3 rounded border border-[#2a1e16]">
                                        {evt.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-[#362920] pt-2.5 mt-1 font-mono text-[10px]">
                                        <div className="flex items-center gap-1.5">
                                            {evt.entities.map((e: string) => (
                                                <span key={e} className="bg-[#241b15] text-[#f4efe6] px-2 py-0.5 rounded border border-[#4a382b]">
                                                    {e}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-[#ef4444] font-bold flex items-center gap-1">
                                            <Search size={10} /> {evt.case}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

