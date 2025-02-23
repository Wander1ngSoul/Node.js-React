const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.create); // Создание комментария
router.get('/:discussionId', commentController.getAll); // Получение всех комментариев для обсуждения
router.put('/:commentId', commentController.update); // Редактирование комментария
router.delete('/:commentId', commentController.delete); // Удаление комментария

module.exports = router;