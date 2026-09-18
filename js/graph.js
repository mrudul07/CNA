// Cytoscape.js Network Graph Initialization & Interaction Controller

let cyOverview = null;
let cySpyFlow = null;

function initCytoscapeGraph(containerId, isSpyFlowMode = false) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const cyInstance = cytoscape({
        container: container,
        elements: mockGraphElements,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#1e293b',
                    'border-color': '#94a3b8',
                    'border-width': 2,
                    'label': 'data(label)',
                    'color': '#f8fafc',
                    'font-family': '"Courier Prime", monospace',
                    'font-size': '11px',
                    'font-weight': 'bold',
                    'text-valign': 'bottom',
                    'text-margin-y': 6,
                    'width': 36,
                    'height': 36,
                    'transition-property': 'background-color, border-color, bounds, shadow-blur',
                    'transition-duration': '0.35s'
                }
            },
            {
                selector: 'node[status="flagged"]',
                style: {
                    'background-color': '#7f1d1d',
                    'border-color': '#ef4444',
                    'border-width': 3,
                    'shadow-blur': 15,
                    'shadow-color': '#ef4444'
                }
            },
            {
                selector: 'node[status="review"]',
                style: {
                    'background-color': '#78350f',
                    'border-color': '#f59e0b',
                    'border-width': 3,
                    'shadow-blur': 10,
                    'shadow-color': '#f59e0b'
                }
            },
            {
                selector: 'node[type="person"]',
                style: { 'shape': 'ellipse' }
            },
            {
                selector: 'node[type="organization"]',
                style: { 'shape': 'rectangle' }
            },
            {
                selector: 'node[type="phone"]',
                style: { 'shape': 'diamond' }
            },
            {
                selector: 'node[type="vehicle"]',
                style: { 'shape': 'triangle' }
            },
            {
                selector: 'node[type="location"]',
                style: { 'shape': 'pentagon' }
            },
            {
                selector: 'node[type="case"]',
                style: { 'shape': 'star' }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2.5,
                    'line-color': '#ef4444',
                    'line-style': 'solid',
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle-backcurve',
                    'target-arrow-color': '#ef4444',
                    'arrow-scale': 1.3,
                    'label': 'data(relationship)',
                    'color': '#f8fafc',
                    'font-size': '9px',
                    'font-family': '"Courier Prime", monospace',
                    'text-background-color': '#070a12',
                    'text-background-opacity': 0.85,
                    'text-background-padding': '3px',
                    'text-rotation': 'autorotate',
                    'transition-property': 'width, line-color',
                    'transition-duration': '0.3s'
                }
            },
            {
                selector: 'node:selected',
                style: {
                    'border-color': '#38bdf8',
                    'border-width': 4,
                    'shadow-blur': 20,
                    'shadow-color': '#38bdf8'
                }
            }
        ],
        layout: {
            name: 'cose',
            animate: true,
            animationDuration: 700,
            animationEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            refresh: 20,
            fit: true,
            padding: 40,
            nodeRepulsion: 8500,
            idealEdgeLength: 100
        }
    });

    // Node click event listener -> open Entity Drawer with animation
    cyInstance.on('tap', 'node', function (evt) {
        const node = evt.target;
        const entityId = node.id();
        const entity = mockEntities.find(e => e.id === entityId) || {
            id: entityId,
            name: node.data('label'),
            type: node.data('type') || 'subject',
            status: node.data('status') || 'normal',
            connections: 14,
            cases: 2,
            importance: node.data('importance') || 'Medium',
            details: { "Flag": node.data('status') }
        };
        openEntityDrawer(entity);
    });

    // Hover tooltip telemetry & node scale pop animation
    const tooltip = document.getElementById('spy-graph-tooltip');
    if (tooltip) {
        cyInstance.on('mouseover', 'node', function (evt) {
            const node = evt.target;
            const pos = evt.renderedPosition;

            // Animate node size up on hover
            node.animate({
                style: { 'width': 44, 'height': 44 }
            }, {
                duration: 200
            });

            tooltip.style.left = (pos.x + 20) + 'px';
            tooltip.style.top = (pos.y + 20) + 'px';
            tooltip.innerHTML = `
                <div class="font-bold text-red-400 font-mono text-xs mb-1">TARGET IDENT: ${node.id()}</div>
                <div class="text-white font-serif text-sm font-semibold">${node.data('label')}</div>
                <div class="text-xs text-slate-300 font-mono mt-1">STATUS: <span class="uppercase text-amber-400">${node.data('status')}</span></div>
            `;
            tooltip.classList.remove('hidden');
        });

        cyInstance.on('mouseout', 'node', function (evt) {
            const node = evt.target;
            node.animate({
                style: { 'width': 36, 'height': 36 }
            }, {
                duration: 200
            });
            tooltip.classList.add('hidden');
        });
    }

    return cyInstance;
}

function filterCytoscapeGraph(cyInstance, category) {
    if (!cyInstance) return;
    cyInstance.batch(function () {
        if (category === 'all') {
            cyInstance.elements().style('display', 'element');
        } else {
            cyInstance.nodes().each(function (node) {
                if (node.data('type') === category || node.data('status') === category) {
                    node.style('display', 'element');
                    node.connectedEdges().style('display', 'element');
                } else {
                    node.style('display', 'none');
                }
            });
        }
    });
}
