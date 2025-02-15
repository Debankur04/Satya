export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
    }
  
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided!" });
    }
  
    const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
    const HF_MODEL_URL = "https://api-inference.huggingface.co/models/your-distilbert-model";
  
    try {
      const response = await fetch(HF_MODEL_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      });
  
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Hugging Face API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  