import NotFound from '../errors/notFound.js';
import { author, book } from '../models/index.js';

class BookController {
  static listBooks = async (req, res, next) => {
    try {
      const booksQuery = book.find();

      req.result = booksQuery;

      next();
    } catch (error) {
      next(error);
    }
  };

  static getBookById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookResult = await book.findById(id).populate('author', 'name').exec();

      if (bookResult !== null) {
        res.status(200).send(bookResult);
      } else {
        next(new NotFound('Id do livro não localizado.'));
      }
    } catch (error) {
      next(error);
    }
  };

  static createBook = async (req, res, next) => {
    try {
      let bookInstance = new book(req.body);

      const bookResult = await bookInstance.save();

      res.status(201).send(bookResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookResult = await book.findByIdAndUpdate(id, { $set: req.body });

      if (bookResult !== null) {
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      } else {
        next(new NotFound('Id do livro não localizado.'));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookResult = await book.findByIdAndDelete(id);

      if (bookResult !== null) {
        res.status(200).send({ message: 'Livro removido com sucesso' });
      } else {
        next(new NotFound('Id do livro não localizado.'));
      }
    } catch (error) {
      next(error);
    }
  };

  static listBooksByFilter = async (req, res, next) => {
    try {
      const query = await buildSearchQuery(req.query);

      if (query !== null) {
        const booksResult = book.find(query).populate('author');

        req.result = booksResult;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };
}

async function buildSearchQuery(params) {
  const { publisher, title, minPages, maxPages, authorName } = params;

  let query = {};

  if (publisher) query.publisher = publisher;
  if (title) query.title = { $regex: title, $options: 'i' };

  if (minPages || maxPages) query.pages = {};

  // gte = Greater Than or Equal
  if (minPages) query.pages.$gte = minPages;
  // lte = Less Than or Equal
  if (maxPages) query.pages.$lte = maxPages;

  if (authorName) {
    const foundAuthor = await author.findOne({ name: authorName });

    if (foundAuthor !== null) {
      query.author = foundAuthor._id;
    } else {
      query = null;
    }
  }

  return query;
}

export default BookController;
