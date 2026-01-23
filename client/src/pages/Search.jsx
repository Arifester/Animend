import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AnimeCard from "@/components/AnimeCard"

const Search = () => {
  const { query } = useParams(); // Capture keywords from URL
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchAnime = async () => {
      try {
        setLoading(true);
        // Jikan API search endpoint
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=20`);
        const data = await response.json();
        setAnimeList(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error searching anime:", error);
        setLoading(false);
      }
    };

    fetchSearchAnime();
  }, [query]); // useEffect runs every time "query" changes

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Results Header */}
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold">
            Search Results for <span className="text-indigo-500">"{query}"</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Found {animeList.length} results
          </p>
        </div>

        {/* Result Grid */}
        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-3/4 bg-slate-900 rounded-md"></div>
                ))}
            </div>
        ) : animeList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {animeList.map((anime) => (
                <AnimeCard 
                    key={anime.mal_id}
                    id={anime.mal_id}
                    title={anime.title} 
                    image={anime.images.webp.large_image_url} 
                    score={anime.score}
                />
                ))}
            </div>
        ) : (
            // Display If No Results
            <div className="text-center py-20 text-slate-500">
                <p className="text-lg">No anime found for "{query}".</p>
                <p className="text-sm">Try searching for another title.</p>
            </div>
        )}

      </div>
    </div>
  )
}

export default Search
