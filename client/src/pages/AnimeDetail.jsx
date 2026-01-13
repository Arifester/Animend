import { useParams } from "react-router-dom"

const AnimeDetail = () => {
  const { id } = useParams();

  return (
    <div className="pt-32 px-6 text-center">
      <h1 className="text-3xl font-bold">Anime Page Details</h1>
      <p className="text-slate-400 mt-4">Anime ID currently open: <span className="text-indigo-500 font-bold">{id}</span></p>
    </div>
  )
}

export default AnimeDetail
