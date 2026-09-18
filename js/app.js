// Application Main Controller - Router, UI Handlers & State Management

let currentView = 'briefing';
let currentDashboardPosition = 'top'; // 'top' or 'side'
let activeFilter = 'all';
let pendingLoginRoleKey = null;

document.addEventListener('DOMContentLoaded', () => {
    initVideoIntroTransition();
    initRouter();
    renderAllViews();
    initGlobalListeners();
    updateRoleUI();
});

// 0. Full-Screen Video Intro Transition Controller
function initVideoIntroTransition() {
    const introWrapper = document.getElementById('intro-wrapper');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    let transitionTriggered = false;

    document.body.classList.add('scroll-locked');

    function triggerIntroExit() {
        if (transitionTriggered) return;
        transitionTriggered = true;

        if (introWrapper) {
            introWrapper.classList.add('intro-exit');
        }

        if (mainContent) {
            mainContent.classList.remove('main-content-hidden');
            mainContent.classList.add('main-content-visible');
        }

        setTimeout(() => {
            document.body.classList.remove('scroll-locked');
            if (introWrapper) {
                introWrapper.style.display = 'none';
            }
        }, 1000);
    }

    if (introVideo) {
        introVideo.addEventListener('ended', triggerIntroExit);
        introVideo.play().catch(() => {});
    }

    if (introWrapper) {
        introWrapper.addEventListener('click', triggerIntroExit);
    }
}

// 0.1 Proper Login Authentication Workflow
function openProperLoginModal(roleKey) {
    if (!ROLES[roleKey]) return;
    pendingLoginRoleKey = roleKey;
    
    const modal = document.getElementById('modal-proper-login');
    const titleEl = document.getElementById('login-modal-title');
    
    if (titleEl) {
        titleEl.innerText = `PROPER LOGIN — ${ROLES[roleKey].title.toUpperCase()}`;
    }

    if (modal) {
        modal.classList.remove('hidden');
        const modalBody = modal.querySelector('.bg-slate-900');
        if (modalBody) {
            modalBody.classList.remove('animate-modal-pop');
            void modalBody.offsetWidth;
            modalBody.classList.add('animate-modal-pop');
        }
    }
}

function submitProperLogin(event) {
    event.preventDefault();
    const badge = document.getElementById('login-badge-id').value;
    const unit = document.getElementById('login-unit-name').value;

    if (pendingLoginRoleKey && ROLES[pendingLoginRoleKey]) {
        currentRole = ROLES[pendingLoginRoleKey];
        currentOfficerSession = { badge: badge, unit: unit };
        updateRoleUI();

        document.getElementById('modal-proper-login').classList.add('hidden');
        window.location.hash = 'profiles';
        alert(`AUTHENTICATION SUCCESSFUL!\nLogged in as ${currentRole.title}\nOfficer Badge: ${badge} (${unit})\nRedirecting to Criminal Profiles & Evidence Workspace...`);
    }
}

function updateRoleUI() {
    const roleBadgeEl = document.getElementById('active-role-badge');
    if (roleBadgeEl) {
        roleBadgeEl.innerHTML = `<span class="text-amber-400 font-bold">${currentRole.icon} ${currentRole.title.toUpperCase()}</span> <span class="text-slate-400 text-[10px]">(${currentOfficerSession.badge})</span>`;
    }

    document.querySelectorAll('.nav-tab').forEach(tab => {
        const view = tab.dataset.view;
        if (currentRole.allowedViews.includes(view)) {
            tab.classList.remove('opacity-40', 'pointer-events-none');
            tab.style.display = 'flex';
        } else {
            tab.classList.add('opacity-40', 'pointer-events-none');
            tab.style.display = 'none';
        }
    });
}

// Ingest Intel Dropdown Toggle
function toggleIngestMenu() {
    const menu = document.getElementById('ingest-dropdown-menu');
    if (menu) {
        menu.classList.toggle('hidden');
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('animate-dropdown');
        }
    }
}

function openIngestionModal(type) {
    const menu = document.getElementById('ingest-dropdown-menu');
    if (menu) menu.classList.add('hidden');

    if (type === 'call') document.getElementById('modal-call-feed').classList.remove('hidden');
    if (type === 'loc') document.getElementById('modal-loc-feed').classList.remove('hidden');
    if (type === 'fir') window.location.hash = 'fir-form';
}

