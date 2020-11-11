'use strict'

const User = use('App/Models/User')

class UserController {
  async register({ request, auth }) {
    const { fullname, username, email, password, role } = request.all()

    const user = new User()
    user.fullname = fullname
    user.username = username
    user.email = email
    user.password = password
    user.role = role
    await user.save()

    const { token } = await auth.attempt(email, password)

    return {
        success: true,
        token
    }
  }

  async login({ request, auth }) {
    const { password, username, email } = request.all()
    
    let token
    if (email) {
      const user = await User.findBy('email', email)

      if (user.role === 'gamer') {
        const error = new Error()
        error.name = 'RoleException'
        error.message = 'Gamer user can not login with this route'
        error.status = 400
        throw error
      }

      token = (await auth.attempt(email, password)).token
      console.log(token)
    } else {
      const user = await User.findBy('username', username)

      if (user.role === 'gamer') {
        const error = new Error()
        error.name = 'RoleException'
        error.message = 'Gamer user can not login with this route'
        error.status = 400
        throw error
      }

      token = (await auth.authenticator('jwt_username').attempt(username, password)).token
    }

    return {
      success: true,
      token
    }
  }
}

module.exports = UserController
