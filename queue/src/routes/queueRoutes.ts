// Маршруты
import express from "express"
import { authMiddleware } from "../middleware"

import QueueController from '../controllers/queueController';


const router: express.Router = express.Router()

const controller = new QueueController();

router.route('')
    .post(authMiddleware, controller.create)

router.route('')
    .get(authMiddleware, controller.list)

router.route('/:id')
    .get(authMiddleware, controller.get)

router.route('/:id')
    .delete(authMiddleware, controller.delete)

router.route('/:id')
    .patch(authMiddleware, controller.update)


export default router
