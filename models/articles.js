import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema({
  artTitle: {
    type: String,
    required: [true, '標題不能為空白'],
    minlength: [1, '標題不能為空白']
  },
  author: {
    type: String
  },
  description: {
    type: String,
    required: [true, '內容不能空白'],
    minlength: [100, '內容至少 100 個字以上']
  },
  image: {
    type: String
  },  
  type: {
    type: String,
    enum: ['東北亞', '東南亞', '歐洲', '中國港澳', '台灣', '美洲', '紐澳', '太平洋諸島', '南亞及西亞', '非西', '非洲']
  },
  category: {
    type: String,
    enum: ['飲食', '住宿', '交通', '遊記', '景點', '金錢', '氣候', '其他']
  },
  showing: {
    type: Boolean,
    default: true
  }
  // date: {
  //   type: Date,
  //   required: [true, '缺少日期']
  // }
}, { versionKey: false })

export default mongoose.model('articles', articleSchema)
