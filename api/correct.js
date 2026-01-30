export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        temperature: 0.2,
        max_tokens: 120,
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah editor Bahasa Indonesia sesuai KBBI. " +
              "Tugasmu hanya memperbaiki ejaan dan tata kalimat. " +
              "JANGAN memberi penjelasan."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await r.json();

    if (!r.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ error: data });
    }

    const result =
      data.choices?.[0]?.message?.content?.trim() || text;

    return res.status(200).json({ text: result });

  } catch (e) {
    console.error("API crash:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

