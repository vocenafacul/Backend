'use strict'

const User = use('App/Models/User')
class UserController {
    async register({request,response}){
        const{nome,sobrenome,email,password} = request.only([
            'nome',
            'sobrenome',
            'email',
            'password'
        ])

    await User.create ({ 
        nome,
        sobrenome,
        email,
        password
            })

    return response.send({message: "Usuário criado com sucesso"})
    }

    async login({request, response, auth})
    {
        const {email,password}=request.only(['email','password'])
        const token = await auth.attempt(email,password)
        return response.json(token)
     
        

    }
}

module.exports = UserController

