import { render, screen } from '@testing-library/react';
import MovieDetails from '../components/MovieDetails';

describe('MovieDetails', () => {
  const mockMovie = {
    title: 'Inception',
    poster: 'https://example.com/inception.jpg',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    releaseYear: '2010',
    rating: '8.8',
    plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    sentimentSummary: 'The audience loved the intricate plot and stunning visuals.',
    overallSentiment: 'Positive',
  };

  it('renders movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockMovie.title} poster`)).toHaveAttribute('src', mockMovie.poster);
    expect(screen.getByText(`Cast: ${mockMovie.cast.join(', ')}`)).toBeInTheDocument();
    expect(screen.getByText(`Release Year: ${mockMovie.releaseYear}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockMovie.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Plot: ${mockMovie.plot}`)).toBeInTheDocument();
    expect(screen.getByText(`Audience Sentiment: ${mockMovie.sentimentSummary}`)).toBeInTheDocument();
    expect(screen.getByText(`Overall Sentiment: ${mockMovie.overallSentiment}`)).toBeInTheDocument();
  });
});