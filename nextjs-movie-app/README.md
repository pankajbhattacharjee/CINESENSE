# Next.js Movie App

This is a web application built with Next.js that allows users to enter an IMDb ID and view detailed information about movies. The application fetches data from the OMDb API and provides AI-generated sentiment analysis for audience feedback.

## Features

- Search for movies by IMDb ID (input must start with `tt` followed by digits) (e.g. `tt0133093`)
- Display movie details including title, poster, cast list, release year, rating, and plot summary
- AI-generated audience sentiment summary and overall sentiment classification
- Responsive design for a seamless user experience
- Clean and maintainable code structure
- Basic tests for components

## Tech Stack

- **Next.js**: A React framework for server-side rendering and static site generation
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **OMDb API**: For fetching movie details
- **OpenAI API**: For generating sentiment analysis

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextjs-movie-app
   ```

2. Install dependencies:
   ```
   npm install
   # optionally install Tailwind if you want styled components
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Create a `.env.local` file in the **`nextjs-movie-app` root directory** (not the workspace root) and add your API keys:
   ```
   OMDB_API_KEY=<your_omdb_api_key>
   TMDB_API_KEY=<your_tmdb_api_key>  # needed for reviews
   OPENAI_API_KEY=<your_openai_api_key>  # optional, AI summary falls back if missing
   ```
   After editing this file, restart the dev server so the new values are loaded.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Assumptions

- Users have a valid IMDb ID to search for movies.
- The application is designed to handle errors gracefully, such as invalid IMDb IDs or API failures.

## AI Functionality

The application utilizes the OpenAI API to analyze audience sentiment based on user reviews or feedback. This feature enhances the user experience by providing insights into how the movie is perceived by viewers.

## Deployment

The application is live deployed on Vercel. You can access it at: [Live Demo](<deployment-link>)

## Testing

Basic tests are included for the `MovieForm` and `MovieDetails` components to ensure functionality and reliability. You can run the tests using:
```
npm run test
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.