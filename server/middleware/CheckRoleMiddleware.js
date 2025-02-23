const jwt = require("jsonwebtoken");

module.exports = function(roleID) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизован, сори!'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            console.log(roleID)
            console.log(decoded.roleID)
            if (decoded.roleID !== roleID) {return res.status(403).json({message: "Нет доступа"})}
            req.Users = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован!"})
        }
    }
}
