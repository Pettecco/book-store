import BaseError from './baseError.js';

class NotFound extends BaseError {
  constructor(message = 'Página não encontrada') {
    super(message, 404);
  }
}

export default NotFound;
