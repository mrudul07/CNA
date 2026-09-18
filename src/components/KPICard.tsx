import { useState, useEffect } from "react";
import { cn } from "../utils/utils";
import { TrendingUp, TrendingDown, FileBadge } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    trend?: number;
    className?: string;
    formatValue?: (val: number) => string;
    severity?: "critical" | "warning" | "normal";
}

export function KPICard({ title, value, icon: Icon, trend, className, formatValue, severity = "normal" }: KPICardProps) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setAnimatedValue(value);
                clearInterval(timer);
            } else {
                setAnimatedValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    const displayValue = formatValue ? formatValue(animatedValue) : animatedValue.toLocaleString();

    return (
        <div className={cn(
            "polaroid-card p-5 pt-7 flex flex-col justify-between relative group cursor-pointer select-none",
            severity === "critical" ? "-rotate-1 border-l-4 border-l-[#ef4444]" :
            severity === "warning" ? "rotate-1 border-l-4 border-l-[#f59e0b]" :
            "-rotate-0.5",
            className
        )}>
            {/* Pushpin at top center */}
            <div className={severity === "critical" ? "push-pin-red" : "push-pin-bronze"} />

            {/* Header / Title */}
            <div className="flex items-start justify-between mb-3 relative z-10">
                <div>
                    <span className="text-[9px] font-mono text-[#ef4444] tracking-widest uppercase font-bold block mb-0.5">
                        EVIDENCE FILE #{title.slice(0, 3).toUpperCase()}
                    </span>
                    <h3 className="text-xs font-agency font-bold text-[#1c1612] uppercase tracking-wider leading-tight">
                        {title}
                    </h3>
                </div>
                <div className={cn(
                    "p-2 rounded bg-[#1c1612] text-[#f4efe6] border shadow-sm",
                    severity === "critical" ? "border-[#ef4444] text-[#ef4444]" :
                    severity === "warning" ? "border-[#f59e0b] text-[#f59e0b]" :
                    "border-[#4a382b]"
                )}>
                    <Icon size={18} />
                </div>
            </div>

            {/* Value Section */}
            <div className="relative z-10 my-1 bg-[#1a1410] p-3 rounded border border-[#3d2e24] shadow-inner text-[#f4efe6]">
                <div className="flex items-baseline justify-between">
                    <div className={cn(
                        "text-3xl font-typewriter font-bold tracking-tight",
                        severity === "critical" ? "text-[#ef4444]" :
                        severity === "warning" ? "text-[#f59e0b]" :
                        "text-[#f4efe6]"
                    )}>
                        {displayValue}
                    </div>
                    <FileBadge size={14} className="text-[#a8988a] opacity-50" />
                </div>

                {trend !== undefined && (
                    <div className={cn(
                        "text-[10px] font-mono flex items-center font-bold uppercase tracking-wider mt-1 pt-1 border-t border-[#2a1e16]",
                        trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                    )}>
                        {trend >= 0 ? (
                            <TrendingUp size={12} className="mr-1 text-[#22c55e]" />
                        ) : (
                            <TrendingDown size={12} className="mr-1 text-[#ef4444]" />
                        )}
                        <span>{Math.abs(trend)}% MONTHLY VARIANCE</span>
                    </div>
                )}
            </div>

            {/* Bottom Polaroid Tag */}
            <div className="flex items-center justify-between text-[9px] font-mono text-[#524438] mt-2 pt-1 border-t border-[#d8d0c2]">
                <span>RECORD ID: {Math.floor(value * 17) % 9000 + 1000}</span>
                <span className="font-bold text-[#ef4444] uppercase">CONFIDENTIAL</span>
            </div>
        </div>
    );
}

