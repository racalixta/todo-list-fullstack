const Task = require('../models/Task');

// Helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class TaskController {
  static async create(req, res) {
    const { title, description, date, category, done } = req.body;

    // validation
    if(!title) {
      res.status(422).json({ message: 'O título da tarefa é obrigatório!' });
      return

    }

    if(!description) {
      res.status(422).json({ message: 'A descrição da tarefa é obrigatória!'});
      return

    }

    if(!date) {
      res.status(422).json({ message: 'A data limite para finalizar a tarefa é obrigatória!'});
      return

    }

    if(!category) {
      res.status(422).json({ message: 'A categoria é obrigatória!'});
      return

    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const task = new Task({
      title,
      description,
      date,
      category,
      done: false,
      user: {
        _id: user._id,
        name: user.name,
      }
    });

    try {
      const newTask = await task.save();
      res.status(201).json({
        message: 'Tarefa cadastrada com sucesso!',
        newTask
      });

    } catch(err) {
      res.statu(500).json({ 
        message: 'Ocorreu um erro, tente novamente mais tarde!'
      });
      console.log(err);

    }

  }





}
