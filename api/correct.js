export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY missing' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: [
          {
            role: 'system',
            content:
              'Kamu adalah asisten bahasa. Tugasmu memperbaiki tata kalimat agar lebih alami tanpa mengubah arti atau kata utama dari kamus lokal.'
          },
          ...req.body.messages
        ],
        temperature: 0
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json(data);
    }

    // 🔑 normalisasi agar frontend TIDAK perlu diubah
    res.status(200).json({
      choices: [
        {
          message: {
            content: data.output_text
          }
        }
      ]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
