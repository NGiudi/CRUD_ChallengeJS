const { Balance } = require ('../config/db');

const opsBalance = {}; 

const getBalance = async (idUser) => {
  const balance = await Balance.findOne ({ where: { idUser: idUser } });
  return balance.dataValues.balance;
}

const updateBalance = async (idUser, valueBalance) => {
  await Balance.update({ balance: valueBalance }, { where: { idUser: idUser } });
	console.log ('BALANCE: success update!');
}


opsBalance.addBalance = async (data) => {
    let {amount, idUser, type} = data;

    let balance = await getBalance (idUser);

    if (type === 'Ingreso'){
      balance += parseInt(amount);
    } else{
      balance -= parseInt(amount);
    }
    
    updateBalance (idUser, balance);
}

opsBalance.deleteBalance = async (data) => {
  let {amount, idUser, type} = data;
  let balance = await getBalance (idUser);

  if (type === 'Ingreso'){
    balance -= parseInt (amount);
  } else{
    balance += parseInt (amount);
  }
  
  updateBalance (idUser, balance);
}

opsBalance.modifyBalance = async (data) => {
  const {amount, idUser, oldAmount, type} = data;
  let balance = await getBalance (idUser);

  if (type === 'Ingreso'){
    balance = balance + parseInt(amount) - parseInt(oldAmount);
  }
  else if (type === 'Egreso'){
    balance = balance - parseInt(amount) + parseInt(oldAmount);
  }

  updateBalance (idUser, balance);
}

module.exports = opsBalance;