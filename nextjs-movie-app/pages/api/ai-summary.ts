import type { NextApiRequest, NextApiResponse } from 'next';

interface SummaryResponse {
  summary: string;
  sentiment: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reviews } = req.body as { reviews?: string[] };
  if (!reviews || !Array.isArray(reviews)) {
    return res.status(400).json({ error: 'No reviews provided' });
  }

  const prompt = `You are an assistant. Given the following audience reviews, summarize the overall sentiment in 3-4 sentences and classify it as Positive, Mixed, or Negative.\n\n${reviews.join("\n\n")}\n\nRespond with a JSON object that has keys \"summary\" and \"sentiment\".`;

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    // fallback stub
    return res.status(200).json({
      summary: 'No OpenAI key configured, unable to generate real summary.',
      sentiment: 'Neutral',
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const text: string = data?.choices?.[0]?.message?.content || '';

    let summary = text;
    let sentiment = 'Mixed';

    try {
      const parsed = JSON.parse(text);
      if (parsed.summary) summary = parsed.summary;
      if (parsed.sentiment) sentiment = parsed.sentiment;
    } catch (e) {
      // not JSON, leave heuristics
      const lower = text.toLowerCase();
      if (lower.includes('positive')) sentiment = 'Positive';
      else if (lower.includes('negative')) sentiment = 'Negative';
    }

    const result: SummaryResponse = { summary, sentiment };
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
}
