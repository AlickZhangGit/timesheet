const jwt = require("jsonwebtoken");

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

// verify token
const verifyToken = (req, res, next) => {
    // const token = req.cookies?.access_token;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE2Nzk3MDYyNzEsImV4cCI6MTc2NjEwNjI3MX0.tMCgARoNUkGG6kPDnHGMWd6yiQMbPk0hJUFy7iNLf0k'
  
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token,process.env.ACCOUNT_HASH, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
  };

  
  export default {verifyToken}