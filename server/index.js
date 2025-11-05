import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import "./config/passport.js";
import apiRoute from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// DB
mongoose.connect(process.env.ATLAS_URL)
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.error("mongo connect error", err));

// session store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// cors 
app.use(cors({ 
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }));
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/api", apiRoute);

app.get('/', (req, res) => res.send('Image Search API running'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
