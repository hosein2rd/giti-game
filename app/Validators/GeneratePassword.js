'use strict'

class GeneratePassword {
  get rules () {
    return {
      email: 'required|email'
    }
  }
}

module.exports = GeneratePassword
