const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {  })
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.error('Database connection error:', err));
};

module.exports = { connect };