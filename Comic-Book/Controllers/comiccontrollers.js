const Comic = require('../models/ComicBook');
const { comicBookSchema } = require('../schemas/comicBookSchema');


const handleError = (error, res) => {
    if(error.name === 'ZodError'){ 
        const errors = error.errors.map(err => `${err.path.join('.')} : ${err.message}`);
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }

    if(error.name === 'CastError'){ 
        return res.status(400).json({
            message: 'Invalid ID Error',
        });
    }

    console.error(error); 

    return res.status(500).json({ 
        message: 'An Unexpected Error Occurred',
    });
}

// to create a new comic book in the database
exports.createComicBook = async (req, res) => {
    try{
        console.log('Received request body:', req.body);
        const validatedData = comicBookSchema.parse(req.body); 
        const newComicBook = await Comic.create(validatedData); 
        console.log('Created new comic book:', newComicBook);
        return res.status(201).json({  
          status: 'success',
          data: {
            comicBook: newComicBook
          }
        });
    }
    catch(error){
        handleError(error, res); 
    }
};


exports.updateComicBook = async (req, res) => {
    try{
        const validData = comicBookSchema.partial().parse(req.body); 
        
        const comic = await Comic.findByIdAndUpdate({_id: req.params.id}, validData); 
        if(!comic){
            return res.status(404).json({message: 'Comic Not in Database'});
        }
        
        return res.status(201).json({ 
            status: 'success',
            message: 'Comic Updated'
        })
    }
    catch(error){
        handleError(error, res);  
    }
}



exports.deleteComicBook = async (req, res) => {
    try{
        const comicBook = await Comic.findByIdAndDelete(req.params.id);    
        if(!comicBook){
            return res.status(404).json({message: 'Comic Not in Database'});  
        }
        return res.status(200).json({message: 'Comic Deleted'}); 
    }
    catch(error) { 
        handleError(error, res);
    }
}


exports.getAllComicBooks = async (req, res) => {
    try{
        
        const queryObj = { ...req.query}; 
       
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);


        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

       
        let query = Comic.find(JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
          } else {
            query = query.sort('-createdAt');
          }
      
         
          if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
          } else {
            query = query.select('-__v');
          }
      
         
          const page = parseInt(req.query.page, 10) || 1;
          const limit = parseInt(req.query.limit, 10) || 10;
          const skip = (page - 1) * limit;
      
          
          query = query.skip(skip).limit(limit);
       
          const comicBooks = await query;
      
        
          const total = await Comic.countDocuments(JSON.parse(queryStr));
      
          
          return res.status(200).json({
            status: 'success',
            results: comicBooks.length,
            total,
            page,
            limit,
            data: {
              comicBooks,
            },
          });
        } 
    catch (error) {
        handleError(error, res); 
    }
    
}

exports.getComicBook = async (req, res) => {
    try{
        const comic = await Comic.findById({_id: req.params.id}); 
        
        if(!comic){  
            return res.status(404).json({message: 'Comic Not Found'});
        }
        
        return res.status(200).json(comic); 
    }
    catch(error){
        handleError(error, res);
    }
}