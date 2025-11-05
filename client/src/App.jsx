import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import SearchPage from './components/SearchPage'
import TopSearchesBanner from './components/TopSearchesBanner'
import History from './components/History'

const SERVER_URL = 'http://localhost:3000'

export default function App() {
  const [user, setUser] = useState(null)
  const [topSearches, setTopSearches] = useState([])

  async function fetchCurrent() {
    try {
      const res = await fetch(`${SERVER_URL}/auth/user`, { credentials: 'include' })
      const jsonResponse = await res.json()
      setUser(jsonResponse.user)
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchTop() {
    try {
      const res = await fetch(`${SERVER_URL}/api/top-searches`)
      const jsonResponse = await res.json()
      setTopSearches(jsonResponse.top || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchCurrent(); fetchTop(); }, [])

  return (
    <div className="app">
      <header>
        <h1>Image Search — Unsplash</h1>
        <div className="auth-area">
          {user ? (
            <div>
              {user.photo && <img src={user.photo} alt="avatar" className="avatar" />}
              <span style={{ marginLeft: 8 }}>{user.displayName}</span>
              <button style={{ marginLeft: 8 }} onClick={async () => {
                await fetch(`${SERVER_URL}/auth/logout`, { credentials: 'include' });
                setUser(null);
              }}>Logout</button>
            </div>
          ) : <Login />}
        </div>
      </header>

      <TopSearchesBanner items={topSearches} />

      <main>
        {user ? (
          <div className="main-grid">
            <SearchPage user={user} serverUrl={SERVER_URL} onNewTop={fetchTop} />
            <aside>
              <History serverUrl={SERVER_URL} />
            </aside>
          </div>
        ) : (
          <div className="please-login">Please login with Google, Facebook, or GitHub to search images.</div>
        )}
      </main>

    </div>
  )
}
