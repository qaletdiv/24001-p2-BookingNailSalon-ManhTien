function errorHandlerMiddleware(err, req, res, next) {
    console.error('ERROR:', err.stack);
    res.status(500).send('Lỗi server');
   }
module.exports = errorHandlerMiddleware;