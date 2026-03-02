import React, { useState } from 'react';
import MovieForm from '../components/MovieForm';
import MovieDetails, { MovieInfo } from '../components/MovieDetails';
import SentimentSummary from '../components/SentimentSummary';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

interface OmdbResponse {
  Title: string;
  Poster: string;
  Actors: string;
  Year: string;
  imdbRating: string;
  Plot: string;
  Response: string;
  Error?: string;
}

const transform = (data: OmdbResponse): MovieInfo => {
  return {
    title: data.Title,
    poster: data.Poster,
    cast: data.Actors ? data.Actors.split(',').map((s) => s.trim()) : [],
    releaseYear: data.Year,
    rating: data.imdbRating,
    plot: data.Plot,
  };
};

const Home = () => {
  const [movieData, setMovieData] = useState<MovieInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMovieSearch = async (imdbId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/movie?id=${imdbId}`);
      const data: OmdbResponse = await response.json();
      if (!response.ok || data.Response === 'False') {
        alert(data.Error || 'Movie not found');
        return;
      }
      const transformed = transform(data);

      // fetch reviews and sentiment (don't fail if this doesn't work)
      try {
        const reviewsRes = await fetch(`/api/reviews?id=${imdbId}`);
        const reviewsJson = await reviewsRes.json();
        if (reviewsRes.ok && Array.isArray(reviewsJson.reviews) && reviewsJson.reviews.length > 0) {
          const sentimentRes = await fetch(`/api/ai-summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviews: reviewsJson.reviews }),
          });
          const sentimentJson = await sentimentRes.json();
          transformed.sentimentSummary = sentimentJson.summary;
          transformed.overallSentiment = sentimentJson.sentiment;
        }
      } catch (reviewError) {
        console.warn('Could not fetch reviews:', reviewError);
        // Continue without reviews - movie data will still be displayed
      }

      setMovieData(transformed);
    } catch (err) {
      console.error(err);
      alert('Error fetching movie data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-4">Movie Search</h1>
      <MovieForm onSubmit={handleMovieSearch} />
      {loading && <LoadingSpinner />}
      {movieData && (
        <>
          <MovieDetails movie={movieData} />
          {movieData.sentimentSummary && (
            <SentimentSummary
              sentiment={movieData.overallSentiment || ''}
              summary={movieData.sentimentSummary}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;