const {StatusCodes} = require('http-status-codes');
const CustomErrorApi = require('./customErrorApi');

class NotFoundError extends CustomErrorApi {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;        
    }
}

module.exports = NotFoundError;