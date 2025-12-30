export const checkAccess = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (process.env.NODE_ENV === "production" && !apiKey) {
    return res.status(403).json({ message: "No API Key provided" });
  }
  next();
};