export default (myErrorFun) => (req, res, next) => {
    return Promise.resolve()
        .then(() => myErrorFun(req, res, next))
        .catch((err) => {
            console.error('handleAsyncError caught error:', err);
            console.error('next type:', typeof next, next);
            if (typeof next === 'function') {
                return next(err);
            }
            // Fallback: rethrow so the global error handler can pick it up
            console.error('next is not a function - rethrowing error');
            throw err;
        });
}