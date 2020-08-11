'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
    Route.post('login', 'UserController.login')
    Route.post('register', 'UserController.register')
    Route.get('getuser/:id', 'UserController.show')
}).prefix('users')

 