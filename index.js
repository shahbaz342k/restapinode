require('dotenv').config();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const express = require('express');
const dbConnection = require('./Config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const UserRoutes = require('./Routers/UserRoutes');
const app = express()
const PORT = process.env.PORT || 4000;
console.log( process.env.DBURL)
const cors = require('cors');
dbConnection()
// middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api",UserRoutes);
app.use( notFound );
app.use( errorHandler );

app.listen( PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))