'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTeacherSchema extends Schema {
  up () {
    this.create('user_teachers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.integer('phone').notNullable()
      table.enum('gender', ['Masc', 'Fem', 'Others']).notNullable()
      table.string('birthday').notNullable()
      table.string('street').notNullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('curriculum')
      table.string('nameOfCourse').notNullable()
      table.enum('statusGraduation', ['Graduando', 'Graduado', 'Mestrado', 'Douturado']).notNullable()
      table.enum('kindOfUniversity', ['Publica', 'Privada']).notNullable()
      table.string('universityName').notNullable()
      table.string('linkedin')
      table.boolean('statusValidation').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_teachers')
  }
}

module.exports = UserTeacherSchema
