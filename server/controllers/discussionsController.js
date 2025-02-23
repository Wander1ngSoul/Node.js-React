const ApiError = require('../error/ApiError');
const { Discussions } = require('../models/models');

class discussionsController {
    async create(req, res, next) {
        try {
            const { Title, Content, CreatedBy, CreatedDate } = req.body;

            const discussion = await Discussions.create({ Title, Content, CreatedBy, CreatedDate: new Date() });

            return res.json(discussion);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { discussionID } = req.params;
            const discussion = await Discussions.findOne({ where: { discussionID } });

            if (!discussion) {
                return res.status(404).json({ message: "Обсуждение не найдено!" });
            }

            await discussion.destroy();
            res.status(200).json({ message: "Обсуждение успешно удалено!" });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const discussions = await Discussions.findAll();
            return res.json(discussions);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { DiscussionID } = req.params;
            const discussion = await Discussions.findOne({ where: { DiscussionID } });
            if (!discussion) {
                return res.status(404).json({ message: "Выбранное обсуждение не найдено!" });
            }
            return res.json(discussion);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const { discussionID } = req.params;
            const { Title, Content } = req.body;

            const discussion = await Discussions.findOne({ where: { discussionID } });

            if (!discussion) {
                return res.status(404).json({ message: "Обсуждение не найдено!" });
            }

            discussion.Title = Title || discussion.Title;
            discussion.Content = Content || discussion.Content;

            await discussion.save();

            return res.json(discussion);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new discussionsController();