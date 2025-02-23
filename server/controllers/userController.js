const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { Users } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, roleID) => {
    return jwt.sign({ id, email, roleID }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
    async registration(req, res, next) {
        try {
            const { Username, Email, Password, RegistrationDate, RoleID } = req.body;
            console.log(Username, Email, Password, RegistrationDate);
            if (!Email || !Password) {
                return next(ApiError.badRequest("Неверно указан email или/и password"));
            }
            const candidate = await Users.findOne({ where: { Email } });
            if (candidate) {
                return next(ApiError.badRequest("Пользователь с таким Email уже зарегистрирован"));
            }

            const hashPassword = await bcrypt.hash(Password, 5);
            const user = await Users.create({ Username, Email, Password: hashPassword, RegistrationDate, RoleID });

            const token = generateJwt(user.UserID, Email, RoleID);
            return res.json({
                token,
                username: user.Username,
                userID: user.UserID,
                roleID: user.RoleID // Возвращаем roleID
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { Email, Password } = req.body;
            const user = await Users.findOne({ where: { Email } });

            if (!user) {
                return next(ApiError.internal("Пользователь с таким Email не найден!"));
            }

            let comparePassword = await bcrypt.compareSync(Password, user.Password);
            if (!comparePassword) {
                return next(ApiError.internal("Указан неверный пароль!"));
            }

            const token = generateJwt(user.UserID, user.Email, user.RoleID);
            return res.json({
                token,
                username: user.Username,
                userID: user.UserID,
                roleID: user.RoleID // Возвращаем roleID
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.roleID); // Используем данные из req.user
        return res.json({
            token,
            username: req.user.username,
            userId: req.user.id,
            roleId: req.user.roleID // Возвращаем roleID
        });
    }
}

module.exports = new UserController();