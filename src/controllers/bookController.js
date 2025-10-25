import book from '../models/Book.js';

class BookController {
  static async getBooks(req, res) {
    try {
      const booksList = await book.find({});
      res.status(200).json(booksList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async getBookById(req, res) {
    try {
      const id = req.params.id;
      const returnedBook = await book.findById(id);
      res.status(200).json(returnedBook);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição do livro` });
    }
  }

  static async createBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res.status(201).json({ message: 'criado com sucesso', book: newBook });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'livro atualizado' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.status(200).json({ message: 'livro excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na exclusão` });
    }
  }
}

export default BookController;
