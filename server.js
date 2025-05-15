// if(process.env.NODE_ENV !== 'production') {
//     await import('dotenv/config');
// }

import 'dotenv/config';

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import indexRouter from './routes/index.route.js';
import readingsRouter from './routes/readings.route.js';
import apiRouter from './routes/api.route.js';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();  
const port = process.env.MONGODB_URI || process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return new Date(date).toLocaleString();
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/readings', readingsRouter);
app.use('/api', apiRouter);
app.use((req, res, next) => {
    res.status(404).render('404', {
        layout: 'main',
        errorStatus: '404',
        errorMessage: 'Page not found'
    });
  });
  app.use(bodyParser.urlencoded({ 
    extended: false,
    limit: '10mb' 

}));

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});