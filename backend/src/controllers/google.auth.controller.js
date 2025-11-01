import { generateToken } from "../lib/utils.js";

export const googleAuthSuccess = async (req, res) => {
  try {
    // User is attached by passport to req.user
    const user = req.user;

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
    }

    // Generate JWT token and set cookie
    generateToken(user._id, res);

    // Redirect to frontend homepage
    
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/?auth=success`);
  } catch (error) {
    console.error("Error in Google auth success:", error);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/login?error=server_error`);
  }
};


export const googleAuthFailure = (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
};