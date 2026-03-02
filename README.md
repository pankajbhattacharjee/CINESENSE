# CineSense 🎬

*Gain AI-powered insights on films—just enter an IMDb ID!*

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **APIs**: OMDb & TMDB (movies, reviews, cast)
- **AI**: OpenAI API (sentiment analysis)
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**:
   
```
bash
   git clone https://github.com/your-username/CineSense.git
   cd CineSense
   
```

2. **Install dependencies**:
   
```
bash
   npm install
   
```

3. **Configure environment variables**:

   Create a `.env.local` file in the root directory and add the following API keys:

   | Variable | Description | Get it from |
   |----------|-------------|-------------|
   | `OMDB_API_KEY` | OMDb API key for movie data | [omdbapi.com](https://www.omdbapi.com/apikey.aspx) |
   | `TMDB_API_KEY` | TMDB API key for reviews & cast | [themoviedb.org](https://www.themoviedb.org/settings/api) |
   | `OPENAI_API_KEY` | OpenAI API key for AI analysis | [platform.openai.com](https://platform.openai.com/api-keys) |

   
```
   OMDB_API_KEY=xxxxxx
   TMDB_API_KEY=yyyyyy
   OPENAI_API_KEY=zzzzzz
   
```

4. **Run the development server**:
   
```
bash
   npm run dev
   
```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
CineSense/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page with search input
│   └── movieId.tsx         # Movie details page
├── components/             # React components
│   ├── CastList.tsx        # Display movie cast members
│   ├── LoadingSpinner.tsx  # Loading indicator
│   ├── MovieCard.tsx       # Movie poster & basic info card
│   ├── SentimentAnalysis.tsx  # AI sentiment analysis results
│   ├── SentimentMeter.tsx  # Visual sentiment gauge
│   └── WordCloud.tsx       # Keyword visualization from reviews
├── pages/api/              # API routes (Pages Router fallback)
│   ├── ai-summary.ts       # OpenAI integration endpoint
│   ├── movie.ts           # Movie data fetching endpoint
│   └── reviews.ts         # Reviews fetching endpoint
├── styles/                 # Global styles
│   └── globals.css
├── tests/                  # Test files
│   ├── api.movie.test.ts
│   └── components.MovieCard.test.tsx
└── public/                 # Static assets
```

## 🤖 How the AI Works

1. **Fetch Reviews**: The app retrieves audience reviews from the TMDB API based on the IMDb ID
2. **AI Analysis**: Reviews are sent to OpenAI for sentiment classification
3. **Visualization**: Results are displayed as:
   - Sentiment meter (Positive / Mixed / Negative)
   - Word cloud of frequently mentioned keywords
   - AI-generated summary of overall audience reception

## ⚡ Features

- 🎬 **Movie Search**: Enter any IMDb ID to get instant insights
- ⭐ **Movie Cards**: Display poster, title, year, and ratings
- 🎭 **Cast List**: View top cast members of the movie
- 📊 **Sentiment Meter**: Visual gauge showing audience sentiment
- ☁️ **Word Cloud**: Visual representation of review keywords
- 🤖 **AI Summary**: OpenAI-powered analysis of reviews
- ✨ **Smooth Animations**: Framer Motion transitions
- 📱 **Responsive Design**: Works on mobile and desktop

## 🌐 Live Demo

[Production Link](https://your-vercel-url.vercel.app)

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/movie` | GET | Fetches movie details from OMDb API |
| `/api/reviews` | GET | Fetches reviews from TMDB API |
| `/api/ai-summary` | POST | Generates AI sentiment analysis |

### Example Usage

```
bash
# Get movie details
curl "http://localhost:3000/api/movie?imdbId=tt0133093"

# Get reviews
curl "http://localhost:3000/api/reviews?imdbId=tt0133093"

# Get AI summary (POST)
curl -X POST "http://localhost:3000/api/ai-summary" \
  -H "Content-Type: application/json" \
  -d '{"reviews": ["Great movie!", "Highly recommended"]}'
```

## 🧪 Testing

Run the test suite:

```
bash
npm test
```

Test files are located in the `/tests` directory:
- `api.movie.test.ts` - Tests for movie API endpoint
- `components.MovieCard.test.tsx` - Tests for MovieCard component

## 🚦 Assumptions & Limitations

- Only **movie** IMDb IDs are supported (not TV shows)
- All three API keys are required for full functionality
- Rate limits apply based on respective API plans

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) - Movie database
- [The Movie Database](https://www.themoviedb.org/) - TMDB API
- [OpenAI](https://openai.com/) - AI capabilities
- [Next.js](https://nextjs.org/) - React framework

---

Made with ❤️ using Next.js & OpenAI
