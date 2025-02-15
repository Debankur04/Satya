import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { url, type } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const docRef = await addDoc(collection(db, type), { url, createdAt: new Date() });
    res.status(200).json({ id: docRef.id, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
