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
exports.routes = void 0;
const router_1 = require("@grammyjs/router");
const texts_1 = require("../constants/texts");
const i18_1 = require("../i18");
const grammy_1 = require("grammy");
const getUserPost_1 = require("../helpers/getUserPost");
const getButtons_1 = __importDefault(require("../helpers/getButtons"));
const bot_1 = __importDefault(require("../core/bot"));
const converterFolder_1 = __importDefault(require("../converterFolder"));
const User_1 = require("../../db/User");
const question_1 = require("../question");
const routes = new router_1.Router((ctx) => ctx.session.route);
exports.routes = routes;
routes.route(texts_1.texts.locations, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    ctx.session.user.User_telegram_id = ((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id) || 0;
    ctx.session.user.Telegram_username = ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username) || "";
    ctx.session.user.Locatsiya = (0, i18_1.t)(ctx, ((_c = ctx.update.callback_query) === null || _c === void 0 ? void 0 : _c.data) || "");
    ctx.session.route = texts_1.texts.first_question;
    return ctx.editMessageText((0, i18_1.t)(ctx, texts_1.texts.choose_chapter), {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: (0, i18_1.t)(ctx, texts_1.texts.sold), callback_data: texts_1.texts.sold },
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.not_sold),
                        callback_data: texts_1.texts.not_sold,
                    },
                ],
            ],
        },
    });
}));
routes.route(texts_1.texts.first_question, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    ctx.session.user.Bolim = (0, i18_1.t)(ctx, ((_d = ctx.update.callback_query) === null || _d === void 0 ? void 0 : _d.data) || "");
    const chapter = (_e = ctx.update.callback_query) === null || _e === void 0 ? void 0 : _e.data;
    ctx.session.route = texts_1.texts.second_question;
    return ctx.editMessageText((0, i18_1.t)(ctx, chapter === texts_1.texts.sold ? (0, question_1.getOneQuestion)(1) : (0, question_1.getOneQuestion)(2)), {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.price),
                        callback_data: texts_1.texts.price,
                    },
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.assortment),
                        callback_data: texts_1.texts.assortment,
                    },
                ],
                [
                    {
                        text: (0, i18_1.t)(ctx, texts_1.texts.service),
                        callback_data: texts_1.texts.service,
                    },
                ],
            ],
        },
    });
}));
routes.route(texts_1.texts.second_question, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const first_answer = (_f = ctx.update.callback_query) === null || _f === void 0 ? void 0 : _f.data;
    ctx.session.user.Nima_yoqdi =
        (0, i18_1.t)(ctx, first_answer ? first_answer : "") || "";
    ctx.session.route = texts_1.texts.third_question;
    return ctx.editMessageText((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(3)), {
        reply_markup: {
            inline_keyboard: [
                ...(0, getButtons_1.default)([
                    { name: 1, id: 1 },
                    { name: 2, id: 2 },
                    { name: 3, id: 3 },
                    { name: 4, id: 4 },
                    { name: 5, id: 5 },
                    { name: 6, id: 6 },
                    { name: 7, id: 7 },
                    { name: 8, id: 8 },
                    { name: 9, id: 9 },
                    { name: 10, id: 10 },
                ], 4, "ball"),
            ],
        },
    });
}));
routes.route(texts_1.texts.third_question, (ctx) => {
    var _a, _b;
    ctx.session.user.Narx_ball =
        ((_b = (_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.split("_")[1]) || "";
    ctx.session.route = texts_1.texts.fourht_question;
    return ctx.editMessageText((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(4)), {
        reply_markup: {
            inline_keyboard: [
                ...(0, getButtons_1.default)([
                    { name: 1, id: 1 },
                    { name: 2, id: 2 },
                    { name: 3, id: 3 },
                    { name: 4, id: 4 },
                    { name: 5, id: 5 },
                    { name: 6, id: 6 },
                    { name: 7, id: 7 },
                    { name: 8, id: 8 },
                    { name: 9, id: 9 },
                    { name: 10, id: 10 },
                ], 4, "ball"),
            ],
        },
    });
});
routes.route(texts_1.texts.fourht_question, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    ctx.session.user.Assortiment_ball =
        ((_h = (_g = ctx.update.callback_query) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.split("_")[1]) || "";
    ctx.session.route = texts_1.texts.fifth_question;
    return ctx.editMessageText((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(5)), {
        reply_markup: {
            inline_keyboard: [
                ...(0, getButtons_1.default)([
                    { name: 1, id: 1 },
                    { name: 2, id: 2 },
                    { name: 3, id: 3 },
                    { name: 4, id: 4 },
                    { name: 5, id: 5 },
                    { name: 6, id: 6 },
                    { name: 7, id: 7 },
                    { name: 8, id: 8 },
                    { name: 9, id: 9 },
                    { name: 10, id: 10 },
                ], 4, "ball"),
            ],
        },
    });
}));
routes.route(texts_1.texts.fifth_question, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    ctx.session.user.Xizmat_ball =
        ((_k = (_j = ctx.update.callback_query) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.split("_")[1]) || "";
    ctx.session.route = texts_1.texts.sixth_question;
    return ctx.editMessageText((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(6)));
}));
routes.route(texts_1.texts.sixth_question, (ctx) => {
    var _a, _b;
    if ((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.text) {
        ctx.session.user.Taklif = (_b = ctx.update.message) === null || _b === void 0 ? void 0 : _b.text;
        ctx.session.route = texts_1.texts.seventh_question;
        return ctx.reply((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(7)));
    }
    else
        return ctx.reply((0, i18_1.t)(ctx, texts_1.texts.fifth_question_err));
});
routes.route(texts_1.texts.seventh_question, (ctx) => {
    var _a, _b;
    if ((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.text) {
        ctx.session.user.Yosh = (_b = ctx.update.message) === null || _b === void 0 ? void 0 : _b.text;
        ctx.session.route = texts_1.texts.eighth_question;
        return ctx.reply((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(8)));
    }
    else
        return ctx.reply((0, i18_1.t)(ctx, texts_1.texts.sixth_question_err));
});
routes.route(texts_1.texts.eighth_question, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    if ((_l = ctx.update.message) === null || _l === void 0 ? void 0 : _l.text) {
        ctx.session.user.Ism = (_m = ctx.update.message) === null || _m === void 0 ? void 0 : _m.text;
        ctx.session.route = texts_1.texts.last_session;
        const sendPhone = new grammy_1.Keyboard().requestContact((0, i18_1.t)(ctx, texts_1.texts.eighth_question_content));
        return ctx
            .reply((0, i18_1.t)(ctx, (0, question_1.getOneQuestion)(9)), {
            reply_markup: Object.assign(Object.assign({}, sendPhone), { resize_keyboard: true }),
            parse_mode: "HTML",
        })
            .then((v) => (ctx.session.msg_id_to_delete = v.message_id));
    }
    else
        return ctx.reply((0, i18_1.t)(ctx, texts_1.texts.seventh_question_err));
}));
routes.route(texts_1.texts.last_session, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r;
    const regex = /\+?(998)? ?(\d{2} ?\d{3} ?\d{2} ?\d{2})$/gi;
    if (regex.test(((_o = ctx.msg) === null || _o === void 0 ? void 0 : _o.text) || "") || ((_p = ctx.msg) === null || _p === void 0 ? void 0 : _p.contact)) {
        ctx.session.user.Telefon_raqam = ((_r = (_q = ctx.msg) === null || _q === void 0 ? void 0 : _q.contact) === null || _r === void 0 ? void 0 : _r.phone_number) || "";
        const newInfo = ctx.session.user;
        const newInfoDB = yield User_1.User.create({
            User_telegram_id: Number(newInfo.User_telegram_id) || 0,
            Telegram_username: `@${newInfo.Telegram_username}`,
            Locatsiya: newInfo.Locatsiya,
            Bolim: newInfo.Bolim,
            Telefon_raqam: newInfo.Telefon_raqam,
            Nima_yoqdi: newInfo.Nima_yoqdi,
            Narx_ball: newInfo.Narx_ball,
            Assortiment_ball: newInfo.Assortiment_ball,
            Xizmat_ball: newInfo.Xizmat_ball,
            Taklif: newInfo.Taklif,
            Yosh: newInfo.Yosh,
            Ism: newInfo.Ism,
        });
        yield newInfoDB.save();
        ctx.session.route = "main";
        yield ctx.reply((0, i18_1.t)(ctx, texts_1.texts.thanks), {
            reply_markup: { remove_keyboard: true },
        });
        yield (0, converterFolder_1.default)(ctx);
        return yield bot_1.default.api
            .sendMessage(-1001718670724, (0, getUserPost_1.getPost)(ctx, ctx.session.user))
            .catch((err) => console.log(err));
    }
    else {
        return ctx.reply((0, i18_1.t)(ctx, texts_1.texts.nineth_question_err));
    }
}));