// Dynamic Co-Suspect Field Row Addition
function addCoSuspectRow() {
    const container = document.getElementById('co-suspects-input-list');
    if (!container) return;

    const div = document.createElement('div');
    div.className = "co-suspect-row flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 animate-dropdown";
    div.innerHTML = `
        <input type="text" placeholder="Co-Suspect Name" required class="co-name w-1/3 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white">
        <input type="text" placeholder="Relationship / Role (e.g. Driver)" required class="co-role w-1/3 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-amber-300">
        <input type="text" placeholder="Contact / Vehicle Plate" class="co-contact w-1/3 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300">
        <button type="button" onclick="this.parentElement.remove()" class="text-red-400 font-bold text-xs px-2 hover:text-red-300">✕</button>
    `;
    container.appendChild(div);
}

// 1. Router & Hash Controller
function initRouter() {
    function handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'briefing';
        switchView(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    
    const initialHash = window.location.hash.replace('#', '') || 'briefing';
    switchView(initialHash);
}

function switchView(viewId) {
    const validViews = ['briefing', 'login', 'profiles', 'fir-form', 'alerts', 'overview', 'spy-flow', 'cases', 'subjects', 'timeline', 'ai-engine', 'data', 'audit'];
    if (!validViews.includes(viewId)) viewId = 'overview';

    currentView = viewId;

    document.querySelectorAll('.view-container').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('animate-view-stagger');
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        targetView.classList.remove('hidden');
        void targetView.offsetWidth;
        targetView.classList.add('animate-view-stagger');
    }

    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.dataset.view === viewId) {
            tab.classList.add('bg-red-950/70', 'border-red-600', 'text-white');
            tab.classList.remove('border-transparent', 'text-slate-400', 'hover:bg-slate-800/40');
            
            const indicator = tab.querySelector('.nav-pin-indicator');
            if (indicator) indicator.classList.remove('hidden');
        } else {
            tab.classList.remove('bg-red-950/70', 'border-red-600', 'text-white');
            tab.classList.add('border-transparent', 'text-slate-400', 'hover:bg-slate-800/40');
            
            const indicator = tab.querySelector('.nav-pin-indicator');
            if (indicator) indicator.classList.add('hidden');
        }
    });

    if (viewId === 'overview') {
        setTimeout(() => {
            if (!cyOverview) {
                cyOverview = initCytoscapeGraph('cy-overview-container');
            } else {
                cyOverview.resize();
                cyOverview.fit();
            }
        }, 100);
    } else if (viewId === 'spy-flow') {
        setTimeout(() => {
            if (!cySpyFlow) {
                cySpyFlow = initCytoscapeGraph('cy-spyflow-container', true);
            } else {
                cySpyFlow.resize();
                cySpyFlow.fit();
            }
        }, 100);
    }
}

// 2. Render All Views
function renderAllViews() {
    renderKPIs();
    renderAlerts();
    renderCases();
    renderProfilesView();
    renderSubjectsTable();
    renderTimeline();
    renderDataInference();
    renderAuditLedger();
}

// 2.1 Render Criminal Profiles Workspace Page
function renderProfilesView() {
    const container = document.getElementById('criminal-profiles-grid');
    if (!container) return;

    const persons = mockEntities.filter(e => e.type === 'person');

    container.innerHTML = persons.map(p => {
        const detailsHTML = Object.entries(p.details || {}).map(([key, val]) => `
            <div class="flex items-start justify-between gap-2 py-1 border-b border-slate-800/60 text-xs font-mono">
                <span class="text-slate-400 uppercase font-bold">${key}:</span>
                <span class="text-amber-300 text-right">${Array.isArray(val) ? val.join(', ') : val}</span>
            </div>
        `).join('');

        return `
            <div class="glass-card p-5 rounded-xl relative group flex flex-col justify-between space-y-4">
                <div>
                    <div class="flex items-start justify-between border-b border-slate-800 pb-3 mb-3">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-lg bg-slate-950 border border-red-800 flex items-center justify-center font-bold text-red-500 font-mono text-lg shadow-md">
                                👤
                            </div>
                            <div>
                                <span class="font-mono text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 border border-red-800 rounded">${p.id}</span>
                                <h3 class="font-serif text-lg font-bold text-white mt-0.5">${p.name}</h3>
                            </div>
                        </div>
                        <span class="confidential-stamp text-[9px]">${p.status}</span>
                    </div>

                    <div class="space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 mb-3">
                        ${detailsHTML}
                    </div>
                </div>

                <div class="border-t border-slate-800 pt-3">
                    <form onsubmit="addNewProfileAttribute(event, '${p.id}')" class="space-y-2">
                        <div class="flex items-center gap-2">
                            <input type="text" placeholder="Attribute (e.g. Gang Name)" required class="attr-key-input w-1/2 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white placeholder-slate-500 font-mono">
                            <input type="text" placeholder="Value (e.g. Shadow Cartel)" required class="attr-val-input w-1/2 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-amber-300 placeholder-slate-500 font-mono">
                        </div>
                        <button type="submit" class="w-full py-1.5 bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700/80 rounded font-mono font-bold text-xs transition-colors flex items-center justify-center gap-1">
                            <span>+ ADD CUSTOM INTEL FIELD</span>
                        </button>
                    </form>
                </div>
            </div>
        `;
    }).join('');
}

