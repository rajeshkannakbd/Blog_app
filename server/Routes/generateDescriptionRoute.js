const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/generate-description", async (req, res) => {
  const { title, tags } = req.body;
  if (!title || !tags) {
    return res.status(400).json({ error: "Title and tags are required" });
  }

  const prompt = `Write a concise, engaging blog description based on the title "${title}" and tags "${tags}".`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.OPENAI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const description =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No description generated.";
    res.json({ description });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

module.exports = router;
