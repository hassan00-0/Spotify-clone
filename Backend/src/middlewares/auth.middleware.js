export const protectRoute = async (req, res, next) => {
  const auth = typeof req.auth === "function" ? req.auth() : null;
  if (!auth?.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You must be logged in" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  const auth = typeof req.auth === "function" ? req.auth() : null;
  if (auth?.userId !== process.env.ADMIN_ID) {
    return res.status(403).json({ message: "Unauthorized - Admin only" });
  }
  next();
};
