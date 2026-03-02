import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [imdbId, setImdbId] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-purple-200 mb-8">CineSense 🎬</h1>
      <input
        type="text"
        placeholder="Enter IMDb ID (e.g. tt0133093)"
        value={imdbId}
        onChange={e => setImdbId(e.target.value)}
        className="p-3 rounded w-80"
      />
      <button
        className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded"
        onClick={() => router.push(`/${imdbId}`)}
      >
        Show Insights
      </button>
    </div>
  );
}