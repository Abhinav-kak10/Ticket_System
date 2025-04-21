const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./api/routes');
const { error } = require('console');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);

app.get('/home', (req, res) => {
    res.json({message: 'Welcome to the Ticket System'});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;