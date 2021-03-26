const express = require ('express');
const mysql = require ('mysql');
const bodyParser = require ('body-parser');
const  cors = require ('cors');

const PORT = process.env.PORT || 3050;

const app = express();

app.use (cors ());

app.use (bodyParser.json());

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admPresupuestos'
});

// budget functions.
app.get ('/', (req, res) => {
    res.send ("Bienvenido al backend de https://ngiudicrud.herokuapp.com/");
});

app.get('/budget/:category', (req, res) => {
    const {category} = req.params;
    
    let sql;

    if (category === 'last10') {
        sql = 'SELECT * FROM budgets ORDER by date DESC LIMIT 10';
    }
    else if (category === 'todo') {
        sql = 'SELECT * FROM budgets ORDER by id DESC';
    }
    else {
        sql = `SELECT * FROM budgets WHERE category = '${category}' ORDER by date DESC`;
    }
    
    connection.query (sql, (error, results) => {
        if (error) {
            throw error;
        }
        
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send ('Not results.');
        }
    });
});

app.post ('/budget/add', (req, res) => {
    const sql = 'INSERT INTO budgets SET ?';
    
    const budgetObj = {
        description: req.body.description,
        date: req.body.date,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category
    }

    connection.query (sql, budgetObj, error => {
        if (error) {
            throw error;
        }
        
        res.send ('Budget created!');
    });
});

app.put('/budget/update/:id', (req, res) => {
    const {id} = req.params;
    const {description, category, date, amount} = req.body;

    const sql = `UPDATE budgets SET description = '${description}' , date = '${date}', category= '${category}', amount = ${amount} WHERE id=${id}`;

    connection.query (sql, error => {
        if (error) {
            throw error;
        }
        
        res.send ('Budget updated!');
    });
});

app.delete ('/budget/delete/:id', (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM budgets WHERE id= ${id}`;

    connection.query (sql, error => {
        if (error) {
            throw error;
        } 

        res.send ('Delete budget.');
    });
});

// balance functions.
app.get('/balance', (req, res) => {
    const sql = "SELECT value FROM balance WHERE field LIKE 'balance'";
    
    connection.query (sql, (error, results) => {
        if (error) {
            throw error;
        }
        
        if (results.length > 0) {
            res.json(results);
        }
        else{
            res.send ('Not results.');
        }
    });
});

app.put ('/balance/update/', (req, res) => {
    const {balance} = req.body;

    const sql = `UPDATE balance SET value = ${balance} WHERE field LIKE 'balance'`;
    
    connection.query (sql, error => {
        if (error) {
            throw error;
        }

        res.send ('Balance updated!');
    });
});


app.listen (PORT, () => console.log (`Server runnig on port ${PORT}`));

// Check connect
connection.connect (error => {
    if (error) {
        throw error;
    }
    
    console.log ('Database server running!');
});