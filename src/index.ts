import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { Application } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import session from 'express-session'
import createError from 'http-errors'
import { routerAuth, routerBook } from './routes'
import trim from './middleware/trim'
import { categoryAjaxSearch } from './controllers/category.controller'
import { index as Homeindex } from './controllers/home.controller'
import isLogin from './middleware/auth'

dotenv.config()

// import trim from './middleware/trim'

const app: Application = express()
const PORT = process.env.PORT

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname,'..','/public')));
app.use(trim)
app.use(express.json())
app.use(morgan('dev'))
app.use((req,res,next) => {
  if (!req.session.errors) {
    req.session.errors = null
  }
  next()
})
app.use('/',routerAuth)
app.get('/home',isLogin,Homeindex)
app.use('/book',routerBook)
app.get('/ajax/categories/search', categoryAjaxSearch)
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)

  try {
    await createConnection()
    console.log('Database connected!')
  } catch (err) {
    console.log(err)
  }
})