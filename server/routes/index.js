const Router = require('express')
const router = new Router()

const userRoutes = require('./UserRouter')
const cartRoutes = require('./CartRouter')
const commentRouter = require('./CommentRouter')
const courseRoutes = require('./CourseRouter')
const discussionsRoutes = require('./DiscussionsRouter')
const purchasedCourseRoutes = require('./purchasedcourseRouter')
const newsRoutes = require('./NewsRouter')

router.use('/user', userRoutes)
router.use('/cart', cartRoutes)
router.use('/comments', commentRouter)
router.use('/course', courseRoutes)
router.use('/news', newsRoutes)
router.use('/purchasedcourses', purchasedCourseRoutes)
router.use('/discussions', discussionsRoutes)

module.exports = router