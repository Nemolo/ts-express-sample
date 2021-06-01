"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
dotenv_1.config();
const app = express_1.default();
const port = process.env.PORT || 3000;
const router = express_1.default.Router();
router.get('', async (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});
app.use(router);
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
//# sourceMappingURL=app.js.map