const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.ACCOUNT_HASH, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default { verifyToken };
