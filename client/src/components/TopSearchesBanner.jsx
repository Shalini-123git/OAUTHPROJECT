

export default function TopSearchesBanner({ items = [] }) {
  return (
    <div className="top-banner">
      <strong>Top Searches:</strong>
      {items.length === 0 ? <span> No top searches yet</span> : (
        <span> {items.map(i => `${i.term} (${i.count})`).join(' • ')}</span>
      )}
    </div>
  )
}
