import { useState, useEffect } from 'react'
import { getCollection } from './api'
import Navbar from './components/Navbar'
import MediaRow from './components/MediaRow'
import SearchModal from './components/SearchModal'
import './index.css'

export default function App() {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [showSearch, setShowSearch] = useState(false)

  const fetchCollection = async () => {
    const moviesRes = await getCollection('movie')
    const seriesRes = await getCollection('web_series')
    setMovies(moviesRes.data)
    setSeries(seriesRes.data)
  }

  useEffect(() => { fetchCollection() }, [])

  return (
    <div>
      <Navbar onSearch={() => setShowSearch(true)} />

      <div style={{ padding: '20px 40px' }}>
        <MediaRow
          title="🎬 My Movies"
          items={movies}
          onRefresh={fetchCollection}
        />
        <MediaRow
          title="📺 My Web Series"
          items={series}
          onRefresh={fetchCollection}
        />
      </div>

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onAdded={fetchCollection}
        />
      )}
    </div>
  )
}