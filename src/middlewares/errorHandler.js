import mongoose from 'mongoose';
import BaseError from '../errors/baseError.js';
import ValidationError from '../errors/validationError.js';
import BadRequest from '../errors/badRequest.js';

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new BadRequest().sendResponse(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof BaseError) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default errorHandler;
