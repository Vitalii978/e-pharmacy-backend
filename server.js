const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Connected to database:', mongoose.connection.name);

    app.listen(process.env.PORT || 3000);
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  })
  .catch(error => {
    console.log('Connection error:', error.message);
    process.exit(1);
  });
