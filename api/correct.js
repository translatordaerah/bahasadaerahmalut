export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.2-mini',
        temperature: 0.2,
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah korektor tata bahasa Bahasa Indonesia baku sesuai KBBI. " +
              "Tugasmu hanya memperbaiki ejaan, struktur kalimat, dan kata penghubung. " +
              "JANGAN memberi penjelasan. JANGAN mengubah makna."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(500).json({ error: 'OpenAI error', detail: data });
    }

    const corrected =
      data.choices?.[0]?.message?.content?.trim() || text;

    return res.status(200).json({ text: corrected });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'GPT request failed' });
  }
}
