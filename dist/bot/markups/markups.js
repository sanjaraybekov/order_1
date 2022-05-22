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
exports.main_menu = void 0;
const texts_1 = require("../constants/texts");
const i18_1 = require("../i18");
const main_menu = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return ctx.reply(`Assalomu Aleykum ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}! ` + (0, i18_1.t)(ctx, texts_1.texts.main_text), {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.yunusobod),
                        callback_data: texts_1.texts.yunusobod,
                    },
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.chilonzor),
                        callback_data: texts_1.texts.chilonzor,
                    },
                ],
                [
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.yakkasaroy),
                        callback_data: texts_1.texts.yakkasaroy,
                    },
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.beruniy),
                        callback_data: texts_1.texts.beruniy,
                    },
                ],
                [
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.sergili),
                        callback_data: texts_1.texts.sergili,
                    },
                ],
            ],
        },
        parse_mode: "HTML",
    });
});
exports.main_menu = main_menu;
