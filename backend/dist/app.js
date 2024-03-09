"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load .env environment variables and update config folder path for config module
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.NODE_CONFIG_DIR = __dirname + '/config/';
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('quizlet-backend:app');
const ServiceRegistry_1 = __importDefault(require("./services/ServiceRegistry"));
// REST API Routes
const auth_1 = __importDefault(require("./routes/api/auth"));
const users_1 = __importDefault(require("./routes/api/users"));
// Check if the required configs to boot up are set
if (!config_1.default.get('mongoDB.connectionString')) {
    debug('FATAL ERROR: MongoDB connection string config is not set! Terminating process...');
    process.exit(1);
}
if (process.env.NODE_ENV === 'production' && !config_1.default.get('mongoDB.password')) {
    debug('FATAL ERROR: MongoDB password config is not set! Terminating process...');
    process.exit(1);
}
if (process.env.NODE_ENV === 'production' && !config_1.default.get('jwt.privateKey')) {
    debug('FATAL ERROR: JWT private key config is not set! Terminating process...');
    process.exit(1);
}
// Connect to MongoDB
let connectionString = config_1.default.get('mongoDB.connectionString');
const connectionPassword = config_1.default.get('mongoDB.password');
if (connectionPassword) {
    connectionString = connectionString.replace('<password>', connectionPassword);
}
mongoose_1.default
    .connect(connectionString)
    .then(() => debug('MongoDB connection established successfully!'))
    .catch((err) => debug('Could not connect to MongoDB!', err));
const app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Set ServiceRegistry as an application-wide variable
app.set('services', ServiceRegistry_1.default.getInstance());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
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
http_1.default.createServer(app).listen(3000, () => {
    debug(`Listening HTTP requests on port ${httpPort}.`);
});
