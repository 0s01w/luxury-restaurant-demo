import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client on the server side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// --- API ROUTES ---

// Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Sommelier Endpoint using Gemini API
app.post("/api/ai-sommelier", async (req, res) => {
  try {
    const { dishName, tastePreferences, dietaryRestrictions, occasion } = req.body;

    const ai = getAiClient();
    if (!ai) {
      // Fallback response if API key is not yet set in environment
      return res.json({
        wineRecommendation: "2018 Château Margaux Premier Grand Cru Classé",
        region: "Bordeaux, France",
        tastingNotes: "Rich aromas of black currant, cedar, dried violet, and silky velvet tannins.",
        pairingRationale: `Selected to perfectly complement ${dishName || 'your dish'} by balancing the richness and elevating subtle aromatic notes.`,
        chefTip: "Serve at 16°C (61°F) after a 45-minute decanting to allow full bouquet expression."
      });
    }

    const prompt = `You are a World Master Sommelier at AURELIA, an ultra-exclusive Michelin-starred fine dining restaurant.
A guest is asking for a tailored wine and beverage pairing for:
- Dish/Flavor Profile: ${dishName || 'A haute cuisine multi-course experience'}
- Preferred Taste Notes: ${tastePreferences || 'Balanced, complex, refined'}
- Dietary / Preference Restrictions: ${dietaryRestrictions || 'None'}
- Occasion: ${occasion || 'Special Fine Dining Evening'}

Provide a highly sophisticated, vivid, and elegant wine pairing recommendation in JSON format with the following fields:
1. wineRecommendation (string, full estate name & vintage)
2. region (string, region and country)
3. tastingNotes (string, detailed evocative sensory tasting notes)
4. pairingRationale (string, why this elevates the specific dish flavor elements)
5. chefTip (string, sommelier serving advice, temperature, decanting, or alternative non-alcoholic grand elixirs)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("AI Sommelier Error:", error);
    return res.status(500).json({
      error: "Failed to generate pairing",
      message: error.message || "An error occurred with our AI Sommelier.",
    });
  }
});

// Table Reservations Endpoint
const reservationsStore: any[] = [];

app.post("/api/reservations", (req, res) => {
  const { name, email, phone, date, time, guests, seatingArea, dietaryNotes, specialRequests } = req.body;

  if (!name || !email || !date || !time || !guests) {
    return res.status(400).json({ error: "Missing required reservation details." });
  }

  const reservationId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
  const newReservation = {
    id: reservationId,
    name,
    email,
    phone,
    date,
    time,
    guests,
    seatingArea: seatingArea || "Main Dining Room",
    dietaryNotes: dietaryNotes || "None",
    specialRequests: specialRequests || "None",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  reservationsStore.push(newReservation);

  return res.json({
    success: true,
    message: "Your table reservation at AURELIA has been confirmed.",
    reservation: newReservation,
  });
});

// Contact Inquiry Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const ticketId = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;
  return res.json({
    success: true,
    ticketId,
    message: "Thank you for reaching out. Our Concierge team will respond within 12 hours.",
  });
});

// Newsletter Endpoint
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  return res.json({
    success: true,
    message: "You have been added to AURELIA's Private Cellar & Culinary Digest guest list.",
  });
});

// --- VITE / STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AURELIA Restaurant Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
