const router = require ('express').Router();

const apiBalanceRouter = require ('./api/balance');
const apiBudgetRouter = require ('./api/budget');
const apiUserRouter = require ('./api/user')

router.get ('/', (req, res) =>{
  res.send ('Welcome to api!');
});

router.use ('/balance', apiBalanceRouter);
router.use ('/budget', apiBudgetRouter);
router.use ('/user', apiUserRouter);

module.exports = router;