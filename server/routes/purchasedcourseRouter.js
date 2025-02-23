const Router = require('express')
const router = new Router()
const purchasedcourseController = require('../controllers/purchasedcourseController')

router.post('/',  purchasedcourseController.create)
router.get('/', purchasedcourseController.getAll)


module.exports = router
