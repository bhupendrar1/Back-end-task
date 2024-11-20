
const express = require('express');
const comicController = require('../controllers/comiccontrollers');
const validateComicBook = require('/middleware/validation');
const router = express.Router();


router.post('/', validateComicBook, comicController.createComicBook);
router.put('/:id', comicController.updateComicBook);
router.delete('/:id', comicController.deleteComicBook);
router.get('/', comicController.getAllComicBooks);
router.get('/:id', comicController.getComicBook);

module.exports = router;
