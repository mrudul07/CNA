import { useState } from "react";
import { MockService } from "../services/mockService";
import { BrainCircuit, Database, GitMerge, FileSearch, CheckCircle2, Play, Network, Pin } from "lucide-react";

export default function AIAnalysis() {
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState("");
    const [complete, setComplete] = useState(false);

    const startAnalysis = async () => {
        setAnalyzing(true);
        setComplete(false);
        setProgress(0);

        await MockService.runAIAnalysis((p, step) => {
            setProgress(p);
            setCurrentStep(step);
        });

        setAnalyzing(false);
        setComplete(true);
    };

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto h-full flex flex-col items-center justify-center font-typewriter relative z-10">
            <div className="text-center mb-10 bg-[#16120e] p-8 rounded-lg border border-[#3d2e24] shadow-2xl relative">
                <div className="push-pin-red" />
                <div className="bg-[#241b15] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#ef4444]/40 shadow-inner">
                    <BrainCircuit size={40} className="text-[#ef4444] animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-[#ef4444] font-bold tracking-widest uppercase mb-1">
                    AGENCY TELEGRAPH & GRAPH ML ENGINE
                </div>
                <h1 className="text-2xl md:text-3xl font-agency font-bold text-[#f4efe6] mb-3 uppercase tracking-wider">
                    AI-Powered Network Intelligence Pipeline
                </h1>
                <p className="text-xs text-[#a8988a] max-w-xl mx-auto leading-relaxed">
                    Ingest unstructured field data, wiretaps, CDR logs & bank records to map hidden suspect cells automatically.
                </p>
            </div>

            {!analyzing && !complete && (
                <button
                    onClick={startAnalysis}
                    className="bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] px-8 py-3.5 rounded font-agency font-bold text-base flex items-center gap-3 transition-transform hover:scale-105 shadow-2xl shadow-[#ef4444]/40 uppercase tracking-widest border border-[#ff6b6b]/40"
                >
                    <Play fill="currentColor" size={20} /> INITIATE TELEGRAPH AI ANALYSIS PIPELINE
                </button>
            )}

            {analyzing && (
                <div className="w-full max-w-2xl bg-[#16120e] border border-[#ef4444]/40 rounded-lg p-6 shadow-2xl relative">
                    <div className="push-pin-red" />
                    <div className="flex justify-between items-end mb-4 font-mono">
                        <div>
                            <span className="text-[10px] text-[#ef4444] font-bold uppercase tracking-widest block mb-1">EXECUTION IN PROGRESS</span>
                            <h3 className="text-sm font-bold text-[#f4efe6] mb-1 font-agency uppercase tracking-wider">ANALYZING EVIDENCE DATASET</h3>
                            <p className="text-[#ef4444] text-xs font-mono animate-pulse">{currentStep}</p>
                        </div>
                        <div className="text-2xl font-bold text-[#ef4444] font-mono">{progress}%</div>
                    </div>

                    <div className="h-3 bg-[#120d09] rounded overflow-hidden w-full border border-[#3d2e24]">
                        <div
                            className="h-full bg-[#ef4444] transition-all duration-300 ease-out shadow-[0_0_12px_#ef4444]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {complete && (
                <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <div className="bg-[#22c55e]/15 border border-[#22c55e]/40 rounded-lg p-4 mb-6 flex items-center justify-center gap-3 text-[#22c55e] font-agency uppercase font-bold tracking-wider">
                        <CheckCircle2 size={22} />
                        <h3>TELEGRAPH ANALYSIS COMPLETE - DOSSIER GENERATED</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="polaroid-card p-4 text-center">
                            <Database className="mx-auto mb-2 text-[#ef4444]" size={22} />
                            <div className="text-2xl font-typewriter font-bold text-[#1c1612] mb-0.5">742</div>
                            <div className="text-[9px] font-mono font-bold text-[#6e5d50] uppercase">Entities Extracted</div>
                        </div>
                        <div className="polaroid-card p-4 text-center">
                            <GitMerge className="mx-auto mb-2 text-[#d97706]" size={22} />
                            <div className="text-2xl font-typewriter font-bold text-[#1c1612] mb-0.5">5,281</div>
                            <div className="text-[9px] font-mono font-bold text-[#6e5d50] uppercase">Relationships Identified</div>
                        </div>
                        <div className="polaroid-card p-4 text-center">
                            <Network className="mx-auto mb-2 text-[#0284c7]" size={22} />
                            <div className="text-2xl font-typewriter font-bold text-[#1c1612] mb-0.5">18</div>
                            <div className="text-[9px] font-mono font-bold text-[#6e5d50] uppercase">Communities Mapped</div>
                        </div>
                        <div className="polaroid-card p-4 text-center border-l-4 border-l-[#ef4444]">
                            <FileSearch className="mx-auto mb-2 text-[#ef4444]" size={22} />
                            <div className="text-2xl font-typewriter font-bold text-[#ef4444] mb-0.5">27</div>
                            <div className="text-[9px] font-mono font-bold text-[#ef4444] uppercase">Critical Anomalies</div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button 
                            onClick={() => setComplete(false)} 
                            className="text-xs font-mono text-[#a8988a] hover:text-[#ef4444] underline underline-offset-4 uppercase font-bold"
                        >
                            Reset Pipeline Terminal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

