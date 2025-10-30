import mongoose from 'mongoose';
import { author } from '../models/Author.js';

class authorController {
  static async getAuthors(req, res) {
    try {
      const authors = await author.find({});
      return res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async getAuthorById(req, res) {
    try {
      const id = req.params.id;
      const returnedAuthor = await author.findById(id);

      if (returnedAuthor === null) {
        return res.status(404).send({ message: 'Id do autor não localizado' });
      }

      res.status(200).json(returnedAuthor);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Um ou mais dados fornecidos estão incorretos' });
      }
      res.status(500).json({ message: `${error.message} - falha na requisição do autor` });
    }
  }

  static async createAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: 'criado com sucesso', author: newAuthor });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar autor` });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'autor atualizado' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: 'autor excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na exclusão` });
    }
  }
}

export default authorController;
