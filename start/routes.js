'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('register', 'UserController.register').validator('Register')
  Route.post('login', 'UserController.login')
}).prefix('api/users')

Route.group(() => {
  Route.post('generate', 'PasswordController.generate').validator('GeneratePassword')
  Route.post('validate', 'PasswordController.validate').validator('ValidatePassword')
}).prefix('api/password')

Route.group(() => {
  Route.post('create', 'GameController.create').validator('CreateGame')
}).prefix('api/game')

Route.group(() => {
  Route.post('token/generate', 'MembershipController.generateToken')
    .validator('GenerateToken')
  Route.get('user', 'MembershipController.getUserInfo')
  Route.put('point/increase', 'MembershipController.increasePoint').validator('IncreasePoint')
}).prefix('api/membership')
