const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/CheckRoleMiddleware')


<<<<<<< HEAD
router.post('/', checkRole(2), courseController.create)
router.delete('/:CourseID', checkRole(2), courseController.delete)
router.put('/:CourseID', checkRole(2), courseController.update)
=======
router.post('/', checkRole(3), courseController.create)
router.delete('/:CourseID', checkRole(3), courseController.delete)
router.put('/:CourseID', checkRole(3), courseController.update)
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
router.get('/', courseController.getAll)
router.get('/:CourseID', courseController.getOne);



module.exports = router