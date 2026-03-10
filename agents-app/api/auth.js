// Vercel Serverless Function — POST /api/auth
// Simple password gate to protect against unauthorized usage
module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body || {};
    const correctPassword = process.env.APP_PASSWORD;

    if (!correctPassword) {
        // If no password is set in env, deny all access
        return res.status(500).json({ error: 'App not configured' });
    }

    if (password === correctPassword) {
        return res.json({ authenticated: true });
    }

    return res.status(401).json({ error: 'Wrong password' });
};
