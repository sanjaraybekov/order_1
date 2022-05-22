"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = void 0;
const texts_1 = require("../constants/texts");
const i18_1 = require("../i18");
const getPost = (ctx, data) => {
    return `Yangi ma'lumot\n\n${(0, i18_1.t)(ctx, texts_1.texts.userfullname) + data.Ism}\n${(0, i18_1.t)(ctx, texts_1.texts.age) + data.Yosh}\n${(0, i18_1.t)(ctx, texts_1.texts.userchapter) + data.Bolim}\n${(0, i18_1.t)(ctx, texts_1.texts.location) + data.Locatsiya}\n${(0, i18_1.t)(ctx, texts_1.texts.like) + data.Nima_yoqdi}\n${(0, i18_1.t)(ctx, texts_1.texts.price_ball) + data.Narx_ball}\n${(0, i18_1.t)(ctx, texts_1.texts.assorti_ball) + data.Assortiment_ball}\n${(0, i18_1.t)(ctx, texts_1.texts.service_ball) + data.Xizmat_ball}\n${(0, i18_1.t)(ctx, texts_1.texts.offer) + data.Taklif}\n${(0, i18_1.t)(ctx, texts_1.texts.username) + "@" + data.Telegram_username}\n${(0, i18_1.t)(ctx, texts_1.texts.phone) + data.Telefon_raqam}\n\nID: ${data.User_telegram_id}`;
};
exports.getPost = getPost;
