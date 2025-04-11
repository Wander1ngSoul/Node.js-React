const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.create);
router.get('/:discussionId', commentController.getAll);
router.put('/:commentId', commentController.update);
router.delete('/:commentId', commentController.delete);

module.exports = router;