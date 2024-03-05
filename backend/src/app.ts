import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import debugFn from 'debug';
import { json } from 'body-parser';
import logger from 'morgan';

const debug = debugFn('quizlet-backend:app');
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(json());
app.use(express.urlencoded({ extended: false }))

// Routes

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement a better error handling mechanism
    return res.status(500).json({
        message: err.message
    });
});

http.createServer(app).listen(3000, () => {
    debug('Listening HTTP requests on port 3000.');
});