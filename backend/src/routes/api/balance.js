const router = require('express').Router();
const jwt = require ('jwt-simple');

const { Balance } = require ('../../config/db');

router.get ('/:idUser', async (req, res) => {
	const [balance, created] = await Balance.findOrCreate({
		where: {idUser: req.params.idUser},
		defaults: {balance: 0}
	});
	
  const token = jwt.encode (balance, "frase secreta");
  res.json (token);
	
  console.log ('created instance: ' + created);
});

module.exports = router;