const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


const { connect } = require('./config/database');


connect();

const user = require('./routes/user');
app.use('/api/v1', user);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send(`h1> Welcome to HOME PAGE<\h1>`);
});