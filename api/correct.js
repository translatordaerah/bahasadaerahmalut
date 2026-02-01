export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY missing' });
  }

  try {
    const userText =
      req.body?.messages?.find(m => m.role === 'user')?.content || '';

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: `Perbaiki tata bahasa agar lebih alami tanpa mengubah arti atau kata lokal berikut:\n\n${userText}`,
        temperature: 0
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json(data);
    }

    res.status(200).json({
      choices: [
        {
          message: {
            content: data.output_text || userText
          }
        }
      ]
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
}
