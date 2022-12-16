const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));


// const cors = require('cors');
// app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.h4quo3n.mongodb.net/?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});


const bookModel = mongoose.model('Bookssss', bookSchema);

//mongodb+srv://admin:<password>@cluster0.h4quo3n.mongodb.net/?retryWrites=true&w=majority


app.post('/api/books', (req, res) => {
  console.log(req.body);

  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })

  res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {

  bookModel.find((error, data) => {
    res.json(data);

  })
})

app.delete('/api/book/:id', (req, res) => {
  console.log('Deleting: ' + req.params.id);
  bookModel.findByIdAndDelete({ _id: req.params.id }, (error, data) => {
    res.send(data);
  })
})

app.get("/api/book/:id", (req, res) => {
  console.log(req.params.id);
  bookModel.findById(req.params.id, (error, data) => {
    res.json(data);
  })
})

app.put('/api/book/:id', function (req, res) {
  console.log("Update Book " + req.params.id);
  console.log(req.body);
  console.log(req.body.author);
  console.log(req.body.cover);
  console.log(req.body.title);
  bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
    function (err, data) {
      res.send(data);
    })
})

//add at the bottom just over app.listen
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

