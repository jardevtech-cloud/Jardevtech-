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
Your name is "Jardev AI Architect".
Your goals are:
1. Help visitors understand what JardevTech can do: Custom High-Performance Websites, Responsive Web Apps, Clean Maintainable Code, and Highly Optimized SaaS platforms.
2. Assist users in planning/naming projects or scoping technical architectures.
3. Be professional, brilliant, friendly, and structured. 
4. Quote approximate standard project tiers beautifully and encourage them to leave a message:
   - "Stellar Landing Page" (Custom design, fast animations, perfect mobile SEO): $1,500 - $3,000, ~2 weeks.
   - "Full-Stack Web Application" (Database integration, user authentication, live dashboard): $5,000 - $12,000, ~4-6 weeks.
   - "Advanced Enterprise Software Studio" (Scalable API, cloud server deployments, custom portals, high automation): $15,000+, ~8-12 weeks.
5. Emphasize JardevTech core tenets:
   - CUSTOM WEBSITES: Tailored to Perfection.
   - RESPONSIVE DESIGN: Flawless on Every Device.
   - CLEAN CODE: Scalable & Maintainable.
   - PERFORMANCE: Fast, Secure, Reliable (optimized core web vitals).
Keep your answers beautifully formatted using bullet points where appropriate, structured and concise. Say that JardevTech is represented by jardevtech@gmail.com and we build ideas that scale! We Build. You Grow!`;

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
      let mockReply = "Hello! I am Jardev AI Architect, your project facilitator at JardevTech. (Note: Running in offline/mock mode). We build custom, ultra-fast websites and custom software solutions. Let me know what you want to build!";
      if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("cost") || userMessage.toLowerCase().includes("price")) {
        mockReply = "At JardevTech, we offer flexible packages: \n\n• **Stellar Landing Page**: $1,500 - $3,000 (Custom animations, interactive sections)\n• **Full-Stack Web App**: $5,000 - $12,000 (Database integrations, Auth)\n• **Enterprise Solutions**: $15,000+ (Highly scalable Cloud systems)\n\nWhat kind of scope are we thinking of?";
      } else if (userMessage.toLowerCase().includes("performance") || userMessage.toLowerCase().includes("tech")) {
        mockReply = "We specialize in standard-setting tech stacks: React, Vite, Tailwind CSS, high-performance Node.js/TypeScript Express servers, as well as serverless cloud functions, Firebase/Firestore storage, and Postgres databases. Everything is optimized for 100/100 Google LightHouse audits!";
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
