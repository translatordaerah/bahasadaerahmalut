// api/test.js
export default async function handler(req, res) {
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-5.2-mini",
      max_output_tokens: 50,
      input: "Tes koneksi GPT"
    })
  });

  const data = await r.json();
  res.status(200).json(data);
}


