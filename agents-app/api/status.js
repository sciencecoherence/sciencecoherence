// Vercel Serverless Function — GET /api/status
module.exports = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const hasKey = !!process.env.OPENAI_API_KEY &&
        process.env.OPENAI_API_KEY !== 'sk-your-key-here';

    res.json({
        apiKeyConfigured: hasKey,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        agentCount: 6
    });
};
