// ============================================================
// SCIENCE OF COHERENCE — AGENT DASHBOARD
// app.js — Frontend logic
// ============================================================

const API = '';
let agentsData = [];
let currentAgentId = null;
let lastGeneratedFilename = null;

// ── INITIALIZATION ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    initParticleCanvas();
    await checkStatus();
    await loadAgents();
    await loadOutputCount();
});

// ── API STATUS CHECK ───────────────────────────────────────

async function checkStatus() {
    try {
        const res = await fetch(`${API}/api/status`);
        const data = await res.json();
        const dot = document.querySelector('.status-dot');
        const text = document.getElementById('api-status');

        if (data.apiKeyConfigured) {
            dot.classList.remove('error');
            text.textContent = `CONNECTED · ${data.model.toUpperCase()}`;
        } else {
            dot.classList.add('error');
            text.textContent = 'API KEY MISSING';
        }
    } catch (e) {
        const dot = document.querySelector('.status-dot');
        const text = document.getElementById('api-status');
        dot.classList.add('error');
        text.textContent = 'SERVER OFFLINE';
    }
}

// ── LOAD AGENTS ────────────────────────────────────────────

async function loadAgents() {
    try {
        const res = await fetch(`${API}/api/agents`);
        agentsData = await res.json();
        renderFrames();
    } catch (e) {
        document.getElementById('frames-container').innerHTML = `
      <div class="frame-section" style="text-align: center; padding: 60px;">
        <p style="color: var(--text-dim); font-family: var(--font-data); font-size: 12px; letter-spacing: 2px;">
          UNABLE TO CONNECT TO SERVER<br>
          <span style="color: var(--text-muted); margin-top: 8px; display: block;">
            Run <strong>npm start</strong> in the agents-app directory
          </span>
        </p>
      </div>`;
    }
}

// ── RENDER FRAMES ──────────────────────────────────────────

function renderFrames() {
    const container = document.getElementById('frames-container');
    const domains = [
        { id: 'regenesis', label: 'REGENESIS', desc: 'REGENERATIVE BIOLOGY', icon: 'eco' },
        { id: 'cosmos', label: 'COSMOS', desc: 'UNIFIED PHYSICS', icon: 'public' },
        { id: 'ethos', label: 'ETHOS', desc: 'THE SCIENCE OF BEING', icon: 'self_improvement' }
    ];

    container.innerHTML = domains.map(domain => {
        const domainAgents = agentsData.filter(a => a.domain === domain.id);

        return `
      <section class="frame-section">
        <div class="frame-header">
          <span class="material-symbols-rounded frame-icon ${domain.id}">${domain.icon}</span>
          <div>
            <div class="frame-title">${domain.label}</div>
            <div class="frame-label">${domain.desc}</div>
          </div>
          <span class="frame-status-badge ${domain.id}">ACTIVE</span>
        </div>
        <div class="agents-row">
          ${domainAgents.map(agent => renderAgentCard(agent)).join('')}
        </div>
      </section>`;
    }).join('');
}

function renderAgentCard(agent) {
    const status = agent.status || { status: 'idle' };
    const statusLabel = status.status.toUpperCase();
    const statusClass = status.status;

    return `
    <div class="agent-card" id="card-${agent.id}" style="--card-accent: ${agent.color};">
      <div class="agent-top">
        <div class="agent-avatar ${agent.domain}">
          <span class="material-symbols-rounded">${agent.icon}</span>
        </div>
        <div>
          <div class="agent-name">${agent.name}</div>
          <div class="agent-role">${agent.role}</div>
        </div>
      </div>
      <div class="agent-desc">${agent.description}</div>
      <div class="agent-status">
        <span class="agent-status-dot ${statusClass}"></span>
        <span class="agent-status-text" id="status-${agent.id}">${statusLabel}</span>
      </div>
      <div class="agent-actions">
        <button class="btn-generate ${agent.domain}" onclick="openGenerateModal('${agent.id}')">
          <span class="material-symbols-rounded">bolt</span> GENERATE
        </button>
        ${status.lastOutput ? `
          <button class="btn-view" onclick="viewOutput('${status.lastOutput}')">VIEW LAST</button>
        ` : ''}
      </div>
      <div class="agent-loading" id="loading-${agent.id}">
        <div class="agent-loading-bar ${agent.domain}"></div>
      </div>
    </div>`;
}

