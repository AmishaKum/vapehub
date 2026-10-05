import express, { Request, Response } from "express";
import path from "path";
import { products } from "./products";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/vendor/gsap", express.static(path.join(__dirname, "..", "node_modules/gsap/dist")));
app.use("/vendor/motion", express.static(path.join(__dirname, "..", "node_modules/motion/dist")));

app.get("/api/health", (_req: Request, res: Response) => res.json({ ok: true }));
app.get("/api/products", (_req: Request, res: Response) => res.json(products));

interface Signup { email: string; at: string }
const signups: Signup[] = [];

app.post("/api/newsletter", (req: Request, res: Response) => {
  const email = String(req.body?.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email." });
  }
  signups.push({ email, at: new Date().toISOString() });
  res.json({ ok: true, message: "You're on the list. Fresh drops incoming!" });
});

app.listen(PORT, () => console.log(`Vape Hub running on http://localhost:${PORT}`));
