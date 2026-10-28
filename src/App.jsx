
import { useState, useCallback, useMemo } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos';
import useFavorites from './hooks/useFavorites';
import './App.css'

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const { favorites, toggleFavorite } = useFavorites();

const favoriteIds = useMemo(
  () => new Set(favorites.map((photo) => photo.id)),
  [favorites]
);

  const [search, setSearch] = useState('');

  // Handle changes in the search input.
  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  // Recalculate the filtered list only when photos or search changes.
  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, search]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-center text-red-600">
          Failed to load photos: {error}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#FFFF00] sm:text-4xl">
          Photo Gallery
        </h1>
          <p className="mt-3 text-sm text-gray-500">
            {favorites.length} favourite{favorites.length !== 1 ? 's' : ''}
          </p>
          <p className="mt-2 text-gray-500">
            Discover beautiful photography from around the world.
          </p>
        </header>

        {/* Search input */}
        <div className="mx-auto mb-8 max-w-xl">
          <label
            htmlFor="photo-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search by photographer
          </label>

          <input
            id="photo-search"
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Enter an author's name..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
          />

          <p className="mt-2 text-sm text-gray-500" aria-live="polite">
            Showing {filteredPhotos.length} of {photos.length} photos
          </p>
        </div>

        {/* Responsive gallery */}
        {filteredPhotos.length > 0 ? (
          <section
            aria-label="Photo gallery"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredPhotos.map((photo) => (
              <article
                key={photo.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-lg"
              >
                <img
                  src={`https://picsum.photos/id/${photo.id}/600/400`}
                  alt={`Photo by ${photo.author}`}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />

                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Photographer
                    </p>
                    <h2 className="mt-1 truncate font-semibold text-gray-800">
                      {photo.author}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(photo)}
                    aria-pressed={favoriteIds.has(photo.id)}
                    aria-label={
                      favoriteIds.has(photo.id)
                        ? `Remove ${photo.author}'s photo from favourites`
                        : `Add ${photo.author}'s photo to favourites`
                    }
                    className={`shrink-0 rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      favoriteIds.has(photo.id)
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-400 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={favoriteIds.has(photo.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                      />
                    </svg>
                  </button>

                </div>
              </article>
            ))}
          </section>
        ) : (
          <p className="py-12 text-center text-gray-500">
            No photos found for "{search}".
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
