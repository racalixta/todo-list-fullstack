const express = require('express');
// const cors = require('cors');
const app = express();
const UserRoutes = require('./routes/UserRoutes');

app.use(express.json());

// app.use(cors({ 
//   credentials: true, 
//   origin: 'http://localhost:300'
// }));

app.use('/users', UserRoutes)

app.listen(5000);
