import React from 'react';

export interface MovieInfo {
  title: string;
  poster: string;
  cast: string[];
  releaseYear: string;
  rating: string;
  plot: string;
  sentimentSummary?: string;
  overallSentiment?: string;
}

const MovieDetails: React.FC<{ movie: MovieInfo }> = ({ movie }) => {
  const {
    title,
    poster,
    cast,
    releaseYear,
    rating,
    plot,
    sentimentSummary,
    overallSentiment,
  } = movie;

  return (
    <div className="movie-details">
      <h2 className="text-2xl font-bold">{title}</h2>
      <img src={poster} alt={`${title} poster`} className="w-full h-auto" />
      <p><strong>Release Year:</strong> {releaseYear}</p>
      <p><strong>Rating:</strong> {rating}</p>
      <p><strong>Plot:</strong> {plot}</p>
      <p><strong>Cast:</strong> {cast.join(', ')}</p>
      {sentimentSummary && (
        <>
          <h3 className="text-xl font-semibold mt-4">Audience Sentiment</h3>
          <p><strong>Audience Sentiment:</strong> {sentimentSummary}</p>
          <p><strong>Overall Sentiment:</strong> {overallSentiment}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;