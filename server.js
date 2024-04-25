const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/upload/',
  filename: (req, file, cb) => {
    cb(null, file.originalname) ;
  }
});
const upload = multer({ storage: storage });

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use('/user', (req, res, next) =>{
  res.send('please log in');
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history', {layout: 'dark'});
});

app.get('/hello/:name', (req,res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('design'), (req, res) => {
  const { author, sender, title, message} = req.body;


  if(author && sender && title && message && req.file) {
    res.render('contact', {isSent: true, file: req.file.filename});
  }
  else {
    res.render('contact', {isError: true})
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});