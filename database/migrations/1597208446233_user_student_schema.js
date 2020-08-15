'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserStudentSchema extends Schema {
  up () {
    this.create('user_students', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.integer('phone').notNullable()
      table.enum('gender', ['Masc', 'Fem', 'Others']).notNullable()
      table.integer('birthday').notNullable() //trocar para Date()
      table.string('street').notNullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.enum('schooling', ['Completo', 'naoConcluido', '1EM', '2EM', '3EM']).notNullable()
      table.string('endOfStudies').defaultTo('aindaEstudando') 
      table.enum('littleCourse', ['Sim', 'Nao']).notNullable()
      table.enum('typeLittleCourse', ['Publico', 'Particular', 'nuncaFiz']).defaultTo('nuncaFiz')
      table.string('nameOfLittleCourse').notNullable()
      table.string('lastSchool').notNullable()
      table.boolean('status').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_students')
  }
}

module.exports = UserStudentSchema
