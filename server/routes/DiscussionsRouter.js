const Router = require('express');
const router = new Router();
const discussionsController = require('../controllers/discussionsController');
const roleMiddleware = require('../middleware/CheckRoleMiddleware');


router.post('/', roleMiddleware(3), discussionsController.create);
router.delete('/:discussionID', roleMiddleware(3), discussionsController.delete);
router.get('/', discussionsController.getAll);
router.get('/:DiscussionID', discussionsController.getOne);
router.put('/:discussionID', roleMiddleware(3), discussionsController.update);

module.exports = router;