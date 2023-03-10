const express = require('express');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');


dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true } , ()=> {
    console.log(`mongodb is connected`);
});


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common')) ;
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`backend server running is running on ${PORT}`);
});