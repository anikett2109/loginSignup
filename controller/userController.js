const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function signup(req, res) {
    try {
        const { email, password } = req.body;
        const hashedPass = bcrypt.hashSync(password, 8);
        await user.create({ email, password: hashedPass });
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const User = await user.findOne({ email });
        if (!User) return res.sendStatus(401);

        const passMatch = bcrypt.compareSync(password, User.password);
        if (!passMatch) return res.sendStatus(401);

        const exp = Date.now() + 1000 * 60 * 60 * 24;
        const token = jwt.sign({ sub: User._id, exp: exp }, process.env.SECRET);

        //instead of local storage, jwt stored in htttp-only cookie more secure
        res.cookie("Auth", token, {
            expires: new Date(exp),
            sameSite: 'lax',//csrf
            httpOnly: true,//clientside
            secure: process.env.NODE_ENV == "production",//https only
        })
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

function logout(req, res) {
    try {
        res.clearCookie("Auth");
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

function checkAuth(req, res) {
    try {
        res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(400);
    }
}

module.exports = {
    login,
    signup,
    logout,
    checkAuth,
};