function addNewProfileAttribute(event, entityId) {
    event.preventDefault();
    const form = event.target;
    const key = form.querySelector('.attr-key-input').value.trim();
    const val = form.querySelector('.attr-val-input').value.trim();

    const entity = mockEntities.find(e => e.id === entityId);
    if (entity && key && val) {
        if (!entity.details) entity.details = {};
        entity.details[key] = val;
        renderAllViews();
        alert(`✅ INTEL ATTRIBUTE ADDED TO ${entity.name}!\n${key}: ${val}`);
    }
}

// Comprehensive Criminal Profile & Co-Suspect Creation
function createNewCriminalProfile(event) {
    event.preventDefault();
    
    // Primary Suspect Details
    const name = document.getElementById('new-suspect-name').value;
    const aliases = document.getElementById('new-suspect-aliases').value;
    const ageGender = document.getElementById('new-suspect-age-gender').value;
    const location = document.getElementById('new-suspect-location').value;
    const idProof = document.getElementById('new-suspect-idproof').value;
    const gang = document.getElementById('new-suspect-gang').value;
    const crimeType = document.getElementById('new-suspect-crime-type').value;
    const marks = document.getElementById('new-suspect-marks').value;
    const phoneNo = document.getElementById('new-suspect-phone').value;
    const vehicle = document.getElementById('new-suspect-vehicle').value;
    const risk = document.getElementById('new-suspect-risk').value;

    const primaryId = `PER-0${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Extract Co-Suspects
    const coSuspectRows = document.querySelectorAll('.co-suspect-row');
    const coSuspectsList = [];

    coSuspectRows.forEach(row => {
        const coName = row.querySelector('.co-name').value.trim();
        const coRole = row.querySelector('.co-role').value.trim();
        const coContact = row.querySelector('.co-contact').value.trim();

        if (coName) {
            const coId = `PER-0${Math.floor(1000 + Math.random() * 9000)}`;
            coSuspectsList.push(`${coName} (${coRole})`);

            // Add Co-Suspect as secondary profile
            mockEntities.unshift({
                id: coId,
                name: coName,
                type: "person",
                connections: 2,
                cases: 1,
                status: "review",
                importance: "Medium",
                community: "C-CO-SUSPECT",
                details: {
                    "Role": coRole,
                    "Linked Primary Suspect": `${name} (${primaryId})`,
                    "Contact / Plate": coContact || "N/A"
                }
            });

            // Add graph link
            mockGraphElements.push({
                data: { id: coId, label: coName, type: "person", status: "review", importance: "Medium" }
            });
            mockGraphElements.push({
                data: { id: `e-co-${Date.now()}-${Math.random()}`, source: primaryId, target: coId, relationship: coRole.toUpperCase() }
            });
        }
    });

    // Primary Suspect Entity
    mockEntities.unshift({
        id: primaryId,
        name: name,
        type: "person",
        connections: 2 + coSuspectsList.length,
        cases: 1,
        status: "flagged",
        importance: "High",
        community: "C-PRIMARY",
        details: {
            "Known aliases": [aliases],
            "Age & Gender": ageGender,
            "ID / Aadhaar": idProof,
            "Territory Location": location,
            "Gang Affiliation": gang || "Independent",
            "M.O. Crime Type": crimeType,
            "Physical Marks": marks || "None Sighted",
            "Phone / SIM": phoneNo || "N/A",
            "Vehicle Plate": vehicle || "N/A",
            "Risk Score": `${risk} / 100`,
            "Linked Co-Suspects": coSuspectsList.length > 0 ? coSuspectsList.join(', ') : "None Registered",
            "Ingested By": `${currentOfficerSession.badge} (${currentOfficerSession.unit})`
        }
    });

    // Add Primary Suspect Graph Node
    mockGraphElements.push({
        data: { id: primaryId, label: name, type: "person", status: "flagged", importance: "High" }
    });

    renderAllViews();
    alert(`✅ COMPREHENSIVE CRIMINAL RECORD CREATED!\nPrimary Target: ${primaryId} - ${name}\nCo-Suspects Linked: ${coSuspectsList.length}`);
    document.getElementById('modal-create-profile').classList.add('hidden');
}

// 3. Render Polaroid KPI Cards
function renderKPIs() {
    const kpiData = [
        { label: "PRIMARY TARGETS", val: mockEntities.length.toString(), sub: "6 Flagged Bridge Entities", trend: "HIGH ANOMALY", icon: "👤", badge: "HIGH RISK" },
        { label: "CONNECTED LINKS", val: mockGraphElements.filter(e => e.data.source).length.toString(), sub: "Directional Call & Financial Links", trend: "EXPANDING", icon: "🔗", badge: "CLASSIFIED" },
        { label: "COMMUNITY CLUSTERS", val: "4", sub: "Distinct Regional Networks", trend: "DETECTED", icon: "🌐", badge: "BRIDGE FOUND" },
        { label: "AI RISK INDEX", val: "88.4%", sub: "Graph Neural Anomaly Score", trend: "+14.2%", icon: "⚡", badge: "CRITICAL" }
    ];

    const kpiHTML = kpiData.map(item => `
        <div class="polaroid-card group">
            <div class="push-pin-red"></div>
            <div class="flex items-center justify-between text-xs font-mono font-bold text-slate-500 mb-1">
                <span>${item.label}</span>
                <span class="text-red-600 font-bold">${item.icon}</span>
            </div>
            <div class="font-typewriter text-3xl font-bold text-slate-900 my-1">${item.val}</div>
            <div class="text-xs text-slate-600 font-mono">${item.sub}</div>
            <div class="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-red-700 uppercase">${item.trend}</span>
                <span class="confidential-stamp text-[9px]">${item.badge}</span>
            </div>
        </div>
    `).join('');

    const topDock = document.getElementById('top-board-dock');
    const sideDock = document.getElementById('side-rack-dock');

    if (topDock) topDock.innerHTML = kpiHTML;
    if (sideDock) sideDock.innerHTML = kpiHTML;

    updateDashboardPositionUI();
}

function setDashboardPosition(pos) {
    currentDashboardPosition = pos;
    updateDashboardPositionUI();
}

function updateDashboardPositionUI() {
    const topDock = document.getElementById('top-board-dock');
    const sideDock = document.getElementById('side-rack-dock');
    const btnTop = document.getElementById('btn-pos-top');
    const btnSide = document.getElementById('btn-pos-side');

    if (currentDashboardPosition === 'top') {
        if (topDock) topDock.classList.remove('hidden');
        if (sideDock) sideDock.classList.add('hidden');
        if (btnTop) btnTop.className = "px-3 py-1 text-xs font-mono font-bold rounded bg-red-800 text-white shadow-md border border-red-500 flex items-center gap-1 transition-transform hover:scale-105";
        if (btnSide) btnSide.className = "px-3 py-1 text-xs font-mono font-bold rounded bg-slate-800 text-slate-400 hover:text-white border border-slate-700 flex items-center gap-1 transition-transform hover:scale-105";
    } else {
        if (topDock) topDock.classList.add('hidden');
        if (sideDock) sideDock.classList.remove('hidden');
        if (btnSide) btnSide.className = "px-3 py-1 text-xs font-mono font-bold rounded bg-red-800 text-white shadow-md border border-red-500 flex items-center gap-1 transition-transform hover:scale-105";
        if (btnTop) btnTop.className = "px-3 py-1 text-xs font-mono font-bold rounded bg-slate-800 text-slate-400 hover:text-white border border-slate-700 flex items-center gap-1 transition-transform hover:scale-105";
    }
}

// 4. Render Alerts List
function renderAlerts() {
    const alertsContainer = document.getElementById('alerts-list-container');
    if (!alertsContainer) return;

    alertsContainer.innerHTML = mockAlerts.map(alt => `
        <div class="glass-card p-4 border-l-4 ${alt.severity === 'High' ? 'border-red-600' : 'border-amber-500'} rounded-lg relative group">
            <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 text-[10px] font-mono font-bold ${alt.severity === 'High' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'} rounded">
                    ANOMALY ${alt.anomalyScore * 100}%
                </span>
                <span class="text-xs text-slate-400 font-mono">${alt.date.substring(0, 10)}</span>
            </div>
            <h4 class="font-mono font-bold text-white text-sm mb-1">${alt.title}</h4>
            <p class="text-xs text-slate-300 mb-3">${alt.description}</p>
            <div class="flex items-center justify-between border-t border-slate-800/80 pt-2">
                <span class="text-xs text-slate-400 font-mono">TARGET: <strong class="text-amber-300">${alt.entityName}</strong></span>
                <button onclick="openEntityDrawerById('${alt.entityId}')" class="px-2 py-1 text-[11px] font-mono bg-red-900/40 text-red-300 border border-red-700/60 rounded hover:bg-red-800/60 transition-colors">
                    VIEW DOSSIER →
                </button>
            </div>
        </div>
    `).join('');
}

// 5. Render Classified Cases with PDF Link
function renderCases() {
    const casesContainer = document.getElementById('cases-grid-container');
    if (!casesContainer) return;

    casesContainer.innerHTML = mockCases.map(c => `
        <div class="glass-card p-5 rounded-xl relative group">
            <div class="flex items-start justify-between mb-3">
                <span class="font-mono text-xs font-bold text-amber-500 bg-amber-950/80 px-2 py-1 border border-amber-800/60 rounded">${c.id}</span>
                <span class="confidential-stamp text-[10px]">CLASSIFIED</span>
            </div>
            <h3 class="font-serif text-lg font-bold text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">${c.title}</h3>
            <p class="text-xs text-slate-400 mb-3 line-clamp-2">${c.description}</p>
            
            ${c.pdfAttached ? `
                <div class="mb-3 p-2 bg-slate-950 rounded border border-amber-900/60 flex items-center justify-between text-xs font-mono text-amber-400">
                    <span class="flex items-center gap-1">📄 <strong>ATTACHED PDF:</strong> ${c.pdfAttached}</span>
                    <span class="text-[10px] text-emerald-400 font-bold">[ VERIFIED ]</span>
                </div>
            ` : `
                <div class="mb-3 p-2 bg-slate-950/60 rounded border border-slate-800 text-[11px] font-mono text-slate-500">
                    📄 PDF Attachment: None (Optional)
                </div>
            `}

            <div class="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 bg-slate-950/80 p-2.5 rounded border border-slate-800">
                <div>ENTITIES: <strong class="text-white">${c.entityCount}</strong></div>
                <div>RELATIONS: <strong class="text-white">${c.relationshipCount}</strong></div>
                <div>PRIORITY: <strong class="text-red-400">${c.priority}</strong></div>
                <div>STATUS: <strong class="text-amber-400">${c.status}</strong></div>
            </div>
        </div>
    `).join('');
}

// 5.1 Submit Comprehensive FIR Form
function submitComprehensiveFIR(event) {
    event.preventDefault();
    const firNo = document.getElementById('fir-full-no').value;
    const station = document.getElementById('fir-full-station').value;
    const sections = document.getElementById('fir-full-sections').value;
    const complainant = document.getElementById('fir-full-complainant').value;
    const suspect = document.getElementById('fir-full-suspect').value;
    const title = document.getElementById('fir-full-title').value;
    const narrative = document.getElementById('fir-full-narrative').value;
    
    const pdfInput = document.getElementById('fir-full-pdf');
    let pdfFilename = null;
    if (pdfInput && pdfInput.files && pdfInput.files.length > 0) {
        pdfFilename = pdfInput.files[0].name;
    }

    mockCases.unshift({
        id: firNo,
        title: title,
        description: `${narrative} (FSS: ${station}, Sections: ${sections}, Complainant: ${complainant})`,
        status: "ACTIVE",
        date: "TODAY",
        entityCount: 3,
        relationshipCount: 9,
        priority: "High",
        pdfAttached: pdfFilename
    });

    if (suspect) {
        const newId = `PER-0${Math.floor(1000 + Math.random() * 9000)}`;
        mockEntities.unshift({
            id: newId,
            name: suspect,
            type: "person",
            connections: 1,
            cases: 1,
            status: "flagged",
            importance: "High",
            community: "C-FIR",
            details: {
                "Linked FIR": firNo,
                "Station Unit": station,
                "Legal Sections": sections,
                "Ingested By": `${currentOfficerSession.badge} (${currentOfficerSession.unit})`
            }
        });
    }

    renderAllViews();
    alert(`✅ COMPREHENSIVE FIR REGISTERED SUCCESSFUL!\nFIR No: ${firNo}\nStation: ${station}\nAttached PDF: ${pdfFilename || "None (Optional)"}\nRedirecting to Case Dossiers...`);
    window.location.hash = 'cases';
}

// 6. Render Master Subject Register Table
function renderSubjectsTable() {
    const tbody = document.getElementById('subjects-table-body');
    if (!tbody) return;

    const filtered = mockEntities.filter(e => activeFilter === 'all' || e.type === activeFilter || e.status === activeFilter);

    tbody.innerHTML = filtered.map(e => `
        <tr class="hover-row border-b border-slate-800/80 cursor-pointer" onclick="openEntityDrawerById('${e.id}')">
            <td class="p-3 font-mono text-xs font-bold text-red-400">${e.id}</td>
            <td class="p-3 font-serif font-bold text-slate-200">${e.name}</td>
            <td class="p-3 font-mono text-xs text-slate-400 uppercase">${e.type}</td>
            <td class="p-3 font-mono text-xs text-slate-300">${e.connections}</td>
            <td class="p-3 font-mono text-xs text-slate-300">${e.cases}</td>
            <td class="p-3">
                <span class="px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                    e.status === 'flagged' ? 'bg-red-950 text-red-400 border border-red-800' :
                    e.status === 'review' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-slate-800 text-slate-300 border border-slate-700'
                }">
                    ${e.status}
                </span>
            </td>
            <td class="p-3 font-mono text-xs font-bold ${e.importance === 'High' ? 'text-red-400' : 'text-slate-400'}">${e.importance}</td>
            <td class="p-3 text-right">
                <button class="px-2 py-1 text-xs font-mono text-slate-300 bg-slate-800 hover:bg-red-900/60 hover:text-red-200 rounded border border-slate-700 transition-colors">
                    OPEN DOSSIER
                </button>
            </td>
        </tr>
    `).join('');
}

function filterSubjects(category) {
    activeFilter = category;
    renderSubjectsTable();

    document.querySelectorAll('.filter-tab-btn').forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.className = "filter-tab-btn px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-red-900/80 text-white border border-red-600 shadow-md transform scale-105 transition-all";
        } else {
            btn.className = "filter-tab-btn px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-all";
        }
    });

    if (cySpyFlow) filterCytoscapeGraph(cySpyFlow, category);
}

// 7. Render Timeline
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = mockTimeline.map((item, idx) => `
        <div class="relative pl-8 pb-8 group">
            <div class="absolute left-3 top-4 bottom-0 w-0.5 bg-red-600/80 group-last:hidden animate-string-pulse"></div>
            <div class="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-slate-950 shadow-md shadow-red-500/50 transition-transform group-hover:scale-125"></div>
            
            <div class="glass-card p-4 rounded-xl">
                <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span class="text-amber-400 font-bold">${item.date}</span>
                    <span class="px-2 py-0.5 text-[10px] bg-red-950 text-red-400 border border-red-800 rounded uppercase font-bold">${item.type}</span>
                </div>
                <h4 class="font-serif text-base font-bold text-slate-100 mb-1">${item.title}</h4>
                <p class="text-xs text-slate-300 mb-2">${item.description}</p>
                <div class="text-xs font-mono text-slate-400 border-t border-slate-800 pt-2">
                    SUSPECT LINK: <strong class="text-slate-200">${item.entity}</strong>
                </div>
            </div>
        </div>
    `).join('');
}

// 8. Render Raw Data Storage
function renderDataInference() {
    const container = document.getElementById('data-ingestion-grid');
    if (!container) return;

    const sources = [
        { type: "CDR LOGS", count: "1,420,812", status: "SYNCED", icon: "📞", desc: "Telecommunication Call Data Records" },
        { type: "IP PACKETS", count: "892,104", status: "MONITORING", icon: "🌐", desc: "Encrypted Proxy & VPN Connections" },
        { type: "BANK TRANSFERS", count: "34,912", status: "FLAGGED", icon: "💳", desc: "Structured Multi-Bank Cash Flows" },
        { type: "ANPR CAMERAS", count: "4,192", status: "LIVE STREAM", icon: "📷", desc: "Automatic License Plate Recognition" }
    ];

    container.innerHTML = sources.map(s => `
        <div class="glass-card p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">${s.icon}</span>
                <span class="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 border border-emerald-800/60 rounded">${s.status}</span>
            </div>
            <h4 class="font-mono font-bold text-white text-sm mb-1">${s.type}</h4>
            <div class="font-typewriter text-xl text-amber-400 mb-1">${s.count}</div>
            <p class="text-xs text-slate-400">${s.desc}</p>
        </div>
    `).join('');
}

// 9. Render Audit Ledger
function renderAuditLedger() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;

    const logs = [
        { time: "2026-08-12 11:42:01", agent: "AGENT_49", action: "OPEN_DOSSIER", target: "Rahul Sharma (PER-00421)", status: "VERIFIED" },
        { time: "2026-08-12 11:30:15", agent: "AI_GRAPH_ENGINE", action: "RUN_COMMUNITY_DETECTION", target: "Louvain Algorithm", status: "SUCCESS" },
        { time: "2026-08-12 10:02:44", agent: "SYSTEM_ALERT", action: "TRIGGER_ANOMALY_ALERT", target: "ALT-001 Communication Burst", status: "LOGGED" },
        { time: "2026-08-12 09:15:20", agent: "AGENT_12", action: "EXPORT_EVIDENCE_PACKET", target: "FIR-2026-1104", status: "ENCRYPTED" }
    ];

    tbody.innerHTML = logs.map(l => `
        <tr class="hover-row border-b border-slate-800/80 text-xs font-mono text-slate-300">
            <td class="p-3 text-amber-400">${l.time}</td>
            <td class="p-3 font-bold text-red-400">${l.agent}</td>
            <td class="p-3 text-slate-200">${l.action}</td>
            <td class="p-3 text-slate-400">${l.target}</td>
            <td class="p-3 text-emerald-400 font-bold">${l.status}</td>
        </tr>
    `).join('');
}

// 10. Role Data Ingestion Handlers
function submitCallPersonFeed(event) {
    event.preventDefault();
    const callerName = document.getElementById('call-caller-name').value;
    const phoneNo = document.getElementById('call-phone-no').value;
    const notes = document.getElementById('call-transcript').value;

    const newId = `PHN-0${Math.floor(1000 + Math.random() * 9000)}`;
    mockEntities.push({
        id: newId,
        name: phoneNo,
        type: "phone",
        connections: 1,
        cases: 1,
        status: "flagged",
        importance: "High",
        community: "C-CALL",
        details: { "Caller": callerName, "Transcript": notes }
    });

    mockTimeline.unshift({
        id: `TL-CALL-${Date.now()}`,
        date: "JUST NOW",
        title: `Emergency Call Logged (${phoneNo})`,
        description: notes,
        entity: `${callerName} (${phoneNo})`,
        type: "COMMUNICATION",
        severity: "High"
    });

    renderAllViews();
    alert(`✅ CALL DATA INGESTED SUCCESSFUL!\nPhone Entity ${newId} Added.`);
    document.getElementById('modal-call-feed').classList.add('hidden');
}

function submitLocationPoliceFeed(event) {
    event.preventDefault();
    const vehicleNo = document.getElementById('loc-vehicle-no').value;
    const locationName = document.getElementById('loc-landmark').value;

    mockTimeline.unshift({
        id: `TL-LOC-${Date.now()}`,
        date: "JUST NOW",
        title: `Field Patrol Sighting (${vehicleNo})`,
        description: `ANPR Field Patrol spotted vehicle at ${locationName}`,
        entity: `${vehicleNo} @ ${locationName}`,
        type: "SURVEILLANCE",
        severity: "High"
    });

    renderAllViews();
    alert(`✅ FIELD SIGHTING RECORDED!\nVehicle ${vehicleNo} logged at ${locationName}.`);
    document.getElementById('modal-loc-feed').classList.add('hidden');
}

// 11. Entity Drawer Controllers
function openEntityDrawerById(entityId) {
    const entity = mockEntities.find(e => e.id === entityId) || {
        id: entityId,
        name: "Rahul Sharma",
        type: "person",
        status: "flagged",
        connections: 43,
        cases: 6,
        importance: "High",
        details: { "Risk Level": "CRITICAL", "Aliases": "R. Sharma" }
    };
    openEntityDrawer(entity);
}

function openEntityDrawer(entity) {
    const backdrop = document.getElementById('entity-drawer-backdrop');
    const panel = document.getElementById('entity-drawer-panel');

    if (!panel) return;

    document.getElementById('drawer-entity-id').innerText = entity.id;
    document.getElementById('drawer-entity-name').innerText = entity.name;
    document.getElementById('drawer-entity-type').innerText = entity.type.toUpperCase();
    document.getElementById('drawer-entity-status').innerText = entity.status.toUpperCase();
    document.getElementById('drawer-entity-connections').innerText = entity.connections;
    document.getElementById('drawer-entity-cases').innerText = entity.cases;
    document.getElementById('drawer-entity-importance').innerText = entity.importance;

    backdrop.classList.remove('hidden');
    setTimeout(() => panel.classList.add('open'), 10);
}

function closeEntityDrawer() {
    const backdrop = document.getElementById('entity-drawer-backdrop');
    const panel = document.getElementById('entity-drawer-panel');

    if (!panel) return;

    panel.classList.remove('open');
    setTimeout(() => backdrop.classList.add('hidden'), 350);
}

// 12. Search Bar & Global Keyboard Shortcuts
function initGlobalListeners() {
    const searchInput = document.getElementById('top-nav-search');
    const searchResults = document.getElementById('search-results-dropdown');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                searchResults.classList.add('hidden');
                return;
            }

            const matches = mockEntities.filter(ent => 
                ent.name.toLowerCase().includes(query) || ent.id.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(m => `
                    <div onclick="openEntityDrawerById('${m.id}'); document.getElementById('search-results-dropdown').classList.add('hidden');" class="p-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/80 flex items-center justify-between">
                        <div>
                            <div class="font-serif font-bold text-slate-100 text-sm">${m.name}</div>
                            <div class="font-mono text-xs text-red-400">${m.id}</div>
                        </div>
                        <span class="px-2 py-0.5 text-[10px] font-mono rounded uppercase bg-slate-800 text-slate-300 border border-slate-700">${m.type}</span>
                    </div>
                `).join('');
                searchResults.classList.remove('hidden');
            } else {
                searchResults.innerHTML = `<div class="p-3 text-xs text-slate-400 font-mono">No matching records found in agency registry.</div>`;
                searchResults.classList.remove('hidden');
            }
        });

        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('ingest-dropdown-menu');
            const btn = document.getElementById('btn-ingest-toggle');
            if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
                dropdown.classList.add('hidden');
            }

            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

// 13. AI Analysis Pipeline Terminal Simulator
function runAIPipeline() {
    const terminal = document.getElementById('ai-terminal-output');
    const progressBar = document.getElementById('ai-progress-bar');
    if (!terminal) return;

    terminal.innerHTML = '';
    const logs = [
        "[0.00s] INITIALIZING GRAPH NEURAL NETWORK MODEL (GNN-V4)...",
        "[0.42s] LOADING ADJACENCY MATRIX FOR 34 TARGET ENTITIES...",
        "[0.88s] EXECUTING LOUVAIN COMMUNITY DETECTION ALGORITHM...",
        "[1.35s] COMPUTING BETWEENNESS CENTRALITY & PAGERANK METRICS...",
        "[1.90s] DETECTED 6 BRIDGE NODES CROSSING COMMUNITY C-01 AND C-BRIDGE...",
        "[2.45s] ANOMALY SCORING COMPLETE: HIGH THREAT PATTERN CONFIRMED IN FIR-2026-1104."
    ];

    let step = 0;
    const interval = setInterval(() => {
        if (step < logs.length) {
            terminal.innerHTML += `<div class="text-emerald-400 font-mono text-xs leading-relaxed mb-1">${logs[step]}</div>`;
            terminal.scrollTop = terminal.scrollHeight;
            if (progressBar) progressBar.style.width = `${((step + 1) / logs.length) * 100}%`;
            step++;
        } else {
            clearInterval(interval);
        }
    }, 600);
}
