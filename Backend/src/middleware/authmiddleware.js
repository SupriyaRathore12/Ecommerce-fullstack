const jwt = require("jsonwebtoken");

const authmiddleware = (req,res,next) => {
    
        try {

            let token = req.header("Authorization");
            if (!token) {
                return res.status(401).send({ error: "Access denied!! Login first" });
            }
            let verifiedToken = jwt.verify(token, "my-secret-key");
            req.user = verifiedToken;
            next();

        } catch (error) {
            console.log("JWT error",error.message);
            
            return res.status(403).json({ msg: "bad authorization ! Token expired.." })

        }
    }


module.exports = authmiddleware;