"use strict";

const { findBy } = require("../../Models/User");
const { existy } = require("@adonisjs/lucid/lib/util");

const User = use("App/Models/User");
const UserStudent = use("App/Models/UserStudent");
const UserTeacher = use("App/Models/UserTeacher");

class AuthController {
  async register({ request }) {
    const data = request.all();
    const isteacher =  data.isTeacher;
    delete data.isTeacher;

    // Primeiro verificamos se quem está se cadastrando é professor ou aluno.

    if (!isteacher) {
      try {
        await User.create({
          email: data.email,
          password: data.password,
        })
        // Uma vez que o Cadastro passou pela primeira tabela, vamos continuar o cadastro da tabela mais específica.
        try {
          // o await aqui tem como objetivo esperar essas requisições ao banco de dados sejam feitas antes de pular para próxima linha.
          // O await é super importante e foi o que mais deu problema na criação ... melhor, a falta dele =[
          const user = await User.findBy('email', data.email)
          await UserStudent.create({
            user_id: user.id,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            gender: data.gender,
            birthday: data.birthday,
            street: data.street,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            schooling: data.schooling,
            endOfStudies: data.endOfStudies,
            littleCourse: data.littleCourse,
            typeLittleCourse: data.typeLittleCourse,
            nameOfLittleCourse: data.nameOfLittleCourse,
            lastSchool: data.lastSchool,
        })
        // Caso o segundo cadastro falhe o que fazemos é passar o erro para o catch, identificar o ultimo cadastro e apagar no banco de dados
        } catch (err) {
          const user = await User.findBy('email', data.email)
          await user.delete()
          return ("Não foi possível completar o cadastro do aluno")
        }
        // Caso os dois try passem, isso indica que o cadastro é bem sucessido e terminamos aqui
        return ("O Cadastro Foi feito com sucesso");
        // Caso o primeiro try falhe o cadastro não contínua e apresentamos um erro
      } catch (err) {
        
          return ('Erro ao tentar cadastrarr o aluno')
      }
    // Caso quem esteja se Cadastrando seja aluno, temos o mesmo procedimento
    } else {
        try {
          await User.create({
            email: data.email,
            password: data.password,
          });
          try {
            const user = await User.findBy('email', data.email)
            await UserTeacher.create({
              user_id: user.id,
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              gender: data.gender,
              birthday: data.birthday,
              street: data.street,
              neighborhood: data.neighborhood,
              city: data.city,
              state: data.state,
              curriculum: data.curriculum,
              nameOfCourse: data.nameOfCourse,
              statusGraduation: data.statusGraduation,
              kindOfUniversity: data.kindOfUniversity,
              universityName: data.universityName,
              linkedin: data.linkedin,
            });
          } catch (err) {
            const user= await User.findBy('email', data.email)
            await user.delete()
            return ("Não foi possível dar contínuidade no cadastro do professor")
          }
          return ("Congratulation")
        } catch (err) {
          return ('Erro ao tentar cadastrar o professor')
        }
    }
  }

  // Função Login
  async login({ request, auth }) {
    const data = request.only(["email", "password"]);
    // A variável isTeacher irá nos ajudar a entender quem está fazendo o Login
    var isTeacher = null
    // A primeira coisa que iremos requisitar ao banco é o token
    // Caso a criação dele falhe, é porque não temos email cadastrado e 
    // o mesmo retorna um erro de email não cadastrado ou senha invalida
    // e não da procedimento ao resto da Função login
    const token = await auth.attempt(data.email, data.password);
    // Caso o token passe, agora precisamos determinar quem é o usuário que fez login
    try {
      // Com o email vamos achar quem é o user que está logango
      const user = await User.findBy('email', data.email)
      // Com a variável user que pegamos do banco, vamos buscar na tabela de professor
      // se ele é um professor. Caso não seja o isTeacher volta false.
      const userTeacher = await UserTeacher.findBy('user_id', user.id)
      if(userTeacher){
        isTeacher = true
      } else {
        isTeacher = false
      }
      // ao terminar de gerar nossos resposta, vamos passar ao return um objeto 
      // contendo o token e se o usúário é ou não professor.
      return ({
        token: token,
        isTeacher: isTeacher,
        data: data
      })
      // Caso encontramos algum erro ao logar, retornamos o mesmo a baixo. 
      // Na verdade precisamos trabalhar essa resposta de erro.
    } catch (err) {
      return err
    }
  }
  // Função foi criada por enquanto para teste, mas será uma requisição para informar os dados do usuário
  async show({ request }) {
    const data = request.only(['email']);

    const data2 = await User.findBy('email', data.email)

    return data2

  }

}

module.exports = AuthController;