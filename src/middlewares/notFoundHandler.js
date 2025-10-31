import NotFound from '../errors/notFound.js';

function notFoundHandler(req, res, next) {
  const notFoundError = new NotFound();
  next(notFoundError);
}

export default notFoundHandler;
