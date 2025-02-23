const ApiError = require('../error/ApiError');
const {Cart, Courses } = require('../models/models')


class cartController {
    async create(req, res, next) {
        try{
            const {
                UserID,
                CourseID,
                AddedDate
            } = req.body

            const existingCartItem = await Cart.findOne({where: {UserID, CourseID}})

            if (existingCartItem) {return next(ApiError.badRequest("Курс уже добавлен в корзину!"))}

            const cart = await Cart.create({
                UserID,
                CourseID,
                AddedDate
            })

            return res.json(cart)
        }
        catch (e) {next(ApiError.badRequest(e.message)) }
    }

    async delete(req, res, next) {
        try {
            const {
                userID,
                courseID,
                addedDate
            } = req.params

            const cartItem = await Cart.findOne({where: {UserID: userID, CourseID: courseID}})

            if (!cartItem) {next(ApiError.badRequest("Курс не найден в корзине"))}

            await cartItem.destroy()
            return res.json({message: "Курс удален из корзины!"})
        }
        catch(error) {next(ApiError.badRequest(error.message))}
    }

    async getAll(req, res, next) {
        try{
            const cart = await Cart.findAll()
            return res.json(cart)
        }
        catch(e) {next(ApiError.badRequest(e.message)) }
    }

    async get0ne(req, res, next) {
        try {
            const { userID } = req.params; // userID из URL (строка)
            const numericUserID = parseInt(userID, 10); // Преобразуем в число

            if (isNaN(numericUserID)) {
                return next(ApiError.badRequest('Invalid userID')); // Используем next для передачи ошибки
            }

            const cart = await Cart.findAll({
                where: { UserID: numericUserID },
                include: [{ model: Courses, as: 'course' }] // Добавляем связь с моделью Courses
            });

            return res.json(cart);
        } catch (e) {
            next(ApiError.badRequest(e.message)); // Передаем ошибку в middleware
        }
    }

}

module.exports = new cartController();