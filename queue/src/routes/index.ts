import express from "express"
import queueRoutes from './queueRoutes'

const router: express.Router = express.Router()

router.use('/queue', queueRoutes)

export default router
