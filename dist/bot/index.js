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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBot = void 0;
const grammy_1 = require("grammy");
const config_1 = require("../config");
const bot_1 = __importDefault(require("./core/bot"));
const markups_1 = require("./markups/markups");
const i18_1 = __importDefault(require("./i18"));
const filterUserInfo_1 = require("./routes/filterUserInfo");
const texts_1 = require("./constants/texts");
const excel_1 = require("./question/excel");
const files_1 = require("@grammyjs/files");
const loadBot = () => {
    bot_1.default.api.config.use((0, files_1.hydrateFiles)(bot_1.default.token));
    bot_1.default.use((0, excel_1.getAdminSection)());
    bot_1.default.use((ctx, next) => { var _a; return (((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.type) === "private" ? next() : undefined); });
    bot_1.default.use((0, grammy_1.session)({
        initial: () => ({
            user: {},
            route: "main",
            msg_id_to_delete: 0,
            data: {},
        }),
    }));
    bot_1.default.use(i18_1.default.middleware());
    bot_1.default.use(filterUserInfo_1.routes);
    bot_1.default.on(":text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.chat) {
            ctx.session.route = texts_1.texts.locations;
            return (0, markups_1.main_menu)(ctx);
        }
        return;
    }));
    bot_1.default.start({
        onStart() {
            bot_1.default.api.sendMessage(config_1.DEVELOPER_ID, "bot started /start");
        },
    });
};
exports.loadBot = loadBot;
