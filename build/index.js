"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const signup_1 = __importDefault(require("./auth/signup"));
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use(express_1.default.json());
app.use('/auth', signup_1.default);
app.listen(port, () => {
    console.log(`Listening on: https://localhost:${port}`);
});
