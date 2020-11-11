'use strict'

class ValidatePassword {
  get rules () {
    return {
      password: 'required',
      email: 'required|email'
    }
  }
}

module.exports = ValidatePassword
