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
        messages: [
          {
            role: "system",
            content: "Kamu adalah editor Bahasa Indonesia baku sesuai KBBI."
          },
          {
            role: "user",
            content: `
Tugasmu adalah MEMBAKUKAN kalimat Bahasa Indonesia sesuai kaidah KBBI.

ATURAN:
- Tambahkan preposisi yang hilang (ke, di, dari)
- Ubah struktur lisan menjadi baku
- Kapitalisasi awal kalimat
- Tambahkan tanda titik jika perlu
- JANGAN mengulang kalimat yang tidak baku

Contoh:
Input: aku pergi pasar
Output: Aku pergi ke pasar.

Sekarang perbaiki:
"${text}"

Jawab HANYA dengan satu kalimat hasil akhir.
`
          }
        ],
        temperature: 0.2,
        max_tokens: 80
      })
    });

    const data = await response.json();

    const corrected =
      data.choices?.[0]?.message?.content?.trim() || text;

    return res.status(200).json({ text: corrected });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'GPT error' });
  }
}

