import { useEffect, useState } from "react"
import AnimeCard from "@/components/AnimeCard"

const Popular = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Most Popular Anime | Animend";

    const fetchPopularAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=25');
        const data = await response.json();
        setAnimeList(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular anime:", error);
        setLoading(false);
      }
    };

    fetchPopularAnime();
    window.scrollTo(0, 0); // Scroll up when opened
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold">
            All Time <span className="text-indigo-500">Popular</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            The highest rated anime by community
          </p>
        </div>

        {/* Grid Section */}
        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-3/4 bg-slate-900 rounded-md"></div>
                ))}
            </div>
        ) : (
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
        )}

      </div>
    </div>
  )
}

export default Popular
