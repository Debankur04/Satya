export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const { imageUrl } = req.body;
        const response = await fetch(`https://api.sightengine.com/1.0/check.json?url=${imageUrl}&models=ai-generated&api_user=${process.env.NEXT_PUBLIC_FIREBASE_SIGHTENGINE_USER}&api_secret=${process.env.NEXT_PUBLIC_FIREBASE_SIGHTENGINE_SECRET}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}