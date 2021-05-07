const Sequilize = require ('sequelize');

const balanceModel = require ('../models/balance');
const budgetModel = require ('../models/budget');
const userModel = require ('../models/user');

const sequilize = new Sequilize ('admPresupuestos', 'root', '', {               //Database - Username - Password.
  host: 'localhost',
  dialect: 'mysql'
});

const Balance = balanceModel (sequilize,Sequilize);
const Budget = budgetModel (sequilize, Sequilize);
const User = userModel (sequilize, Sequilize);

sequilize.sync ({force: false})
  .then( () => {
    console.log ('Sincronizated table!');
  });

module.exports = {Balance, Budget, User};