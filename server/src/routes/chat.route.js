import Router from 'express'
import {chat} from '../controllers/chatbot.controller.js'

const router = Router()
router.route('/').post(chat)

export default router