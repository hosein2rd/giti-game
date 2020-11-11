'use strict'

const Password = use('App/Models/Password')
const generator = require('generate-password')
const User = use('App/Models/User')

class PasswordController {
  async generate({ request }) {
    const passGenerated = generator.generate({
        length: 5,
        numbers: true
    })

    const user = await User.findBy('email', request.input('email'))

    if (!user) {
      const error = new Error()
      error.message = 'User not found'
      error.status = 404
      error.name = 'NotFound'
      throw error
    }

    const password = new Password()
    password.user_id = user.id
    password.text = passGenerated
    await password.save()

    return {
      success: true
    }
  }
  
  async validate({ request, auth }) {
    const { email, password: text } = request.all()

    const user = await User.findBy('email', email)

    if (!user) {
        const error = new Error()
        error.message = 'User not found'
        error.status = 404
        error.name = 'NotFound'
        throw error
    }

    const password = await Password.findBy({ user_id: user.id, text: text })

    if (!password) {
        const error = new Error()
        error.message = 'Password not found'
        error.status = 404
        error.name = 'NotFound'
        throw error
    }

    const { token } = await auth.generate(user)

    await password.delete()

    return {
      success: true,
      token
    }
  }
}

module.exports = PasswordController
