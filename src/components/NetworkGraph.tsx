import { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
// @ts-ignore
import fcose from "cytoscape-fcose";
import type { GraphNode, GraphEdge } from "../types";
import { Radio, Crosshair, Zap, Eye, ShieldAlert } from "lucide-react";

cytoscape.use(fcose);

interface NetworkGraphProps {
    elements: (GraphNode | GraphEdge)[];
    onNodeClick?: (nodeId: string) => void;
    className?: string;
}

export function NetworkGraph({ elements, onNodeClick, className }: NetworkGraphProps) {
    const cyRef = useRef<cytoscape.Core | null>(null);
    const [hoveredNode, setHoveredNode] = useState<{ id: string; label: string; type: string } | null>(null);

    // Styling rules for the Spy Tactical Intelligence Map
    const stylesheet: any[] = [
        {
            selector: "node",
            style: {
                "background-color": "#ef4444",
                "label": "data(label)",
                "color": "#f4efe6",
                "font-family": "Courier Prime, monospace",
                "font-size": "10px",
                "font-weight": "bold",
                "text-valign": "bottom",
                "text-halign": "center",
                "text-margin-y": 6,
                "width": 28,
                "height": 28,
                "border-width": 3,
                "border-color": "#f4efe6",
                "transition-property": "background-color, border-color, width, height",
                "transition-duration": 200 as any,
            }
        },
        {
            selector: 'node[type = "person"]',
            style: { "shape": "ellipse", "background-color": "#dc2626", "border-color": "#f7f3eb" }
        },
        {
            selector: 'node[type = "organization"]',
            style: { "shape": "round-rectangle", "width": 32, "height": 32, "background-color": "#d97706", "border-color": "#f7f3eb" }
        },
        {
            selector: 'node[type = "phone"]',
            style: { "shape": "diamond", "background-color": "#0284c7", "border-color": "#f7f3eb" }
        },
        {
            selector: 'node[type = "vehicle"]',
            style: { "shape": "triangle", "background-color": "#7c3aed", "border-color": "#f7f3eb" }
        },
        {
            selector: 'node[type = "location"]',
            style: { "shape": "hexagon", "background-color": "#059669", "border-color": "#f7f3eb" }
        },
        {
            selector: 'node[type = "case"]',
            style: { "shape": "rectangle", "background-color": "#991b1b", "border-color": "#fbbf24" }
        },
        {
            selector: 'node[status = "flagged"]',
            style: { "border-width": 4, "border-color": "#fbbf24", "background-color": "#ef4444" }
        },
        {
            selector: 'node[importance = "High"]',
            style: { "width": 38, "height": 38 }
        },
        {
            selector: "edge",
            style: {
                "width": 3,
                "line-color": "#ef4444", // Spy String Flow Line
                "target-arrow-color": "#ef4444",
                "target-arrow-shape": "triangle-backcurve",
                "arrow-scale": 1.4,
                "curve-style": "bezier",
                "label": "data(relationship)",
                "font-size": "9px",
                "font-family": "Courier Prime, monospace",
                "color": "#f4efe6",
                "text-background-color": "#1c1612",
                "text-background-opacity": 0.85,
                "text-background-padding": "3px",
                "text-rotation": "autorotate",
                "text-margin-y": -7,
            }
        },
        {
            selector: ":selected",
            style: {
                "border-width": 5,
                "border-color": "#fbbf24",
                "line-color": "#fbbf24",
                "target-arrow-color": "#fbbf24"
            }
        }
    ];

    const layout = {
        name: "fcose",
        animate: true,
        animationDuration: 800,
        fit: true,
        padding: 40,
        nodeDimensionsIncludeLabels: true,
        randomize: true,
    };

    useEffect(() => {
        if (cyRef.current) {
            cyRef.current.on('tap', 'node', (evt) => {
                const node = evt.target;
                if (onNodeClick) onNodeClick(node.id());
            });

            cyRef.current.on('mouseover', 'node', (evt) => {
                const node = evt.target;
                node.style('border-color', '#fbbf24');
                node.connectedEdges().style('line-color', '#fbbf24');
                setHoveredNode({
                    id: node.id(),
                    label: node.data('label') || node.id(),
                    type: node.data('type') || 'Person'
                });
            });

            cyRef.current.on('mouseout', 'node', (evt) => {
                evt.target.removeStyle();
                evt.target.connectedEdges().removeStyle();
                setHoveredNode(null);
            });
        }

        return () => {
            if (cyRef.current) cyRef.current.removeAllListeners();
        };
    }, [onNodeClick]);

    return (
        <div className={`w-full h-full relative overflow-hidden ${className || ""}`}>
            {/* Spy Radar & Spotlight Lighting Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />

            {/* Spy Tac-Map Telemetry Top HUD */}
            <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none font-mono text-[10px]">
                <div className="flex items-center gap-3 bg-[#16120e]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#4a382b] text-[#f4efe6]">
                    <Radio size={14} className="text-[#ef4444] animate-pulse" />
                    <span>SPY FLOW TACTICAL RADAR</span>
                    <span className="text-[#22c55e] font-bold">LAT: 28.61° N // LONG: 77.20° E</span>
                </div>

                <div className="flex items-center gap-2 bg-[#16120e]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#4a382b] text-[#ef4444] font-bold">
                    <Crosshair size={14} className="animate-spin" />
                    <span>SURVEILLANCE FLOW: 120 KB/S</span>
                </div>
            </div>

            {/* Cytoscape Canvas */}
            <CytoscapeComponent
                elements={elements}
                stylesheet={stylesheet}
                style={{ width: "100%", height: "100%" }}
                layout={layout}
                cy={(cy) => { cyRef.current = cy; }}
                wheelSensitivity={0.2}
            />

            {/* Spy Hover Suspect Dossier Tooltip */}
            {hoveredNode && (
                <div className="absolute top-16 left-4 z-30 bg-[#1c1612]/95 backdrop-blur-md border border-[#ef4444] p-3 rounded-lg text-xs font-mono shadow-2xl text-[#f4efe6] animate-in fade-in slide-in-from-left-2 duration-150 pointer-events-none w-56">
                    <div className="flex items-center justify-between text-[9px] text-[#ef4444] font-bold uppercase mb-1 border-b border-[#362920] pb-1">
                        <span className="flex items-center gap-1"><Eye size={12} /> SUSPECT TARGET</span>
                        <span>LIVE TRACK</span>
                    </div>
                    <div className="font-bold font-agency text-sm uppercase text-[#f4efe6]">{hoveredNode.label}</div>
                    <div className="text-[10px] text-[#a8988a] mt-0.5">ID: {hoveredNode.id}</div>
                    <div className="mt-2 pt-1 border-t border-[#362920] flex justify-between items-center text-[9px]">
                        <span className="text-[#f59e0b] font-bold">RISK METER: HIGH</span>
                        <span className="text-[#22c55e] font-bold">FLOW OK</span>
                    </div>
                </div>
            )}

            {/* Evidence Legend Card */}
            <div className="absolute bottom-4 left-4 bg-[#1c1612]/95 backdrop-blur-md border border-[#4a382b] p-3.5 rounded-lg flex flex-col gap-2 text-xs z-20 shadow-2xl font-mono">
                <div className="text-[#ef4444] font-bold text-[10px] uppercase tracking-widest mb-0.5 border-b border-[#362920] pb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                        <ShieldAlert size={12} /> SPY MAP NODE LEGEND
                    </span>
                    <Zap size={10} className="text-[#f59e0b]" />
                </div>
                <div className="flex items-center gap-2 text-[#f4efe6]"><div className="w-3 h-3 rounded-full bg-[#dc2626] border border-[#f7f3eb]"></div> Suspect / Person Node</div>
                <div className="flex items-center gap-2 text-[#f4efe6]"><div className="w-3 h-3 rounded-sm bg-[#d97706] border border-[#f7f3eb]"></div> Syndicate Organization</div>
                <div className="flex items-center gap-2 text-[#f4efe6]"><div className="w-3 h-3 rotate-45 bg-[#0284c7] border border-[#f7f3eb]"></div> Wiretapped Phone</div>
                <div className="flex items-center gap-2 text-[#f4efe6]"><div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-[#7c3aed]"></div> Tracked Vehicle</div>
                <div className="flex items-center gap-2 text-[#f4efe6]"><div className="w-3 h-3 rounded-sm bg-[#059669]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div> Location Pin</div>
                <div className="mt-1 pt-1 border-t border-[#362920] text-[9px] text-[#ef4444] font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-0.5 bg-[#ef4444] inline-block" /> DIRECTIONAL FLOW YARN
                    </span>
                    <span className="text-[#22c55e]">► FLOW ACTIVE</span>
                </div>
            </div>
        </div>
    );
}


