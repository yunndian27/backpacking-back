import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  account: {
    type: String,
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號不能超過 20 個字'],
    unique: true,
    required: [true, '帳號不能為空']
  },
  password: {
    type: String,
    minlength: [6, '密碼必須 6 個字以上'],
    maxlength: [20, '密碼不能超過 20 個字'],
    required: [true, '帳號不能為空']
  },
  email: {
    type: String,
    required: [true, '信箱不能為空'],
    unique: true,
    validator: {
      validator: (email) => {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  accept: {
    type: Boolean,
    required: [true, '需同意論壇規範'],
  },
  role: {
    // 0 = 一般會員
    // 1 = 管理員
    type: Number,
    default: 0,
    required: [true, '沒有使用者分類']
  },
  tokens: {
    type: [String]
  },
  myFile: {
    type: [
      {
        article: {
          type: Schema.Types.ObjectId,
          ref: 'articles',
          required: [true, '缺少文章 ID']
        }
      }
    ]
  },
  forums: {
    type: [
      {
        articles: [{
          article: {
            type: Schema.Types.ObjectId,
            ref: 'articles',
            required: [true, '缺少文章 ID']
          }
        }],
        date: {
          type: Date,
          required: [true, '缺少完成日期']
        }
      }
    ]
  },
  // userImg: {
  //   type: String
  // },
  // userName: {
  //   type: String,
  //   minlength: [4, '使用者名稱必須 4 個字以上'],
  //   maxlength: [20, '名稱不能超過 20 個字'],
  //   unique: true,
  //   required: [true, '名稱不能為空']
  // },
  // userDesc: {
  //   type: String
  // },
  // userPlace: {
  //   type: String
  // },
  // userInterest: {
  //   type: String
  // },
  // userCareer: {
  //   type: String
  // },
  // userSex: {
  //   type: String,
  //   enum: ['male', 'female', 'secret']
  // },
  date: {
    type: Date,
    required: [true, '缺少日期']
  }
}, { versionKey: false })

UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = md5(user.password)
  }
  next()
})

export default mongoose.model('users', UserSchema)
