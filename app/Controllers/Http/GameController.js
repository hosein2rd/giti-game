'use strict'

const Game = use('App/Models/Game')

class GameController {
  async create({ request, auth }) {
    const user = await auth.getUser()

    if (user.role !== 'founder') {
      const error = new Error()
      error.status === 400
      error.message === 'User is not founder'
      error.name === 'InvalidUser'
      throw error
    }

    const game = new Game()
    game.name = request.input('name')
    game.user_id = user.id
    await game.save()

    const { token } = await auth.authenticator('jwt_game').generate(game)

    return {
      success: true,
      token
    }
  }
}

module.exports = GameController
