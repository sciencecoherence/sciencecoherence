// Vercel Serverless Function — POST /api/generate
const OpenAI = require('openai');
const { agents } = require('../lib/agents');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // ── Password check ─────────────────────────────────────
    const { agentId, contentTypeId, topic, password } = req.body || {};

    const correctPassword = process.env.APP_PASSWORD;
    if (!correctPassword || password !== correctPassword) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // ── Validate inputs ────────────────────────────────────
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

    // ── OpenAI client ──────────────────────────────────────
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-key-here') {
        return res.status(500).json({ error: 'OpenAI API key not configured.' });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // ── Generate content ───────────────────────────────────
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

        const completion = await openai.chat.completions.create({
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

        // Build the full downloadable HTML page
        const fullHtml = generateFullPage(agent, topic, content);

        res.json({
            success: true,
            agent: agent.name,
            content,       // raw HTML body for preview
            fullHtml,      // complete page for download
            tokens: {
                prompt: tokens.prompt_tokens,
                completion: tokens.completion_tokens,
                total: tokens.total_tokens
            }
        });

    } catch (err) {
        console.error(`[${agent.name}] Error:`, err.message);
        res.status(500).json({
            error: err.message || 'Generation failed',
            agent: agent.name
        });
    }
};

// ── HTML Page Generator ────────────────────────────────────

function generateFullPage(agent, topic, contentHtml) {
    const themeMap = {
        regenesis: 'regenesis',
        cosmos: 'cosmos',
        ethos: 'ethos'
    };
    const theme = themeMap[agent.domain] || 'ethos';
    const date = new Date().toISOString().slice(0, 10);

    return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topic} | Science of Coherence</title>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Mono&family=Inter:wght@100;300;600&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0a0e14; --text: #e0e0e0; --text-dim: #8892a4; --accent: ${agent.color}; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 24px; margin-bottom: 32px; }
        .header h1 { font-family: 'Syncopate', sans-serif; font-size: 20px; letter-spacing: 3px; margin-bottom: 8px; }
        .header .meta { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text-dim); letter-spacing: 2px; }
        h2 { font-family: 'Syncopate', sans-serif; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); border-left: 3px solid var(--accent); padding-left: 16px; margin: 32px 0 16px; }
        h3 { font-size: 16px; font-weight: 600; margin: 24px 0 12px; }
        p { color: var(--text-dim); margin-bottom: 16px; }
        strong { color: #fff; }
        .bento-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 20px; margin: 16px 0; }
        .tech-list { list-style: none; padding: 0; }
        .tech-list li { padding: 8px 0 8px 20px; border-left: 2px solid var(--accent); margin-bottom: 8px; color: var(--text-dim); font-size: 14px; }
        .tag { display: inline-block; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; background: rgba(255,255,255,0.05); border: 1px solid var(--accent); color: var(--accent); padding: 2px 10px; border-radius: 3px; text-transform: uppercase; }
        .action-line { display: block; font-weight: 600; color: var(--accent); margin-top: 24px; font-size: 15px; }
        .math-block { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 16px 20px; margin: 16px 0; font-family: 'Space Mono', monospace; font-size: 13px; color: var(--accent); }
        .accent-bar { height: 2px; background: linear-gradient(90deg, var(--accent), transparent); margin: 24px 0; }
        .eyebrow { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${topic}</h1>
            <div class="meta">SCIENCE OF COHERENCE · ${agent.domain.toUpperCase()} · ${agent.name} · ${date}</div>
        </div>
        ${contentHtml}
    </div>
</body>
</html>`;
}
