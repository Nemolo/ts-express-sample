"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const body_parser_1 = require("body-parser");
const auth_controller_1 = require("./controllers/auth.controller");
const data_controller_1 = require("./controllers/data.controller");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(body_parser_1.json());
const indexRouter = express_1.default.Router();
indexRouter.get('', async (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});
app.use('/', indexRouter);
app.use('/auth', auth_controller_1.authRouter);
app.use('/data', data_controller_1.dataRouter);
app.use(async (req, res) => {
    return res.status(404).send();
});
//error handling
app.use(async (err, req, res, next) => {
    if (err) {
        res.status(500).json(err);
    }
});
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
//# sourceMappingURL=app.js.map