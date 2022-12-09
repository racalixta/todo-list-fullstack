const Task = require('../models/Task');
const ObjectId = require('mongoose').Types.ObjectId;

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
      res.status(500).json({ 
        message: 'Ocorreu um erro, tente novamente mais tarde!'
      });
      console.log(err);

    }

  }

  static async getAllTasks(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const tasks = await Task.find({ 'user._id': user._id }).sort('-createdAt');
    
    res.status(200).json({ tasks: tasks });

  }

  static async getTaskById(req, res) {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Id inválido!' });
      return

    }
    
    const task = await Task.findOne({ _id: id });
    
    if(!task) {
      res.status(404).json({ message: 'Tarefa não encontrada!' });
      return 

    }

    res.status(200).json({ task: task});

  }

  static async removeTaskById(req, res) {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Id inválido!' });
      return

    }

    const task = await Task.findOne({ _id: id });

    if(!task) {
      res.status(401).json({ message: 'Tarefa não encontrada!' });
      return

    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if(task.user._id.toString() !== user._id.toString()) {
      res.status(404).json({ message: 'Houve um problema em processar a sua solicitação, tente novamente mais tarde.' });
      return 

    }

    await Task.findByIdAndRemove(id);

    res.status(200).json({ message: 'Tarefa removida com sucesso!' });


  }

  static async updateTask(req, res) {
    const id = req.params.id;
    const { title, description, date, category, done } = req.body;
    const updatedData = {};

    const task = await Task.findOne({ _id: id });

    if(!task) {
      res.status(404).json({ message: 'Tarefa não encontrada!' });
      return

    }


    const token = getToken(req);
    const user = await getUserByToken(token);

    if(task.user._id.toString() !== user._id.toString()) {
      res.status(404).json({ message: 'Houve um problema em processar a sua solicitação, tente novamente mais tarde!' });
      return

    }

    // validation
    if(!title) {
      res.status(422).json({ message: 'O título da tarefa é obrigatório!' });
      return

    } else {
      updatedData.title = title;

    }

    if(!description) {
      res.status(422).json({ message: 'A descrição da tarefa é obrigatória!'});
      return

    } else {
      updatedData.description = description;

    }

    if(!date) {
      res.status(422).json({ message: 'A data limite para finalizar a tarefa é obrigatória!'});
      return

    } else {
      updatedData.date = date;
    }

    if(!category) {
      res.status(422).json({ message: 'A categoria é obrigatória!'});
      return

    } else {
      updatedData.category = category;
    }

    updatedData.done = false;

    await Task.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });

  }

}
