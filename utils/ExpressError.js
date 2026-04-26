class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.status = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;