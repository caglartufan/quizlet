// Load .env environment variables and update config folder path for config module
import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_CONFIG_DIR = __dirname + '/config/';

import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import config from 'config';
import mongoose from 'mongoose';
import debugFn from 'debug';
const debug = debugFn('quizlet-backend:app');
import { HTTPError } from './utils/ErrorHandler';
import ServiceRegistry from './services/ServiceRegistry';

// REST API Routes
import authRoute from './routes/api/auth';
import usersRoute from './routes/api/users';

// Check if the required configs to boot up are set
if (!config.get('mongoDB.connectionString')) {
    debug(
        'FATAL ERROR: MongoDB connection string config is not set! Terminating process...'
    );
    process.exit(1);
}

if (process.env.NODE_ENV === 'production' && !config.get('mongoDB.password')) {
    debug(
        'FATAL ERROR: MongoDB password config is not set! Terminating process...'
    );
    process.exit(1);
}

if (process.env.NODE_ENV === 'production' && !config.get('jwt.privateKey')) {
    debug(
        'FATAL ERROR: JWT private key config is not set! Terminating process...'
    );
    process.exit(1);
}

// Connect to MongoDB
let connectionString: string = config.get('mongoDB.connectionString');
const connectionPassword: string = config.get('mongoDB.password');
if (connectionPassword) {
    connectionString = connectionString.replace(
        '<password>',
        connectionPassword
    );
}

mongoose
    .connect(connectionString)
    .then(() => debug('MongoDB connection established successfully!'))
    .catch((err: Error) => debug('Could not connect to MongoDB!', err));

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set ServiceRegistry as an application-wide variable
app.set('services', ServiceRegistry.getInstance());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

// Error handling middleware
app.use((err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        ok: false,
        message: err.message,
        errors: 'errors' in err ? err.errors : undefined,
    });
});

// Not Found Handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//     const err = new Error('Not Found');
//     err.name = 'NotFoundError';
//     res.status(404).json({
//         ok: false,
//         message: 'Endpoint not found',
//     });
// });

// Listen through provided port for HTTP server
const httpPort = process.env.HTTP_PORT ?? 3000;
http.createServer(app).listen(3000, () => {
    debug(`Listening HTTP requests on port ${httpPort}.`);
});
