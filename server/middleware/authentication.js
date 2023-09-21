const jwt = require('jsonwebtoken')

const auth = async(req, res, next) =>{
    const token = localStorage.getItem("token")
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {name: payload.name, isAdmin: payload.isAdmin}
        res.status(200).json({payload})
        next()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = auth