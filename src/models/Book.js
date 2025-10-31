import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
    required: [true, 'Autor(a) é obrigatório'],
  },
  publisher: {
    type: String,
    required: [true, 'Editora é obrigatório'],
    enum: {
      values: ['Casa do código', 'Alura'],
      message: 'A editora {VALUE} não é um valor permitido.',
    },
  },
  pages: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message: 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}',
    },
  },
});

const Book = mongoose.model('books', bookSchema);

export default Book;
