import express from "express";
import passport from "passport";
import { googleAuthSuccess, googleAuthFailure } from "../controllers/google.auth.controller.js";

const router = express.Router();


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure",
    session: false, 
  }),
  googleAuthSuccess
);

router.get("/google/failure", googleAuthFailure);

export default router;