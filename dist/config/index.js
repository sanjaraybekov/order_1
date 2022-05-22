"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_DB = exports.DEVELOPER_ID = exports.TOKEN = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.TOKEN = process.env.TOKEN || "";
exports.DEVELOPER_ID = process.env.DEVELOPER_ID || "";
exports.PASSWORD_DB = process.env.PASSWORD_DB || "";
