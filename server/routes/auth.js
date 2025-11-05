import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/user", (req, res) => {
  if (req.user) {
    return res.json({ loggedIn: true, user: req.user });
  }
  res.json({ loggedIn: false });
});

// GOOGLE
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { successRedirect: "http://localhost:5173", failureRedirect: "http://localhost:5173/login" })
);

// FACEBOOK
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback",
  passport.authenticate("facebook", { successRedirect: "http://localhost:5173", failureRedirect: "http://localhost:5173/login" })
);

// GITHUB
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback",
  passport.authenticate("github", { successRedirect: "http://localhost:5173", failureRedirect: "http://localhost:5173/login" })
);

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
