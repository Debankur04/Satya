export default function handler(req, res) {
    const { imageUrl } = req.query;
  
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }
  
    const googleSearchURL = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`;
    res.redirect(googleSearchURL);
  }
  