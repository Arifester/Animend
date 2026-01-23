import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

const AnimeCard = ({ id, title, image, score }) => {
  return (
    <Link to={`/anime/${id}`}>
      <Card className="overflow-hidden border-none shadow-none bg-transparent group cursor-pointer transition-all hover:scale-105">
        <CardContent className="p-0 relative rounded-md overflow-hidden">
          <div className="aspect-3/4 w-full relative">
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-full"
              loading="lazy"
            />
            {score && (
              <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-md">
                {score}
              </div>
            )}
          </div>
          
          <div className="pt-3 space-y-1">
            <h3 className="font-semibold text-slate-200 text-sm line-clamp-1 group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default AnimeCard
