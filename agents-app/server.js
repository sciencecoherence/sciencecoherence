// ============================================================
// SCIENCE OF COHERENCE — AGENT SERVER
// server.js
//
// Express backend that orchestrates 6 AI agents to generate
// content for the Science of Coherence portal.
// ============================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const { agents } = require('./agents');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure output directory exists
const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Track agent status
const agentStatus = {};
agents.forEach(a => {
    agentStatus[a.id] = { status: 'idle', lastRun: null, lastOutput: null };
});

// ── OpenAI client (lazy init) ──────────────────────────────
let openai = null;
function getOpenAI() {
    if (!openai) {
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-key-here') {
            return null;
        }
        openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return openai;
}

// ── API Routes ─────────────────────────────────────────────

// GET /api/agents — List all agents with their status
app.get('/api/agents', (req, res) => {
    const result = agents.map(agent => ({
        ...agent,
        systemPrompt: undefined, // Don't expose to frontend
        status: agentStatus[agent.id]
    }));
    res.json(result);
});

// GET /api/status — Check if API key is configured
app.get('/api/status', (req, res) => {
    const client = getOpenAI();
    res.json({
        apiKeyConfigured: !!client,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        outputDir: OUTPUT_DIR,
        agentCount: agents.length
    });
});

// POST /api/generate — Run an agent to generate content
app.post('/api/generate', async (req, res) => {
    const { agentId, contentTypeId, topic } = req.body;

    // Validate
    const agent = agents.find(a => a.id === agentId);
    if (!agent) {
        return res.status(400).json({ error: `Unknown agent: ${agentId}` });
    }

    const contentType = agent.contentTypes.find(c => c.id === contentTypeId);
    if (!contentType) {
        return res.status(400).json({ error: `Unknown content type: ${contentTypeId}` });
    }

    if (!topic || topic.trim().length === 0) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    const client = getOpenAI();
    if (!client) {
        return res.status(500).json({
            error: 'OpenAI API key not configured. Copy .env.example to .env and add your key.'
        });
    }

    // Update status
    agentStatus[agent.id] = { status: 'running', lastRun: new Date().toISOString(), lastOutput: null };

    try {
        const userPrompt = `${contentType.prompt} about the following topic:

TOPIC: ${topic}

Requirements:
- Write 800-1200 words of rich, detailed content
- Include at least 3 sections with <h2> headers
- Use <div class="bento-card"> for key concept cards
- Include <ul class="tech-list"> for protocol steps or key points
- Add <span class="tag">DOMAIN</span> tags where relevant
- End with a <span class="action-line"> takeaway
- Output ONLY the HTML content body — no <html>, <head>, or <body> tags
- Use the Science of Coherence terminology and writing style`;

        const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

        const completion = await client.chat.completions.create({
            model,
            messages: [
                { role: 'system', content: agent.systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            max_tokens: 4000,
            temperature: 0.8
        });

        const content = completion.choices[0].message.content;
        const tokens = completion.usage;

        // Wrap in full page HTML matching the sc2 portal style
        const fullHtml = generateFullPage(agent, topic, content);

        // Save to output directory
        const slug = topic
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 50);
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `${agent.domain}-${slug}-${timestamp}.html`;
        const filepath = path.join(OUTPUT_DIR, filename);

        fs.writeFileSync(filepath, fullHtml, 'utf8');

        // Update status
        agentStatus[agent.id] = {
            status: 'complete',
            lastRun: new Date().toISOString(),
            lastOutput: filename
        };

        res.json({
            success: true,
            agent: agent.name,
            filename,
            content, // raw HTML body for preview
            tokens: {
                prompt: tokens.prompt_tokens,
                completion: tokens.completion_tokens,
                total: tokens.total_tokens
            }
        });

    } catch (err) {
        agentStatus[agent.id] = { status: 'error', lastRun: new Date().toISOString(), lastOutput: null };

        console.error(`[${agent.name}] Error:`, err.message);
        res.status(500).json({
            error: err.message || 'Generation failed',
            agent: agent.name
        });
    }
});

// GET /api/output — List generated files
app.get('/api/output', (req, res) => {
    const files = fs.readdirSync(OUTPUT_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => {
            const stat = fs.statSync(path.join(OUTPUT_DIR, f));
            return {
                filename: f,
                size: stat.size,
                created: stat.birthtime,
                domain: f.split('-')[0]
            };
        })
        .sort((a, b) => new Date(b.created) - new Date(a.created));

    res.json(files);
});

// GET /api/output/:filename — Serve a generated file
app.get('/api/output/:filename', (req, res) => {
    const filepath = path.join(OUTPUT_DIR, req.params.filename);
    if (!fs.existsSync(filepath)) {
        return res.status(404).json({ error: 'File not found' });
    }
    res.sendFile(filepath);
});

// ── HTML Page Generator ────────────────────────────────────

function generateFullPage(agent, topic, contentHtml) {
    const themeMap = {
        regenesis: 'regenesis',
        cosmos: 'cosmos',
        ethos: 'ethos'
    };
    const theme = themeMap[agent.domain] || 'ethos';

    return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topic} | Science of Coherence</title>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Mono&family=Inter:wght@100;300;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../sc2/style.css">
</head>
<body class="bg-fx">
    <div class="shell">
        <header class="shell-header">
            <div class="shell-title">SCIENCE OF COHERENCE <span>·</span> ${agent.domain.toUpperCase()}</div>
            <div class="header-meta">
                <div>AGENT <span>${agent.name}</span></div>
                <div>GENERATED <span>${new Date().toISOString().slice(0, 10)}</span></div>
            </div>
            <a href="../sc2/index.html" class="btn-return">← PORTAL</a>
        </header>

        <nav class="shell-sidebar">
            <div class="nav-item active">${topic}</div>
        </nav>

        <main class="shell-main">
            <div class="module-panel">
                <div class="module-header">
                    <h1>${topic}</h1>
                    <p class="subtitle">Generated by ${agent.name} · ${agent.role}</p>
                </div>
                ${contentHtml}
            </div>
        </main>
    </div>
</body>
</html>`;
}

// ── Start Server ───────────────────────────────────────────

app.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════════╗');
    console.log('  ║  SCIENCE OF COHERENCE — Agent Dashboard      ║');
    console.log('  ╠══════════════════════════════════════════════╣');
    console.log(`  ║  Dashboard:  http://localhost:${PORT}             ║`);
    console.log(`  ║  API:        http://localhost:${PORT}/api/agents   ║`);
    console.log(`  ║  Output:     ./output/                       ║`);
    console.log('  ╚══════════════════════════════════════════════╝');
    console.log('');

    const client = getOpenAI();
    if (!client) {
        console.log('  ⚠  No OpenAI API key found.');
        console.log('     Copy .env.example to .env and add your key.');
        console.log('');
    } else {
        console.log(`  ✓  OpenAI connected (model: ${process.env.OPENAI_MODEL || 'gpt-4o-mini'})`);
        console.log('');
    }
});
