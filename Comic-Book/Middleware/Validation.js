
const { comicBookSchema } = require('../schemas/comicBookSchema');

const validateComicBook = (req, res, next) => {
    try {
        req.body = comicBookSchema.parse(req.body);
        next(); 
    } catch (err) {
        next(err); 
    }
};

module.exports = validateComicBook;
