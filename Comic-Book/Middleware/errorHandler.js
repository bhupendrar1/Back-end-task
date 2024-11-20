// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ZodError') {
        const errors = err.errors.map(error => `${error.path.join('.')} : ${error.message}`);
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID Error'
        });
    }

    console.error('Unexpected Error:', err);

    return res.status(500).json({
        message: 'An Unexpected Error Occurred'
    });
};

module.exports = errorHandler;