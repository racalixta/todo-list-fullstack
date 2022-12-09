const express = require('express');
// const cors = require('cors');
const app = express();
const UserRoutes = require('./routes/UserRoutes');
const TaskRoutes = require('./routes/TaskRoutes');

app.use(express.json());

// app.use(cors({ 
//   credentials: true, 
//   origin: 'http://localhost:3000'
// }));

app.use('/users', UserRoutes);
app.use('/tasks', TaskRoutes);

app.listen(5000);
