const express = require ('express');
const bodyParser = require ('body-parser'); 
const cors = require ('cors');

const apiRouter = require ('./routes/api');

const app = express();

app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());

const PORT = process.env.PORT || 3050;

//routes
app.use ('/api', apiRouter);


app.get ('/', (req, res) => {
    res.send ('Hola Mundo');
});


app.listen (PORT, () => {
    console.log ('Server running!');
});