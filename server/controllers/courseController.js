const {Courses} = require('../models/models');
const ApiError = require('../error/ApiError');
const {where} = require("sequelize");




class courseController {
    async create(req, res, next) {
        try {
            const {CourseName, Description, Price} = req.body;
            const course = await Courses.create({CourseName, Description, Price});
            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next){
        try{
            const { CourseID } = req.params;
            const course = await Courses.findOne({where: {CourseID}})

            if (!course) {return req.status(404).json({message: 'Курс не найден!'})}
            await course.destroy();
            res.status(200).json({message: "Курс успешно удален !"})
        }
        catch(e){next(ApiError.badRequest(e.message));}
    }

    async update(req, res, next) {
        try {
            const { CourseID } = req.params;
            const { CourseName, Description, Price } = req.body;
            const course = await Courses.findOne({ where: { CourseID } });
            if (!course) {
                return res.status(404).json({ message: "Курс не найден." });
            }
            await course.update({ CourseName, Description, Price });
            return res.status(200).json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const courses = await Courses.findAll()
        return res.json(courses);
    }

    async getOne(req, res, next) {
        try {
            const { CourseID } = req.params;
            const course = await Courses.findOne({ where: { CourseID } });
            if (!course) {
                return res.status(404).json({ message: 'Курс не найден!' });
            }
            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new courseController();