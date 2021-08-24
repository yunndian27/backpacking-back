import mongoose from "mongoose"

const Schema = mongoose.Schema

//  論壇Forum > 主題Type(enum) > 分類Catalog(enum) > 文章Article

const articleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: [true, '缺少論壇版面']
  },
  articles: [{
    article: {
      type: Schema.Types.ObjectId,
      ref: 'articles',
      required: [true, '缺少文章 ID']
    }
  }]
}, { versionKey: false })

export default mongoose.model('forums', articleSchema)
