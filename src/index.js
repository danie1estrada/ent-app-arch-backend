const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', require('./routes/router'));

app.get('/', (req, res) => {
    res.send('Application running...');
});

mongoose.connect(
    'mongodb+srv://root:admin123@enterprise-applications.x4yvh.mongodb.net/enterprise-applications-architecture?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Connected to database')
);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running...');
});