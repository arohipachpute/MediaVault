import MediaCard from './MediaCard'

export default function MediaRow({ title, items, onRefresh }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#fff'
      }}>
        {title}
        <span style={{ color: '#888', fontSize: '14px', marginLeft: '10px' }}>
          ({items.length})
        </span>
      </h2>

      {items.length === 0
        ? <p style={{ color: '#555', fontSize: '14px' }}>
            Nothing here yet — click "+ Add" to get started!
          </p>
        : <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '12px'
          }}>
            {items.map(item => (
              <MediaCard key={item.id} item={item} onRefresh={onRefresh} />
            ))}
          </div>
      }
    </div>
  )
}