const {PurchasedCourses} = require("../models/models")
const ApiError = require("../error/ApiError");

class purchasedcourseController {
    async create(req, res, next) {
        try{
            const {
                UserID,
                CourseID,
                PurchaseDate
            } = req.body;

            const purchasedcourse = await PurchasedCourses.create({
                UserID,
                CourseID,
                PurchaseDate
            })
            return res.json(purchasedcourse)
        }
        catch (e) {return next(ApiError.badRequest(e.message)) }
    }

    async getAll(req, res, next) {
        try {
            const purchasedcourse = await PurchasedCourses.findAll();
            return res.json(purchasedcourse);
        }
        catch (e) {next(ApiError.badRequest(e.message))}
    }

}

module.exports = new purchasedcourseController();