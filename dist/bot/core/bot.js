"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = require("../../config");
const convertJsonToExcel = require("../converterFolder");
const bot = new grammy_1.Bot(config_1.TOKEN);
convertJsonToExcel;
exports.default = bot;
