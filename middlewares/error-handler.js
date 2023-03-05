const { NotFound } = require('http-errors')

module.exports.NotFoundHandler = function (_req, _res, next) {
    // send to ErrorHanler NotFound exception from http-errors
    next(NotFound())
}

module.exports.ErrorHandler = function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(res.locals);
}