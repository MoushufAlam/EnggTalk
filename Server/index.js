const express = require('express')
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/auth')

const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));