'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordSchema extends Schema {
  up () {
    this.create('passwords', (table) => {
      table.increments()
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('text').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('passwords')
  }
}

module.exports = PasswordSchema
