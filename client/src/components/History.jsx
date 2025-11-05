import React, { useEffect, useState } from 'react'

export default function History({ serverUrl }) {
  const [history, setHistory] = useState([])

  async function fetchHistory() {
    try {
      const res = await fetch(`${serverUrl}/api/history`, { credentials: 'include' })
      const jsonResponse = await res.json()
      if (res.ok || res.status === 200) setHistory(jsonResponse.history || [])
    } catch (err) { console.error(err) }
  }

  useEffect(() => { fetchHistory() }, [])

  return (
    <div className="sidebar">
      <h3>Your Search History</h3>
      {history.length === 0 ? <div>No history yet</div> : (
        <ul>
          {history.map((h, idx) => (
            <li key={idx}><strong>{h.term}</strong> <br/><small>{new Date(h.timestamp).toLocaleString()}</small></li>
          ))}
        </ul>
      )}
    </div>
  )
}
