const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
  // create a token
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "supersecret")
  // On real systems secret will harden jwt and needs to be something complex, it can also be placed in an .env folder to improve security
  // However, as it is a study-only project, it will be exposed so that if someone wants to run the application locally, they can do so without much effort.

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id
  });

}

module.exports = createUserToken;
