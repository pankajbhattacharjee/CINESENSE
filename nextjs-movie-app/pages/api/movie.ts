import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.OMDB_API_KEY; // Ensure you have your OMDb API key in the environment variables

if (!API_KEY) {
    console.warn('OMDb API key is missing!');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid IMDb ID' });
    }

    try {
        if (!API_KEY) {
            return res.status(500).json({ error: 'OMDb API key not configured' });
        }

        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'False') {
            // OMDb returns a 200 with Response: False when movie not found
            return res.status(404).json({ error: data.Error || 'Movie not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('movie api error', error);
        res.status(500).json({ error: 'Failed to fetch movie data' });
    }
}