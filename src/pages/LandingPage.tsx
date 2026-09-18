import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ShieldAlert, Video, ArrowRight, Eye, Radio, Activity } from "lucide-react";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#0a0806] text-[#f4efe6] font-typewriter overflow-hidden flex flex-col justify-between">
            {/* Background CCTV Video Stream & Surveillance Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40 filter contrast-125 saturate-50 scale-105"
                >
                    <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-security-camera-recording-night-city-41484-large.mp4"
                        type="video/mp4"
                    />
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),transparent_70%)]" />
                </video>

                {/* CCTV Grid & Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,14,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-80" />
                
                {/* Radar Sweep Beam */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#ef4444]/20 pointer-events-none">
                    <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,rgba(239,68,68,0.25)_0deg,transparent_60deg)] animate-[spin_8s_linear_infinite]" />
                </div>

                {/* Overhead Spotlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,220,170,0.12)_0%,rgba(239,68,68,0.04)_50%,transparent_75%)] pointer-events-none" />
            </div>

            {/* Top Bar - Spy Telemetry HUD Header */}
            <header className="relative z-20 p-6 flex justify-between items-center border-b border-[#362920]/80 bg-[#140f0c]/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#ef4444]/20 border border-[#ef4444]/40 rounded text-[#ef4444] animate-pulse">
                        <ShieldAlert size={22} />
                    </div>
                    <div>
                        <span className="font-agency text-sm font-bold tracking-[0.3em] text-[#f4efe6] uppercase block">
                            L u x e &nbsp; L e v i a t h a n &nbsp; 4 9 &nbsp; A g e n c y
                        </span>
                        <span className="text-[10px] font-mono text-[#ef4444] tracking-widest font-semibold uppercase flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                            CLASSIFIED INTELLIGENCE BRIEFING // CASE #SIH-2026-X
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="hidden md:flex items-center gap-2 bg-[#1c1612] px-3 py-1.5 rounded border border-[#4a382b]">
                        <Radio size={14} className="text-[#ef4444] animate-pulse" />
                        <span className="text-[#a8988a]">CCTV FEED:</span>
                        <span className="text-[#22c55e] font-bold">LIVE STREAM 01</span>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#241b15] hover:bg-[#2e221b] text-[#f4efe6] border border-[#4a382b] px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                        <span>SKIP INTRO</span>
                        <ArrowRight size={14} className="text-[#ef4444]" />
                    </button>
                </div>
            </header>

            {/* Central Case Video Briefing Terminal */}
            <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
                <div className="confidential-stamp text-xs py-1 px-4 mb-4 text-[#ef4444] border-[#ef4444]">
                    TOP SECRET // CASE DOSSIER
                </div>

                <h1 className="text-3xl md:text-5xl font-agency font-bold text-[#f4efe6] tracking-wider uppercase mb-4 drop-shadow-2xl">
                    CRIMINAL NETWORK & SPY FLOW BRIEFING
                </h1>

                <p className="text-xs md:text-sm text-[#a8988a] max-w-2xl font-typewriter leading-relaxed mb-8 bg-[#140f0c]/90 p-4 rounded-lg border border-[#3d2e24] shadow-2xl">
                    Real-time AI surveillance, wiretap signal decoding, and criminal syndicate relationship mapping. Explore suspect webs, money flows, and critical field anomalies.
                </p>

                {/* CCTV Video Monitor HUD Box */}
                <div className="w-full max-w-2xl bg-[#16120e] border-2 border-[#ef4444]/60 rounded-xl p-4 shadow-2xl relative mb-8 backdrop-blur-lg">
                    {/* Corner Target Markers */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ef4444]" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ef4444]" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#ef4444]" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#ef4444]" />

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#a8988a] mb-2 pb-2 border-b border-[#362920]">
                        <span className="flex items-center gap-1.5 text-[#ef4444] font-bold">
                            <Video size={14} /> SURVEILLANCE CAM #04 - MONEY LAUNDERING CELL
                        </span>
                        <span className="text-[#f59e0b] font-bold">REC 🔴 00:04:29:14</span>
                    </div>

                    <div className="aspect-video bg-[#0a0806] rounded relative overflow-hidden border border-[#2a1e16] flex items-center justify-center group">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:scale-105 transition-transform duration-500"
                        >
                            <source
                                src="https://assets.mixkit.co/videos/preview/mixkit-security-camera-recording-night-city-41484-large.mp4"
                                type="video/mp4"
                            />
                        </video>

                        {/* Bounding Box on Suspect */}
                        <div className="absolute top-1/3 left-1/3 w-32 h-32 border-2 border-dashed border-[#ef4444] rounded flex flex-col justify-between p-1 animate-pulse">
                            <span className="text-[8px] font-mono bg-[#ef4444] text-[#ffffff] px-1 font-bold self-start">
                                TARGET #01 [FLAGGED]
                            </span>
                            <span className="text-[8px] font-mono text-[#ef4444] self-end font-bold">
                                MATCH 98.4%
                            </span>
                        </div>

                        {/* Center Play Overlay Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="absolute bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] px-6 py-3 rounded font-agency font-bold text-sm tracking-widest uppercase flex items-center gap-2 shadow-2xl transition-transform hover:scale-110 border border-[#ff6b6b]/40 z-20"
                        >
                            <Play fill="currentColor" size={18} /> LAUNCH WORKSTATION BOARD
                        </button>
                    </div>
                </div>

                {/* Action Launch Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] px-8 py-3.5 rounded font-agency font-bold text-sm tracking-[0.2em] uppercase flex items-center gap-3 shadow-2xl transition-transform hover:scale-105 border border-[#ff6b6b]/50"
                    >
                        <Eye size={18} /> ENTER CASE WORKSTATION BOARD
                    </button>
                    <button
                        onClick={() => navigate('/network')}
                        className="bg-[#241b15] hover:bg-[#2e221b] text-[#f4efe6] border border-[#4a382b] px-6 py-3.5 rounded font-agency font-bold text-sm tracking-wider uppercase flex items-center gap-2 transition-all"
                    >
                        <Activity size={18} className="text-[#ef4444]" /> VIEW SPY TACTICAL FLOW MAP
                    </button>
                </div>
            </main>

            {/* Bottom Telemetry Bar */}
            <footer className="relative z-20 p-4 border-t border-[#362920]/80 bg-[#140f0c]/90 backdrop-blur-md text-[10px] font-mono flex flex-col sm:flex-row items-center justify-between gap-2 text-[#a8988a]">
                <div className="flex items-center gap-4">
                    <span>SYS STATUS: <strong className="text-[#22c55e]">OPERATIONAL</strong></span>
                    <span>LAT 28.6139° N, LONG 77.2090° E</span>
                </div>
                <div className="text-[#ef4444] font-bold">
                    LUXE LEVIATHAN 49 AGENCY © 2026 // RESTRICTED ACCESS
                </div>
            </footer>
        </div>
    );
}
