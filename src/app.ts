import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();

import indexRoutes from './routes/index';

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// router
app.use('/api',indexRoutes);

// this folder for this aplication will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));


export default app;