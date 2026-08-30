import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = null;

    // =====================================================
    // 1. CHECK HTTP-ONLY COOKIE
    // =====================================================

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // =====================================================
    // 2. FALLBACK TO AUTHORIZATION HEADER
    // =====================================================

    if (!token) {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // =====================================================
    // 3. TOKEN REQUIRED
    // =====================================================

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // =====================================================
    // 4. VERIFY JWT
    // =====================================================

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      message: "Invalid or expired authentication",
    });
  }
};

export default authMiddleware;
