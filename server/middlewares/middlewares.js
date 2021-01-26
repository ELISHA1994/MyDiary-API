
export default {
    handleError,
    notFound
}

function handleError(err, req, res, next) {
    console.error(err)
    if (res.headersSent) return next(err)
    res.status(500).json({ error: 'Internal Server Error' })
}

function notFound(req, res, next) {
    res.status(404).json({ error: 'Not Found' })
}
