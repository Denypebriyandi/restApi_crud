const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization');
const jwt = require('../middlewares/jwtoken');
const controllers = require('../controllers/c_crud');

router.get('/generateToken', auth.basicAuth, jwt.generateToken);
router.post('/create', auth.verify, controllers.create);
router.get('/read', auth.verify, controllers.get);
router.get('/readAccount/:accountNumber', auth.verify, controllers.getAccountNumber);
router.get('/readIdentity/:identityNumber', auth.verify, controllers.getidentityNumber);
router.put('/update/:id', auth.verify, controllers.update);
router.delete('/delete/:id', auth.verify, controllers.delete);

module.exports = router;