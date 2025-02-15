export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const { videoUrl } = req.body;
        const response = await fetch(`https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${process.env.NEXT_PUBLIC_FIREBASE_FACEPP_API_KEY}&api_secret=${process.env.NEXT_PUBLIC_FIREBASE_FACEPP_API_SECRET}&image_url=${videoUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}