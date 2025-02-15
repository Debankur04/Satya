import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { type } = req.query;
    const querySnapshot = await getDocs(collection(db, type));
    const urls = querySnapshot.docs.map(doc => doc.data());

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
