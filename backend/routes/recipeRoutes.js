const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');
const cache = require('../middleware/cache');

router.post('/', auth, recipeController.create);
router.get('/', cache(300), recipeController.getAll);
router.get('/:id', cache(300), recipeController.getOne);
router.put('/:id', auth, recipeController.update);
router.delete('/:id', auth, recipeController.delete);

module.exports = router;