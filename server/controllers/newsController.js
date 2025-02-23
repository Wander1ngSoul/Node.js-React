const ApiError = require('../error/ApiError');
const { News } = require('../models/models');
const moment = require('moment');

class NewsController {
    // Создание новости
    async create(req, res, next) {
        try {
            const { Title, Content, CreatedBy, CreatedDate } = req.body;

            const news = await News.create({
                Title,
                Content,
                CreatedBy,
                CreatedDate: new Date(),
            });

            return res.json(news);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    // Получение всех новостей
    async getAll(req, res, next) {
        try {
            const news = await News.findAll();
            return res.json(news);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Получение одной новости по ID
    async getOne(req, res, next) {
        try {
            const { newsID } = req.params;
            const news = await News.findOne({ where: { newsID } });

            if (!news) {
                return next(ApiError.notFound('Новость не найдена'));
            }

            return res.json(news);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Обновление новости
    async update(req, res, next) {
        try {
            const { newsID } = req.params;
            const { Title, Content } = req.body;

            const news = await News.findOne({ where: { newsID } });

            if (!news) {
                return next(ApiError.notFound('Новость не найдена'));
            }

            // Обновляем поля новости
            news.Title = Title;
            news.Content = Content;

            await news.save(); // Сохраняем изменения

            return res.json(news);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Удаление новости
    async delete(req, res, next) {
        try {
            const { newsID } = req.params;

            const news = await News.findOne({ where: { newsID } });

            if (!news) {
                return next(ApiError.notFound('Новость не найдена'));
            }

            await news.destroy(); // Удаляем новость

            return res.json({ message: 'Новость успешно удалена' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new NewsController();