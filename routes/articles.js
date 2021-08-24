import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newArticle,
  getArticle,
  editArticle,
  getAllArticle,
  getArticleById,
  showArticleCard,
  showTabFood,
  showTabView,
  showTabStay,
  showTaiwan,
  showType01,
  showType02,
  showType03,
  showType04,
  showType05,
  showType06,
  showType07,
  showType08,
  showType09,
  showType10,
  showType11,
} from '../controllers/articles.js'

const router = express.Router()

router.post('/', auth, upload, newArticle) // 沒有權限就先擋掉，不占空間
router.get('/', getArticle)
router.get('/all', auth, getAllArticle) // router順序有差，all在前，:id在後
router.get('/show', showArticleCard)
router.get('/stf', showTabFood)
router.get('/stv', showTabView)
router.get('/sts', showTabStay)
router.get('/stw', showTaiwan)
router.get('/stype01', showType01)
router.get('/stype02', showType02)
router.get('/stype03', showType03)
router.get('/stype04', showType04)
router.get('/stype05', showType05)
router.get('/stype06', showType06)
router.get('/stype07', showType07)
router.get('/stype08', showType08)
router.get('/stype09', showType09)
router.get('/stype10', showType10)
router.get('/stype11', showType11)
router.get('/:id', getArticleById)
router.patch('/:id' ,auth, upload, editArticle)


export default router
