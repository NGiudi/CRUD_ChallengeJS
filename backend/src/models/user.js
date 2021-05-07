const TABLE = 'user';

module.exports = (sequileze, type) => {
  return sequileze.define(TABLE, {
  	id: {
    	type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
		username: type.STRING,
		email: type.STRING,
		password: type.STRING
	});
}