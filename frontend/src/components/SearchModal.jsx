import { useState } from 'react'
import { searchMedia, addToCollection } from '../api'

export default function SearchModal({ onClose, onAdded }) {
  const [query, setQuery] = useState('')
  const [mediaType, setMediaType] = useState('movie')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState({})

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    const res = await searchMedia(query, mediaType)
    setResults(res.data.results)
    setLoading(false)
  }

  const handleAdd = async (item) => {
    await addToCollection({
      tmdb_id: item.tmdb_id,
      title: item.title,
      media_type: mediaType,
      poster_url: item.poster_url,
      overview: item.overview,
      release_year: parseInt(item.release_year) || null,
    })
    setAdded(prev => ({ ...prev, [item.tmdb_id]: true }))
    onAdded()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200
    }}>
      <div style={{
        background: '#1a1a1a',
        borderRadius: '12px',
        padding: '30px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px' }}>Search & Add</h2>
          <button onClick={onClose} style={{
            background: 'none', color: '#fff', border: 'none',
            fontSize: '22px', cursor: 'pointer'
          }}>✕</button>
        </div>

        {/* Search bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <select value={mediaType} onChange={e => setMediaType(e.target.value)} style={{
            background: '#333', color: '#fff', border: 'none',
            borderRadius: '6px', padding: '10px', fontSize: '14px'
          }}>
            <option value="movie">🎬 Movie</option>
            <option value="web_series">📺 Web Series</option>
          </select>

          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search e.g. Mirzapur, Inception..."
            style={{
              flex: 1, background: '#333', color: '#fff',
              border: 'none', borderRadius: '6px',
              padding: '10px', fontSize: '14px'
            }}
          />

          <button onClick={handleSearch} style={{
            background: '#e50914', color: '#fff', border: 'none',
            borderRadius: '6px', padding: '10px 20px',
            cursor: 'pointer', fontWeight: 'bold'
          }}>
            Search
          </button>
        </div>

        {/* Results */}
        {loading && <p style={{ color: '#888', textAlign: 'center' }}>Searching...</p>}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {results.map(item => (
            <div key={item.tmdb_id} style={{
              width: '130px', background: '#222',
              borderRadius: '8px', overflow: 'hidden'
            }}>
              {item.poster_url
                ? <img src={item.poster_url} alt={item.title}
                    style={{ width: '100%', height: '195px', objectFit: 'cover' }} />
                : <div style={{
                    width: '100%', height: '195px', background: '#333',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '11px', color: '#888'
                  }}>No Image</div>
              }
              <div style={{ padding: '8px' }}>
                <p style={{
                  fontSize: '12px', fontWeight: 'bold', marginBottom: '4px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{item.title}</p>
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>
                  {item.release_year}
                </p>
                <button
                  onClick={() => handleAdd(item)}
                  disabled={added[item.tmdb_id]}
                  style={{
                    width: '100%', border: 'none', borderRadius: '4px',
                    padding: '5px', cursor: 'pointer', fontSize: '11px',
                    background: added[item.tmdb_id] ? '#555' : '#e50914',
                    color: '#fff', fontWeight: 'bold'
                  }}>
                  {added[item.tmdb_id] ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}