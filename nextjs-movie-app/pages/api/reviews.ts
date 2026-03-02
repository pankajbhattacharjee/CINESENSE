import type { NextApiRequest, NextApiResponse } from 'next';

const TMDB_KEY = process.env.TMDB_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'IMDb ID is required' });
  }

  try {
    // first translate IMDb ID to TMDB ID
    const findResp = await fetch(
      `https://api.themoviedb.org/3/find/${id}?api_key=${TMDB_KEY}&external_source=imdb_id`
    );
    const findJson = await findResp.json();
    const movie = findJson.movie_results?.[0];
    if (!movie || !movie.id) {
      return res.status(404).json({ reviews: [] });
    }

    const tmdbId = movie.id;
    const reviewsResp = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/reviews?api_key=${TMDB_KEY}`
    );
    const reviewsJson = await reviewsResp.json();
    const reviews = (reviewsJson.results || []).map((r: any) => r.content || '').filter(Boolean);

    res.status(200).json({ reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews', reviews: [] });
  }
}
