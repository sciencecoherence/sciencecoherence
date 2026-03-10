// Vercel Serverless Function — GET /api/agents
const { agents } = require('../lib/agents');

module.exports = (req, res) => {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const result = agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        domain: agent.domain,
        color: agent.color,
        icon: agent.icon,
        description: agent.description,
        contentTypes: agent.contentTypes
        // systemPrompt excluded — never expose to frontend
    }));

    res.json(result);
};
