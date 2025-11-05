import React, { useState } from 'react'

export default function SearchPage({ user, serverUrl, onNewTop }) {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [message, setMessage] = useState('')

  async function doSearch(e) {
    e && e.preventDefault()
    if (!term) return
    setMessage('Searching...')
    try {
      const res = await fetch(`${serverUrl}/api/search`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term })
      })
      const jsonResponse = await res.json()
      if (res.ok) {
        setResults(jsonResponse.results)
        setSelected(new Set())
        setMessage(`You searched for "${jsonResponse.term}" — ${jsonResponse.count} results.`)
        onNewTop && onNewTop()
      } else {
        setMessage(jsonResponse.error || 'Search failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Search failed')
    }
  }

  function toggleSelect(id) {
    const search = new Set(selected)
    if (search.has(id)) search.delete(id); else search.add(id)
    setSelected(search)
  }

  return (
    <div className="search-area">
      <form onSubmit={doSearch}>
        <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search images..." />
        <button type="submit">Search</button>
      </form>
      <div className="counter">Selected: {selected.size} images</div>
      <div className="message">{message}</div>

      <div className="grid">
        {results.map(r => (
          <div className="grid-item" key={r.id}>
            <img src={r.thumb} alt={r.alt || r.id} />
            <label className="checkbox-overlay">
              <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)} />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
