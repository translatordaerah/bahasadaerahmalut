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
