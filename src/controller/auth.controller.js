require('dotenv').config()
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const { User } = require('../model')
const nodeMailer = require('nodemailer')

module.exports = {
  async login({ body: { mail, password }, res }) {
    try {
      const foundUser = await User.findOne({ mail })

      if(!foundUser) {
        return res.status(403).send({
          message: 'Извините но логин или пароль не подходит.',
        })
      }

      const isPassportCorrect = passwordHash.verify(password, foundUser.password)

      if(!isPassportCorrect) {
        return res.status(403).json({
          message: 'Извините но логин или пароль не подходит.',
        })
      }

      const accessToken = jwt.sign({
        userId: foundUser._id,
        email: foundUser.mail
      }, process.env.JWT_SECRET)

      return res.status(200).send({
        accessToken,
        mail: foundUser.mail,
        id: foundUser._id,
        name: foundUser.name
      })

    } catch (e) {
      return res.status(403).send({
        message: 'Извините но логин или пароль не подходит.',
        e
      })
    }
  },

  async register ({body: {mail, password, name}, res, req}) {
    try {
      const foundUser = await User.findOne({ mail })

      if (foundUser) {
        return res.status(403).send({
          message: 'Извините но такой пользователь уже существует'
        })
      }

      const notHashedPass = password
      password = passwordHash.generate(password)
      const createdUser = await new User({mail, password, name})
      const saved = await createdUser.save()

      const transporter = nodeMailer.createTransport({
        service: 'Yandex',
        auth: {
          user: process.env.MAIL_LOGIN,
          pass: process.env.MAIL_PASS
        }
      })

      let message = {
        from: 'schwarzer88@yandex.ru',
        to: mail,
        subject: 'Регистрация на сайте',
        text: 'Добро пожаловать на сайт anna-baker.ru',
        html: `
          <p>Добро пожаловать ${name} на сайт <a href="http://annabaker.ru/">annabaker.ru</a></p>
           <p>Ваш логин: ${mail}</p>
           <p>Ваш пароль: ${notHashedPass}</p>`
      }

      const mailResult = await transporter.sendMail(message)
      console.log(mailResult)

      return res.status(200).send({
        message: "Регистрация завершена!"
      })

    } catch (e) {
      return res.status(403).send({
        message: 'Неизвестная ошибка'
      })
    }
  }
}
