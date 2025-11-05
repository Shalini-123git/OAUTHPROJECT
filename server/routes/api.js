import express from "express";
import axios from "axios";
import Search from "../models/Search.js";
const router = express.Router();

// auth check
function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// POST /api/search { term }
router.post('/search', ensureAuth, async (req, res) => {
  try {
    const { term } = req.body;
    if (!term || typeof term !== 'string') return res.status(400).json({ error: 'Missing term' });

    await Search.create({ userId: req.user._id, term });

    const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: term, per_page: 30 },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });

    const results = unsplashRes.data.results.map(img => ({
      id: img.id,
      alt: img.alt_description,
      thumb: img.urls.small,
      full: img.urls.full,
      width: img.width,
      height: img.height,
      user: img.user && { name: img.user.name, link: img.user.links.html }
    }));

    res.json({ term, count: results.length, results });
  } catch (err) {
    console.error(err.response && err.response.data ? err.response.data : err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/top-searches
router.get('/top-searches', async (req, res) => {
  try {
    const agg = await Search.aggregate([
      { $group: { _id: '$term', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json({ top: agg.map(a => ({ term: a._id, count: a.count })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

// GET /api/history
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const list = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(100);
    res.json({ history: list.map(s => ({ term: s.term, timestamp: s.timestamp })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export default router;
