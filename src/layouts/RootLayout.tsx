import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { AlertTriangle } from "lucide-react";

export function RootLayout() {
    return (
        <div className="flex h-screen bg-[#0d0b09] text-[#f4efe6] overflow-hidden font-typewriter relative">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <TopNav />
                <main className="flex-1 overflow-x-hidden overflow-y-auto relative pb-12">
                    <Outlet />

                    {/* Global Evidence Tape Disclaimer Overlay */}
                    <div className="pointer-events-none fixed bottom-2 left-64 right-0 flex justify-center z-50 px-4">
                        <div className="bg-[#1a130e]/95 backdrop-blur-md border border-[#ef4444]/40 text-[#f4efe6] px-4 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-2 shadow-2xl pointer-events-auto border-l-4 border-l-[#ef4444]">
                            <AlertTriangle size={13} className="text-[#ef4444] animate-pulse" />
                            <span className="font-bold text-[#ef4444] tracking-wider">AGENCY WARNING:</span>
                            <span>AI flags require analyst verification before warrant authorization.</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

