import users from '../models/users.js'
import articles from '../models/articles.js'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    await users.create(req.body)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log(error.code)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已存在' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const user = await users.findOne({ account: req.body.account }, '')
    if (user) {
      if (user.password === md5(req.body.password)) {
        const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
        user.tokens.push(token)
        user.save({ validateBeforeSave: false })
        res.status(200).send({
          success: true,
          message: '登入成功',
          token,
          email: user.email,
          account: user.account,
          role: user.role
      })
      } else {
        res.status(400).send({ success: false, message: '密碼錯誤' })
      }     
    } else {
      res.status(400).send({ success: false, message: '帳號錯誤' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    req.user.save({ validateBeforeSave: false })
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const getAccount = async (req, res) => {
//   try {
//     await users.findOne({ account: req.body.account})
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     res.status(500).send({ success: false, message: '伺服器錯誤' })
//   }
// }

// export const writeUser = async (req, res) => {
//   if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
//     res.status(400).send({ success: false, message: '資料格式不正確' })
//     return
//   }
//   try {
//     const result = await users.create({
//       userImg: req.body.userImg,
//       userName: req.body.userName,
//       userDesc: req.body.userDesc,
//       userPlace: req.body.userPlace,
//       userInterest: req.body.userInterest,
//       userCareer: req.body.userCareer,
//       userSex: req.body.userSex
//     })
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     console.log(error)
//     if (error.userImg === 'ValidationError') {
//       const key = Object.keys(error.errors)[0]
//       const message = error.errors[key].message
//       res.status(400).send({ success: false, message: message })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

//  myFile=cart

export const addMyFile = async (req, res) => {
  try {
    console.log(123)
    console.log(req.body)

    const result = await articles.create(req.body)
    await req.user.save({ validateBeforeSave: false })
    res.status(200).send({ success: true, message: '' })
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

export const getMyFile = async (req, res) => {
  try {
    const { myFile } = await users.findById(req.user._id, 'myFile').populate('myFile.artcile')
    res.status(200).send({ success: true, message: '', result: myFile })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤addMyFile' })
  }
  

}

export const checkout = async (req, res) => {
  try {
    if (req.user.myFile.length > 0) {
      req.user.forums.push({ articles: req.user.myFile, date: new Date() })
      req.user.myFile = []
      req.user.save({ validateBeforeSave: false })
    }
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getForums = async (req, res) => {
  try {
    const result = await users.findById(req.user._id, 'forums').populate('forums.articles.article')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤-getforums' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => req.token === token)
    const token = jwt.sign({ _id: req.user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    // 標記陣列文字已修改過，不然不會更新
    req.user.markModified('tokens')
    req.user.save({ validateBeforeSave: false })
    res.status(200).send({ success: true, message: '', result: token })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getuserinfo = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: '',
      result: { account: req.user.account, role: req.user.role, email: req.user.email }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}