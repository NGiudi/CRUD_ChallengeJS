const TABLE = 'budget';

module.exports = (sequileze, type) => {
  return sequileze.define(TABLE, {
  	id: {
    	type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: type.INTEGER,
		description: type.STRING,
		amount: type.INTEGER,
		type: type.STRING,
		category: type.STRING,
    date: type.DATE
  });
}