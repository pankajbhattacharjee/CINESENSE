import React, { useState } from 'react';

interface MovieFormProps {
  onSubmit?: (id: string) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSubmit }) => {
    const [imdbId, setImdbId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = imdbId.trim();
        const imdbPattern = /^tt\d{7,}$/i;
        if (!imdbPattern.test(trimmed)) {
            alert('Please enter a valid IMDb ID (e.g. tt0133093)');
            return;
        }
        if (trimmed && onSubmit) {
            onSubmit(trimmed);
            setImdbId('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
            <input
                type="text"
                value={imdbId}
                onChange={(e) => setImdbId(e.target.value)}
                placeholder="Enter IMDb ID"
                className="border rounded p-2 mb-2 w-64"
                required
            />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Search
            </button>
        </form>
    );
};

export default MovieForm;