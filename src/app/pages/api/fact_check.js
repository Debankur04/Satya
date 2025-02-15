export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Only GET requests allowed" });
    }
  
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
  
    const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_FACT_CHECK_API_KEY;
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Fact Check API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  