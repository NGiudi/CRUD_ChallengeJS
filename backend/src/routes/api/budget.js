const router = require ('express').Router();
const jwt = require ('jwt-simple');

const balance = require ('../../middlewares/updateBalance');
const { Budget } = require ('../../config/db');

// get all.
router.get ('/all/:idUser', async (req, res) => {
  const budgets = await Budget.findAll({ where:{ idUser: req.params.idUser } });

  const token = jwt.encode (budgets, "frase secreta");
  res.json (token);
});

//filter category.
router.get ('/filter/:idUser/:category', async (req, res) => {
  const budgets = await Budget.findAll({ 
    where:{ 
      idUser: req.params.idUser,
      category: req.params.category
    } 
  });

  const token = jwt.encode (budgets, "frase secreta");
  res.json (token);
});

//filter last 10.
router.get ('/last10/:idUser', async (req, res) => {
	const budgets = await Budget.findAll({
    where: { idUser: req.params.idUser },
    limit: 10,
    order: [['date', 'DESC']]
  });
	
  const token = jwt.encode (budgets, "frase secreta");
  res.json (token);
});

router.post ('/add', async (req, res) => {
  balance.addBalance(req.body);

  const budget = await Budget.create(req.body);

  const token = jwt.encode (budget, "frase secreta");
  res.json (token);
});

router.put ('/update', async (req, res) => {
  balance.modifyBalance (req.body);

  await Budget.update(req.body, { where: { id: req.body.id } });

  const token = jwt.encode ({success: 'success update!'}, "frase secreta");
  res.json (token);
});

router.post ('/delete', async (req, res) => {
  balance.deleteBalance (req.body);

  await Budget.destroy({ where: { id: req.body.id } });

  const token = jwt.encode ({success: 'success delete!'}, "frase secreta");
  res.json (token);
});

module.exports = router;