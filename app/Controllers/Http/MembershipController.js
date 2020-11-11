'use strict'

const Membership = use('App/Models/Membership')
const User = use('App/Models/User')

class MembershipController {
  async generateToken({ request, auth }) {
    const user = await auth.getUser()

    const gameId = request.input('gameId')

    const membership = await Membership.findOrCreate(
      { game_id: gameId, user_id: user.id },
      { game_id: gameId, user_id: user.id }
    )

    const { token } = await auth.authenticator('jwt_membership').generate(membership)

    return {
      success: true,
      token
    }
  }

  async getUserInfo({ auth }) {
    const membership = await auth.authenticator('jwt_membership').getUser()

    const user = await User.findOrFail(membership.user_id)

    return {
        success: true,
        user
    }

  }

  async increasePoint({ auth, request }) {
    const membership = await auth.authenticator('jwt_membership').getUser()

    membership.point = request.input('point')
    await membership.save()

    return {
      success: true
    }
  }
}

module.exports = MembershipController
