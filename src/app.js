import express from 'express';

const app = express();
app.use(express.json()); //middleware

const books = [
  {
    id: 1,
    title: 'The Lord of the Rings',
  },
  {
    id: 2,
    title: 'Hobbit',
  },
];

function findBookById(id) {
  return books.findIndex((book) => book.id === Number(id));
}

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node.js');
});

app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const index = findBookById(req.params.id);
  res.status(200).json(books[index]);
});

app.post('/books', (req, res) => {
  books.push(req.body);
  res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/books/:id', (req, res) => {
  const index = findBookById(req.params.id);
  books[index].title = req.body.title;
  res.status(200).json(books);
});

app.delete('/books/:id', (req, res) => {
  const index = findBookById(req.params.id);
  books.splice(index, 1);
  res.status(200).send('livro removido com sucesso');
});

export default app;
