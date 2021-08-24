import articles from '../models/articles.js'

export const newArticle = async (req, res) => {
  if (req.user.role !== 1 && req.user.role !== 0) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const result = await articles.create({
      artTitle: req.body.artTitle,
      description: req.body.description,
      image: req.filepath,
      type: req.body.type,
      category: req.body.category,
      showing: req.body.showing
    })
    res.status(200).send({ success: true, mseeage: '', result })
  } catch (error) {
    console.log(error)
    if (error.artTitle === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤newArticles' })
    }
  }
}

export const getArticle = async (req, res) => {
  try {
    const result = await articles.find({ showing: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllArticle = async (req, res) => {
  if (req.user.role !== 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await articles.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getArticleById = async (req, res) => {
  try {
    const result = await articles.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.artTitle === 'CastError') {
      res.status(404).send({ success: false, message: '查無文章' })
    } else{
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const editArticle = async (req, res) => {
  if (req.user.role !== 1 && req.user.role !== 0) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const data = {
      artTitle: req.body.artTitle,
      description: req.body.description,
      type: req.body.type,
      category: req.body.category,
      showing: req.body.showing
    }
    if (req.filepath) data.image = req.filepath
    const result = await articles.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, mseeage: '', result })
  } catch (error) {
    console.log(error)
    if (error.artTitle === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const showArticleCard = async (req, res) => {
  try {
    const result = await articles.find({ showing: true }).limit(4)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showTabFood = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, category: '飲食' }).limit(3)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showTabView = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, category: '景點' }).limit(3)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showTabStay = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, category: '住宿' }).limit(3)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showTaiwan = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '台灣' }).limit(4)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType01 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '東北亞' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType02 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '東南亞' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType03 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '歐洲' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType04 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '中國港澳' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType05 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '台灣' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType06 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '美洲' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType07 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '紐澳' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType08 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '太平洋諸島' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType09 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '南亞及西亞' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType10 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '非西' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const showType11 = async (req, res) => {
  try {
    const result = await articles.find({ showing: true, type: '非洲' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
