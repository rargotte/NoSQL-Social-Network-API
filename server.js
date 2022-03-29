const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');


const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/18-NoSQL-Social-Network-API', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  
  // Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

