import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gemini SDK lazily, to prevent crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI Consultant will operate in mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instruction to guide the AI to act as the official AI Consultant of JardevTech
const JARDEV_TECH_PROMPT = `You are the official AI Technical Solutions Architect for JardevTech.
Your name is "Jarsila AI Architect" and you represent Jarsila Paul, the founder and lead dev.
Your goals are:
1. Help visitors understand what JardevTech can do: Custom High-Performance Websites, Responsive Web Apps, Clean Maintainable Code, and Highly Optimized SaaS platforms.
2. Assist users in planning/naming projects or scoping technical architectures.
3. Be professional, brilliant, friendly, and structured. 
4. Quote actual project tiers beautifully as requested:
   - "Stellar Landing Page": 100,000 UGX (Single-page custom layouts, responsive design, fast performance).
   - "Full-Stack Web Application": 100,000 - 1,000,000 UGX (Advanced databases, user panels, admin interfaces, rich components).
   - "Extended Maintenance Subscription": $50 USD per month (Unlimited minor adjustments, security audits, performance updates).
5. Highlight contact channels for immediate human collaboration:
   - Call direct at +256709290191
   - WhatsApp messaging at +254752581912
6. Emphasize JardevTech core tenets:
   - CUSTOM WEBSITES: Tailored to Perfection.
   - RESPONSIVE DESIGN: Flawless on Every Device.
   - CLEAN CODE: Scalable & Maintainable.
   - PERFORMANCE: Fast, Secure, Reliable (optimized core web vitals).
Keep your answers beautifully formatted using bullet points where appropriate, structured and concise. Say that JardevTech is represented by jarsila@jardevtech.com and Jarsila Paul can be reached at +256709290191 for calls and +254752581912 for WhatsApp! We Build. You Grow!`;

// API Routes
app.post("/api/consult", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages body. Must be an array of chat messages." });
      return;
    }

    // Format messages for the Gemini API call
    const userMessage = messages[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Fallback answers when API user is not configured yet
      let mockReply = "Hello! I am Jarsila AI Architect, representing founder Jarsila Paul. (Note: Running in offline mode). We build custom, ultra-fast websites and software systems. Let me know what you'd like to engineer!";
      if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("cost") || userMessage.toLowerCase().includes("price") || userMessage.toLowerCase().includes("how much")) {
        mockReply = "At JardevTech, Jarsila Paul offers extremely competitive, world-class rates:\n\n• **Custom Landing Pages**: 100,000 UGX (Micro-animations, super high speed)\n• **Full-Stack Web Apps**: 100,000 - 1,000,000 UGX (Interactive databases, auth panels, administrative suites)\n• **Extended Maintenance**: $50 USD per month flat subscription (unlimited support & edits)\n\nWould you like me to map out a custom blueprint representation for your needs? You can also direct call +256709290191 or WhatsApp at +254752581912.";
      } else if (userMessage.toLowerCase().includes("performance") || userMessage.toLowerCase().includes("tech")) {
        mockReply = "Founder Jarsila Paul specializes in modern high-performance technology layers: React, TypeScript, Vite, Tailwind CSS, Node.js Express, and secure Firestore. Our builds are hand-coded to load instantly on slow connections, ensuring a flawless customer experience.";
      }
      res.json({ reply: mockReply });
      return;
    }

    const ai = getGeminiClient();

    // Map the conversation history into GEMINI format if wanted, or send as historical context
    // Let's create a contents payload for generateContent. Represent system instructions in the config
    const contents: string[] = [];
    
    // Add context from the previous exchanges to respect history
    messages.forEach((m: any) => {
      if (m.role === "user") {
        contents.push(`User: ${m.content}`);
      } else if (m.role === "assistant") {
        contents.push(`Assistant: ${m.content}`);
      }
    });

    // Make sure we end with a final user instruction
    const promptString = contents.length > 0 ? contents.join("\n") + `\nAssistant:` : `User: ${userMessage}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptString,
      config: {
        systemInstruction: JARDEV_TECH_PROMPT,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I am here to guide you in launching your ultimate technical platform. Let's build together!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Consultation API Error:", error);
    res.status(500).json({ error: "Sorry, I had an error processing your inquiry. Please try again or email jardevtech@gmail.com directly!" });
  }
});

// Serve frontend assets
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production static server configured at:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JardevTech portfolio server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Error setting up server with Vite:", err);
});
