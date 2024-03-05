// Load .env environment variables and update config folder path for config module
import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_CONFIG_DIR = __dirname + '/config/';

import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import debugFn from 'debug';
import logger from 'morgan';
import config from 'config';

import usersRoute from './routes/api/users';

const debug = debugFn('quizlet-backend:app');
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', usersRoute);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement a better error handling mechanism
    return res.status(500).json({
        message: err.message,
    });
});

http.createServer(app).listen(3000, () => {
    debug('Listening HTTP requests on port 3000.');
});
