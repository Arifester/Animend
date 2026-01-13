import { Button } from "@/components/ui/button"

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-50 px-4">
      
      <main className="text-center space-y-6 max-w-lg">
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Animend<span className="text-indigo-500">.</span>
        </h1>
        
        <p className="text-slate-400 text-base leading-relaxed">
          Discover your next favorite anime using advanced AI recommendations. Simple, fast, and personalized.
        </p>

        <div className="flex gap-3 justify-center pt-2">
          <Button className="bg-slate-50 text-slate-950 hover:bg-slate-200 font-medium px-6">
            Start Exploring
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-slate-50 hover:bg-transparent">
            Learn More
          </Button>
        </div>
      </main>
      
      <footer className="absolute bottom-6 text-center">
        <p className="text-xs text-slate-600 font-medium tracking-wide">
          &copy; {currentYear} Animend — Intelligent Anime Discovery
        </p>
      </footer>
    </div>
  )
}

export default App
