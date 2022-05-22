"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bot_1 = require("./bot");
const question_1 = require("./bot/question");
const User_1 = require("./db/User");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            database: "user_info_db",
            username: "postgres",
            port: 5432,
            password: "123123",
            host: "localhost",
            entities: [User_1.User],
            synchronize: true,
        });
        console.log("Connected to DB");
        yield (0, question_1.initQuestions)();
        return (0, bot_1.loadBot)();
    }
    catch (err) {
        console.log("Unable to connect DB, Eror: ", err);
    }
});
main();
