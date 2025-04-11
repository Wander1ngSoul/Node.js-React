const Router = require('express');
const router = new Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', newsController.getAll);
router.get('/:newsID', newsController.getOne);
router.post('/', authMiddleware, newsController.create)
router.put('/:newsID', authMiddleware, newsController.update);
router.delete('/:newsID', authMiddleware, newsController.delete);
module.exports = router;