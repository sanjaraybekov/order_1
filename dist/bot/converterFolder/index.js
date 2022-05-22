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
const User_1 = require("../../db/User");
const texts_1 = require("../constants/texts");
const i18_1 = require("../i18");
const path_1 = require("path");
const XLSX = require("xlsx");
const convertJsonToExcel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const location = ctx.session.user.Locatsiya;
    const usersData = yield User_1.User.find({ where: { Locatsiya: location } });
    const workSheet = XLSX.utils.json_to_sheet(usersData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${location === (0, i18_1.t)(ctx, texts_1.texts.yunusobod)
        ? `Yunusobod`
        : location === (0, i18_1.t)(ctx, texts_1.texts.yakkasaroy)
            ? `Yakkasaroy`
            : location === (0, i18_1.t)(ctx, texts_1.texts.sergili)
                ? `Sergili`
                : location === (0, i18_1.t)(ctx, texts_1.texts.chilonzor)
                    ? `Chilonzor`
                    : location === (0, i18_1.t)(ctx, texts_1.texts.beruniy)
                        ? `Beruniy`
                        : ``}`);
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, (0, path_1.resolve)(__dirname, "../../../statics/locations.xlsx"));
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.writeFile(workBook, `${(0, path_1.resolve)(__dirname, "../../../statics", location)}.xlsx`);
});
exports.default = convertJsonToExcel;
