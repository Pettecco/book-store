import NotFound from '../errors/notFound.js';
import { author } from '../models/index.js';

class AuthorController {
  static listAuthors = async (req, res, next) => {
    try {
      const authorsResult = author.find();

      req.result = authorsResult;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  };

  static getAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorResult = await author.findById(id);

      if (authorResult !== null) {
        res.status(200).send(authorResult);
      } else {
        next(new NotFound('Id do Autor não localizado.'));
      }
    } catch (error) {
      next(error);
    }
  };

  static createAuthor = async (req, res, next) => {
    try {
      let authorInstance = new author(req.body);

      const authorResult = await authorInstance.save();

      res.status(201).send(authorResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorResult = await author.findByIdAndUpdate(id, { $set: req.body });

      if (authorResult !== null) {
        res.status(200).send({ message: 'Autor atualizado com sucesso' });
      } else {
        next(new NotFound('Id do Autor não localizado.'));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorResult = await author.findByIdAndDelete(id);

      if (authorResult !== null) {
        res.status(200).send({ message: 'Autor removido com sucesso' });
      } else {
        next(new NotFound('Id do Autor não localizado.'));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
