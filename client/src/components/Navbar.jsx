import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo: Bersih, Tanpa Titik */}
        <div className="text-xl font-bold tracking-tight text-slate-100 cursor-pointer">
          Animend
        </div>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Popular</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Upcoming</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">About</a>
        </div>

        {/* Action Button */}
        <div>
          <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
            Sign In
          </Button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
