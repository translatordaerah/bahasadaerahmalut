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
              text: `
              Tugasmu adalah MEMBAKUKAN kalimat Bahasa Indonesia sesuai kaidah KBBI.
              
              ATURAN WAJIB:
              - Tambahkan preposisi yang HILANG seperti "ke", "di", "dari"
              - Ubah struktur lisan menjadi struktur BAKU
              - Kapitalisasi awal kalimat
              - JANGAN mengembalikan kalimat yang sama jika masih tidak baku
              
              CONTOH WAJIB:
              Input: "aku pergi pasar"
              Output: "Aku pergi ke pasar."
              
              Input: "saya sekolah kemarin"
              Output: "Saya pergi ke sekolah kemarin."
              
              Sekarang perbaiki kalimat ini:
              "${text}"
              
              Jawab HANYA dengan SATU kalimat hasil akhir.
              `
            }
          ]
        }
      ],
      max_output_tokens: 120
    })
    });

    const data = await response.json();

    // 🔍 DEBUG LOG
    console.log(
      "RAW OPENAI RESPONSE:",
      JSON.stringify(data, null, 2)
    );
    
let corrected = text;

// ✅ format resmi & paling stabil
if (typeof data.output_text === 'string' && data.output_text.trim()) {
  corrected = data.output_text.trim();
}

// 🔁 fallback lama (kalau ada)
else if (Array.isArray(data.output)) {
  for (const item of data.output) {
    if (Array.isArray(item.content)) {
      for (const c of item.content) {
        if (c.type === "output_text" && c.text) {
          corrected = c.text.trim();
          break;
        }
      }
    }
  }
}


   return res.status(200).json({
    text: corrected.trim()
  });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'GPT error' });
  }
}






