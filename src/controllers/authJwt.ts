const jwt = require("jsonwebtoken");

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

// verify token
let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
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

  const authJwt = {
    verifyToken: verifyToken
  };
  
  export default authJwt;
  export {};