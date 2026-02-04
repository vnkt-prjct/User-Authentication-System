const jwt = require("jsonwebtoken");
const User = require("./models/user");

// -------------------- AUTH MIDDLEWARE --------------------
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.user = {
      id: user._id,
      role: user.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Authentication failed" });
  }
};

// -------------------- ROLE MIDDLEWARE --------------------
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRole
};
