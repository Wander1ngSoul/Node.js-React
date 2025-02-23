const Router = require('express');
const router = new Router();
const discussionsController = require('../controllers/discussionsController');
const roleMiddleware = require('../middleware/CheckRoleMiddleware');

<<<<<<< HEAD
router.post('/', roleMiddleware(2), discussionsController.create);
router.delete('/:discussionID', roleMiddleware(2), discussionsController.delete);
router.get('/', discussionsController.getAll);
router.get('/:DiscussionID', discussionsController.getOne);
router.put('/:discussionID', roleMiddleware(2), discussionsController.update);
=======
router.post('/', roleMiddleware(3), discussionsController.create);
router.delete('/:discussionID', roleMiddleware(3), discussionsController.delete);
router.get('/', discussionsController.getAll);
router.get('/:DiscussionID', discussionsController.getOne);
router.put('/:discussionID', roleMiddleware(3), discussionsController.update);
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910

module.exports = router;