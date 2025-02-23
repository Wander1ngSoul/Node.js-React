require('dotenv').config();
const sequelize = require('./db.js');
const express = require('express');
const models = require('./models/models');
const app = express();
const cors = require('cors');
const router = require('./routes/index');

const errorHandler = require('./middleware/ErrorHandlingMiddleware');



const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());
app.use('/api', router)


//Обработка ошибок, последний Middleware
app.use(errorHandler)





const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();