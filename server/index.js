const express = require('express');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true } , (output)=> {
    console.log(`mongodb is connected\n${output}`);
});


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common')) ; 

app.get('/', (req, res) => {
    res.send("homepage");
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`backend server running is running on ${PORT}`);
});

/*
username : vihangshah
password : 6jAYs31wuFI33Lfl
*/
