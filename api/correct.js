export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY missing' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-5.2-mini',
      input: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Perbaiki kalimat Bahasa Indonesia berikut menjadi BAKU dan FORMAL.
    WAJIB perbaiki jika ada kata yang kurang tepat (contoh: tambah "ke", "yang", dll).
    JANGAN mempertahankan gaya informal.
    
    Kalimat:
    "${text}"
    
    Jawab HANYA dengan hasil akhir kalimat.`
            }
          ]
        }
      ],
      max_output_tokens: 120
    })
    });

    const data = await response.json();

    const corrected =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      text;

    return res.status(200).json({
      text: corrected.trim()
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'GPT error' });
  }
}


