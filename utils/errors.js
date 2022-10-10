export class ValidationError extends Error {}


export const handleError = (err, req, res, next) => {
    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
        message: err instanceof ValidationError ? err.message : 'Sorry, try again later',
    })
}
