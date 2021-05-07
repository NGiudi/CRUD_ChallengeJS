const TABLE = 'balance';

module.exports = (sequileze, type) => {
  return sequileze.define(TABLE, {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: type.INTEGER,
    balance: type.INTEGER,
  });
}