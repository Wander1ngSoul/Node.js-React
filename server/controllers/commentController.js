const { Comments } = require("../models/models");
const ApiError = require("../error/ApiError");

class commentController {
    // Создание комментария
    async create(req, res, next) {
        try {
            const {DiscussionID, UserID, Content, Username, roleID} = req.body;
            const comment = await Comments.create({
                DiscussionID,
                UserID,
                Content,
                CreatedDate: new Date(),
                Username
            });

            return res.json(comment);
        } catch (e) {
            console.error("Ошибка при создании комментария:", e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const {discussionId} = req.params;
            const comments = await Comments.findAll({
                where: {DiscussionID: discussionId},
                order: [['CreatedDate', 'DESC']],
            });
            return res.json(comments);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {commentId} = req.params;
            const {Content, UserID, RoleID} = req.body;

            const comment = await Comments.findOne({where: {CommentID: commentId}});
            if (!comment) {
                return next(ApiError.notFound("Комментарий не найден"));
            }


            if (comment.UserID !== UserID && roleID !== 3) {
                return next(ApiError.forbidden("Нет прав на редактирование комментария"));
            }

            comment.Content = Content;
            await comment.save();

            return res.json(comment);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    async delete(req, res, next) {
        try {
            const {commentId} = req.params;
            const {UserID, RoleID} = req.body;

            const comment = await Comments.findOne({where: {CommentID: commentId}});
            if (!comment) {
                return next(ApiError.notFound("Комментарий не найден"));
            }

            if (comment.UserID !== UserID && RoleID !== 3) {
                return next(ApiError.forbidden("Нет прав на удаление комментария"));
            }

            await comment.destroy();
            return res.json({message: "Комментарий успешно удален"});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new commentController();