import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import {
  register,
  login,
  logout,
  addMyFile,
  getMyFile,
  checkout,
  getForums,
  extend,
  getuserinfo
} from '../controllers/users.js'

const router = express.Router()

router.post('/', register)
router.get('/', auth, getuserinfo)
router.post('/login', login)
router.delete('/logout', auth, logout)
router.post('/myFile', auth, upload, addMyFile)
router.get('/myFile', auth, getMyFile)
router.post('/checkout', auth, checkout)
router.get('/forums', auth, getForums)
router.post('/extend', auth, extend)

export default router
