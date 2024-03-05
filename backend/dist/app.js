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
const debug_1 = __importDefault(require("debug"));
const morgan_1 = __importDefault(require("morgan"));
const users_1 = __importDefault(require("./routes/api/users"));
const debug = (0, debug_1.default)('quizlet-backend:app');
const app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use('/api/users', users_1.default);
// Error handling
app.use((err, req, res, next) => {
    // TODO: Implement a better error handling mechanism
    return res.status(500).json({
        message: err.message,
    });
});
http_1.default.createServer(app).listen(3000, () => {
    debug('Listening HTTP requests on port 3000.');
});
