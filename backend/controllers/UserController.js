const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helpers
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {

  static async register(req, res) {
    const { name, email, password, confirmpassword, phone } = req.body;

    // validations
    if(!name) {
      res.status(422).json({ message: 'O nome é obrigatório!'});
      return
      
    }

    if(!email) {
      res.status(422).json({ message: 'O email é obrigatório!'});
      return
      
    }
    
    if(!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!'});
      return
      
    }

    if(phone.length < 8) {
      res.status(422).json({ message: 'O telefone adicionado não existe, tente novamente!'});
      return
      
    }

    if(!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' });
      return
  
    }

    // MUDAR PARA PELO MENOS 6 DIGITOS DEPOIS, POR ENQUANTO PARA FACILITAR O DESENVOLVIMENTO DEIXAR COM 2
    if(password.length <= 2) {
      res.status(422).json({ message: 'A senha precisa ter pelo menos 3 dígitos!' })
    }
  
    if(!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória!'});
      return
  
    }
  
    if(password !== confirmpassword) {
      res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!'});
      return
    }
  
    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email, 
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);

    } catch(err) {
      console.log(err);
      res.status(500).json({ message: 'Ocorreu um erro, tente novamente mais tarde!'});

    }

  }

  static async login(req, res) {
    const { email, password } = req.body;

    // validations
    if(!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!'});
      return

    }

    if(!password) {
      res.status(422).json({ message: 'A senha é obrigatória!'});
      return

    }

    // check if user exists
    const user = await User.findOne({ email: email});

    // compare passwords
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!user || !checkPassword) {
      res.status(422).json({ message: 'E-mail ou senha não inválidos, tente novamente ou registre uma conta!' });
      return

    }

    await createUserToken(user, req, res);

  }

  static home(req, res) {
    return res.status(200).json({ message: 'Bem-vindo!' });
  }

}