// ── GENERATE MODAL ─────────────────────────────────────────

function openGenerateModal(agentId) {
    currentAgentId = agentId;
    const agent = agentsData.find(a => a.id === agentId);
    if (!agent) return;

    document.getElementById('gen-modal-title').textContent = `GENERATE · ${agent.name}`;

    // Populate content type dropdown
    const select = document.getElementById('gen-content-type');
    select.innerHTML = agent.contentTypes.map(ct =>
        `<option value="${ct.id}">${ct.label}</option>`
    ).join('');

    document.getElementById('gen-topic').value = '';
    document.getElementById('gen-submit').disabled = false;
    document.getElementById('generate-modal').classList.add('active');
}

function closeGenerateModal() {
    document.getElementById('generate-modal').classList.remove('active');
    currentAgentId = null;
}

// ── SUBMIT GENERATION ──────────────────────────────────────

async function submitGeneration() {
    if (!currentAgentId) return;

    const topic = document.getElementById('gen-topic').value.trim();
    const contentTypeId = document.getElementById('gen-content-type').value;

    if (!topic) {
        document.getElementById('gen-topic').style.borderColor = '#ff4444';
        setTimeout(() => {
            document.getElementById('gen-topic').style.borderColor = '';
        }, 2000);
        return;
    }

    // Close modal and show loading
    closeGenerateModal();
    setAgentStatus(currentAgentId, 'running', 'GENERATING...');
    showLoading(currentAgentId, true);

    try {
        const res = await fetch(`${API}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                agentId: currentAgentId,
                contentTypeId,
                topic
            })
        });

        const data = await res.json();

        if (data.success) {
            setAgentStatus(currentAgentId, 'complete',
                `COMPLETE · ${data.tokens.total} TOKENS`);
            lastGeneratedFilename = data.filename;
            showLoading(currentAgentId, false);
            loadOutputCount();

            // Show preview
            showPreview(data.agent, topic, data.content, data.filename);
        } else {
            setAgentStatus(currentAgentId, 'error', `ERROR: ${data.error}`);
            showLoading(currentAgentId, false);
        }
    } catch (e) {
        setAgentStatus(currentAgentId, 'error', 'CONNECTION ERROR');
        showLoading(currentAgentId, false);
    }
}

// ── STATUS HELPERS ─────────────────────────────────────────

function setAgentStatus(agentId, dotClass, text) {
    const card = document.getElementById(`card-${agentId}`);
    if (!card) return;

    const dot = card.querySelector('.agent-status-dot');
    const statusText = document.getElementById(`status-${agentId}`);

    dot.className = `agent-status-dot ${dotClass}`;
    if (statusText) statusText.textContent = text;
}

function showLoading(agentId, show) {
    const el = document.getElementById(`loading-${agentId}`);
    if (el) el.classList.toggle('active', show);
}

// ── OUTPUT COUNT ───────────────────────────────────────────

async function loadOutputCount() {
    try {
        const res = await fetch(`${API}/api/output`);
        const files = await res.json();
        document.getElementById('file-count').textContent = files.length;
    } catch (e) {
        // silent
    }
}

// ── PREVIEW MODAL ──────────────────────────────────────────

function showPreview(agentName, topic, content, filename) {
    lastGeneratedFilename = filename;
    document.getElementById('modal-title').textContent = `${agentName} · ${topic}`;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('preview-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('preview-modal').classList.remove('active');
}

async function viewOutput(filename) {
    try {
        const res = await fetch(`${API}/api/output/${filename}`);
        const html = await res.text();

        // Extract just the module-panel content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const panel = doc.querySelector('.module-panel');

        lastGeneratedFilename = filename;
        document.getElementById('modal-title').textContent = filename;
        document.getElementById('modal-body').innerHTML = panel
            ? panel.innerHTML
            : html;
        document.getElementById('preview-modal').classList.add('active');
    } catch (e) {
        console.error('Failed to load output:', e);
    }
}

function downloadOutput() {
    if (lastGeneratedFilename) {
        window.open(`${API}/api/output/${lastGeneratedFilename}`, '_blank');
    }
}

// ── PARTICLE CANVAS ────────────────────────────────────────

function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 60;
    const MAX_DIST = 140;

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
            ctx.fill();
        }
    }

    const particles = Array.from({ length: COUNT }, () => new Particle());

    function animate() {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < MAX_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 242, 255, ${(1 - d / MAX_DIST) * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}
