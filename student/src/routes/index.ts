import express from "express"

import studentRoutes from './studentRoutes'
import studentQueueRoutes from './studentQueueRoutes'

const router: express.Router = express.Router()

router.use('/student', studentRoutes)
router.use('/student-queue', studentQueueRoutes)

export default router
