const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')
const authmiddleware = require('../middleware/authMiddleware')

router.post('/:userID',  cartController.create)
router.get('/', cartController.getAll)
router.get('/:userID', authmiddleware, cartController.get0ne)
router.delete('/:userID/:courseID', authmiddleware, cartController.delete)


module.exports = router
