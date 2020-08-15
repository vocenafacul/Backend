'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTeacher extends Model {

    user() {
        return this.hasOne('App/Models/User')
      }

}

module.exports = UserTeacher
