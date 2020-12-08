const express = require('express');
const connectDB = require('./config/db');

// Connect DB
connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/subject', require('./routes/api/subject'));
app.use('/api/topic', require('./routes/api/topic'));
app.use('/api/subtopic', require('./routes/api/subTopic'));
app.use('/api/bookmark', require('./routes/api/bookmark'));

app.listen(5000, () => console.log('App listening on port 5000!'));
