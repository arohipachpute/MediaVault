import { deleteItem, updateItem } from '../api'

export default function MediaCard({ item, onRefresh }) {
  const handleDelete = async () => {
    await deleteItem(item.id)
    onRefresh()
  }

  const handleStatus = async (e) => {
    await updateItem(item.id, { status: e.target.value })
    onRefresh()
  }

  const handleRating = async (e) => {
    await updateItem(item.id, { rating: parseFloat(e.target.value) })
    onRefresh()
  }

  return (
    <div style={{
      minWidth: '160px',
      maxWidth: '160px',
      background: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      flexShrink: 0
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {item.poster_url
        ? <img src={item.poster_url} alt={item.title}
            style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
        : <div style={{
            width: '100%', height: '240px', background: '#333',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', color: '#888'
          }}>No Image</div>
      }

      <div style={{ padding: '10px' }}>
        <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '6px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.title}
        </p>

        <select onChange={handleStatus} value={item.status} style={{
          width: '100%', background: '#333', color: '#fff',
          border: 'none', borderRadius: '4px', padding: '4px', fontSize: '11px',
          marginBottom: '6px'
        }}>
          <option value="plan_to_watch">Plan to Watch</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>

        <input type="number" min="0" max="10" step="0.5"
          defaultValue={item.rating || ''}
          placeholder="Rating /10"
          onBlur={handleRating}
          style={{
            width: '100%', background: '#333', color: '#fff',
            border: 'none', borderRadius: '4px', padding: '4px',
            fontSize: '11px', marginBottom: '6px'
          }}
        />

        <button onClick={handleDelete} style={{
          width: '100%', background: '#e50914', color: '#fff',
          border: 'none', borderRadius: '4px', padding: '4px',
          cursor: 'pointer', fontSize: '11px'
        }}>Remove</button>
      </div>
    </div>
  )
}