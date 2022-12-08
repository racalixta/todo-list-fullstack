const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserByToken = async (token) => {
  if(!token) {
    return res.status(401).json({ message: 'Acesso negado!'});

  }

  const decoded = jwt.verify(token, 'supersecret');
  // About secret has already been commented in the 'create-user-token' file
  const userId = decoded.id;
  const user = await User.findOne({
    _id: userId
  });

  return user;

}

module.exports = getUserByToken;
