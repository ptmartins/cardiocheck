if(process.env.NODE_ENV !== 'production') {
    await import('dotenv/config');
}

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import indexRouter from './routes/index.js';
import readingsRouter from './routes/readings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();  
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/readings', readingsRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});