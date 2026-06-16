export default function Navbar({ onSearch }) {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 40px',
      background: '#000',
      borderBottom: '1px solid #222',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1 style={{ color: '#e50914', fontSize: '24px', fontWeight: 'bold' }}>
        🎬 MediaVault
      </h1>
      <button onClick={onSearch} style={{
        background: '#e50914',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: 'bold'
      }}>
        + Add Movie / Series
      </button>
    </nav>
  )
}