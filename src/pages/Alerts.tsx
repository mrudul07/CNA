import { useState, useEffect } from "react";
import { MockService } from "../services/mockService";
import type { Alert } from "../types";
import { AlertTriangle, ShieldAlert, ChevronRight, FileText, Database, Network, Pin } from "lucide-react";
import { cn } from "../utils/utils";
import { format, parseISO } from "date-fns";

export default function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

    useEffect(() => {
        MockService.getAlerts().then(setAlerts);
    }, []);

    return (
        <div className="flex h-full max-w-[1600px] overflow-hidden font-typewriter">
            {/* List */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#16120e] p-5 rounded-lg border border-[#3d2e24] shadow-xl">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Pin size={16} className="text-[#ef4444]" />
                            <span className="text-xs font-mono text-[#ef4444] font-bold tracking-widest uppercase">
                                THREAT ANOMALY ENGINE
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-agency font-bold text-[#f4efe6] flex items-center gap-3 uppercase tracking-wider">
                            <AlertTriangle size={26} className="text-[#f59e0b]" /> Intelligence Field Alerts
                        </h1>
                        <p className="text-xs text-[#a8988a] mt-1">
                            Urgent pattern flags, wiretap spikes & criminal cell anomalies needing analyst review.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                        <div className="flex bg-[#120d09] rounded p-1 border border-[#362920]">
                            <div className="px-3 py-1 font-bold text-[#ef4444] bg-[#ef4444]/15 rounded border border-[#ef4444]/30">6 HIGH</div>
                            <div className="px-3 py-1 font-bold text-[#f59e0b] hover:bg-[#241b15] rounded cursor-pointer transition-colors">13 MED</div>
                            <div className="px-3 py-1 font-bold text-[#a8988a] hover:bg-[#241b15] rounded cursor-pointer transition-colors">8 LOW</div>
                        </div>
                    </div>
                </header>

                <div className="space-y-4">
                    {alerts.map(alert => (
                        <div
                            key={alert.id}
                            onClick={() => setSelectedAlert(alert)}
                            className={cn(
                                "polaroid-card-dark p-5 rounded-lg cursor-pointer transition-all flex items-start gap-4 relative",
                                selectedAlert?.id === alert.id ? "border-[#ef4444] ring-1 ring-[#ef4444] shadow-2xl bg-[#221812]" : "hover:border-[#ef4444]/60",
                                alert.severity === 'High' ? "border-l-4 border-l-[#ef4444]" :
                                    alert.severity === 'Medium' ? "border-l-4 border-l-[#f59e0b]" : "border-l-2 border-l-[#362920]"
                            )}
                        >
                            <div className="push-pin-red" />
                            <div className="mt-1">
                                {alert.severity === 'High' ? <ShieldAlert className="text-[#ef4444]" size={22} /> : <AlertTriangle className="text-[#f59e0b]" size={22} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1 font-agency">
                                    <h3 className="font-bold text-[#f4efe6] uppercase tracking-wide text-sm">{alert.title}</h3>
                                    <span className="text-[10px] text-[#ef4444] font-mono font-bold">{format(parseISO(alert.date), "HH:mm")} HRS</span>
                                </div>
                                <p className="text-xs text-[#a8988a] font-typewriter mb-3 leading-relaxed">{alert.description}</p>

                                <div className="flex items-center gap-3 text-[10px] font-mono">
                                    <div className="bg-[#120d09] px-2.5 py-1 rounded border border-[#2a1e16] text-[#a8988a]">SUSPECT ID: <span className="font-bold text-[#ef4444]">{alert.entityId}</span></div>
                                    <div className="bg-[#120d09] px-2.5 py-1 rounded border border-[#2a1e16] text-[#a8988a]">ANOMALY SCORE: <span className={cn("font-bold", alert.anomalyScore > 0.9 ? "text-[#ef4444]" : "text-[#f59e0b]")}>{alert.anomalyScore}</span></div>
                                </div>
                            </div>
                            <div className="flex items-center h-full pt-3">
                                <ChevronRight size={18} className="text-[#ef4444]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Panel */}
            <div className={cn(
                "w-[450px] bg-[#16120e] border-l border-[#3d2e24] h-full flex flex-col transition-all overflow-y-auto shrink-0 shadow-2xl relative z-20 font-typewriter",
                selectedAlert ? "translate-x-0" : "translate-x-full absolute right-0"
            )}>
                {selectedAlert && (
                    <>
                        <div className="p-6 border-b border-[#3d2e24] bg-[#221812] relative">
                            <div className="confidential-stamp text-[9px] py-0.5 px-2 absolute top-4 right-4">
                                CLASSIFIED
                            </div>
                            <h2 className="text-lg font-agency font-bold text-[#f4efe6] uppercase tracking-wider flex items-center gap-2 mb-1">
                                <ShieldAlert size={20} className={selectedAlert.severity === 'High' ? "text-[#ef4444]" : "text-[#f59e0b]"} />
                                ANOMALY ANALYSIS DOSSIER
                            </h2>
                            <p className="text-xs text-[#a8988a]">Explainable AI Evidence Findings & Evidence Chain</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-[10px] font-mono font-bold text-[#ef4444] uppercase tracking-widest mb-3">FLAGGED EVIDENCE PATTERNS</h3>
                                <div className="space-y-3">
                                    {selectedAlert.evidence.map((ev, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 bg-[#120d09] p-3 rounded border border-[#2a1e16]">
                                            <div className="w-5 h-5 rounded bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">{String(idx + 1).padStart(2, '0')}</div>
                                            <div className="text-xs text-[#f4efe6] leading-snug">{ev}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-[#3d2e24] pt-5">
                                <h3 className="text-[10px] font-mono font-bold text-[#a8988a] uppercase tracking-widest mb-3">SUPPORTING CASE RECORDS</h3>
                                <div className="grid grid-cols-2 gap-2.5 font-mono">
                                    {selectedAlert.records.map((rec) => (
                                        <div key={rec} className="flex items-center gap-2 bg-[#120d09] border border-[#362920] rounded p-2 text-xs text-[#f4efe6]">
                                            <Database size={13} className="text-[#ef4444]" /> {rec}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 space-y-2.5 font-mono">
                                <button className="w-full py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] rounded font-agency font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
                                    <Network size={16} /> VIEW SUSPECT NETWORK GRAPH
                                </button>
                                <button className="w-full py-2.5 bg-[#241b15] hover:bg-[#2e221b] text-[#f4efe6] border border-[#4a382b] rounded font-agency font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                                    <FileText size={16} /> OPEN CASE DOSSIER
                                </button>
                            </div>

                            <div className="bg-[#2a1d12] border border-[#f59e0b]/40 rounded p-3 text-xs text-[#f59e0b] flex gap-2.5 font-typewriter">
                                <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-[10px] font-mono uppercase tracking-wider mb-0.5">AI VERIFICATION NOTICE</strong>
                                    Flagged patterns require analyst verification before warrant execution.
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

