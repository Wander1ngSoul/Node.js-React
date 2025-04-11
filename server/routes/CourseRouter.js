const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/CheckRoleMiddleware')



router.post('/', checkRole(3), courseController.create)
router.delete('/:CourseID', checkRole(3), courseController.delete)
router.put('/:CourseID', checkRole(3), courseController.update)
router.get('/', courseController.getAll)
router.get('/:CourseID', courseController.getOne);



module.exports = router