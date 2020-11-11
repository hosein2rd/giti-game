'use strict'

class Register {
  get rules () {
    return {
      fullname: 'required',
      email: 'required|email',
      username: 'required',
      password: 'required',
      role: 'required'
    }
  }
}

module.exports = Register
