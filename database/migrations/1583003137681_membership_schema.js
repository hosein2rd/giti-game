'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MembershipSchema extends Schema {
  up () {
    this.create('memberships', (table) => {
      table.increments()
      table.integer('game_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('games')
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('point').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('memberships')
  }
}

module.exports = MembershipSchema
