"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BooksController_1 = __importDefault(require("../controllers/BooksController"));
const bookRouter = (0, express_1.default)();
bookRouter.get('/:id?', BooksController_1.default.getBooks);
bookRouter.post('/', BooksController_1.default.addBook);
exports.default = bookRouter;
