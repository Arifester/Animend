import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import AnimeCard from "@/components/AnimeCard"

function App() {
  const currentYear = new Date().getFullYear();
  
  // State untuk menyimpan data anime
  const [topAnime, setTopAnime] = useState([]);
  // State untuk status loading
  const [loading, setLoading] = useState(true);

  // useEffect berjalan sekali saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        // Request ke Jikan API (Top Anime)
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=8');
        const data = await response.json();
        
        // Simpan data hasil fetch ke state
        setTopAnime(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 text-slate-50 px-4 py-12">
      
      {/* Header Section */}
      <header className="text-center space-y-4 max-w-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Animend<span className="text-indigo-500">.</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Discover your next favorite anime using advanced AI recommendations.
        </p>
      </header>

      {/* Content Section: Grid Anime */}
      <main className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-200">Top Trending</h2>
          <Button variant="link" className="text-indigo-400 p-0">View All</Button>
        </div>

        {loading ? (
          // Tampilan saat Loading (Simple Text dulu)
          <div className="text-center py-20 text-slate-500">Loading anime data...</div>
        ) : (
          // Tampilan Grid Anime
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {topAnime.map((anime) => (
              <AnimeCard 
                key={anime.mal_id}
                title={anime.title} 
                image={anime.images.webp.large_image_url} 
                score={anime.score}
              />
            ))}
          </div>
        )}
      </main>
      
      <footer className="mt-20 text-center">
        <p className="text-xs text-slate-600 font-medium tracking-wide">
          &copy; {currentYear} Animend — Intelligent Anime Discovery
        </p>
      </footer>
    </div>
  )
}

export default App
