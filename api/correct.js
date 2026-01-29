// api/correct.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY missing' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: "gpt-5.2-mini",
    max_output_tokens: 200,
    input: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: req.body.messages
              .map(m => m.content)
              .join("\n")
          }
        ]
      }
    ]
  })
});


    const data = await response.json();

    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      '';

    return res.status(200).json({
      choices: [
        { message: { content: text } }
      ]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

