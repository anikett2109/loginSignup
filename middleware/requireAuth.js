const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next){
    try{
    const token = req.cookies.Auth;
    const decoded = jwt.verify(token,process.env.SECRET);
    if (Date.now() > decoded.exp) return res.sendStatus(401);
    const user = await User.findById(decoded.sub);
    if(!user) res.sendStatus(401);
    req.user = user;
    next();
    }catch(e){
        res.sendStatus(401);
    }
}

module.exports = requireAuth;