exports.handler = async function(event) {
  try {
    const { topic, niche } = JSON.parse(event.body);

    const prompt = `You are an expert YouTube Shorts creator specializing in viral ${niche} content. Create a complete YouTube Short package for this topic: "${topic}".

Return ONLY a raw JSON object with NO markdown, NO backticks, NO explanation:
{
  "title": "A viral clickbait YouTube title under 60 characters with power words",
  "hook": "The perfect 3-second opening hook that stops scrolling — one shocking sentence or question",
  "scenes": [
    {
      "script": "Voiceover script for this scene — 2-3 dramatic engaging sentences",
      "videoPrompt": "Detailed cinematic AI video prompt for this scene in 9:16 vertical format, dark and atmospheric"
    }
  ],
  "thumbnail": "Detailed thumbnail description — background color, text overlay, main image, style, emotions conveyed",
  "description": "YouTube description 3-4 sentences with keywords naturally included",
  "tags": ["tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8","tag9","tag10"]
}

The scenes array must have EXACTLY 5 scenes. Each scene = 6-10 seconds. Total = 30-60 seconds.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "google/gemma-3-12b-it:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000
      })
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data));
    const text = data.choices?.[0]?.message?.content || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: [{ text: JSON.stringify(parsed) }] })
    };
  } catch (err) {
    console.log("Error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
