import BadRequest from './badRequest.js';

class ValidationError extends BadRequest {
  constructor(error) {
    const errorsMessage = Object.values(error.errors)
      .map((error) => error.message)
      .join('; ');

    super(`Os seguintes erros foram encontrados: ${errorsMessage}`);
  }
}

export default ValidationError;
