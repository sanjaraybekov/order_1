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
exports.getAdminSection = exports.downloadQuestions = exports.getQuestionsFromExcel = exports.generateSheetsInExcel = exports.sendCurrentQuestionExcel = void 0;
const grammy_1 = require("grammy");
const _1 = require(".");
const path_1 = require("path");
const xlsx_1 = __importDefault(require("xlsx"));
const fs = require("fs");
const EXCEL_PATH = (0, path_1.resolve)(__dirname, "../../../statics/questions.xlsx");
function sendCurrentQuestionExcel(ctx) {
    return ctx.replyWithDocument(new grammy_1.InputFile(EXCEL_PATH, "questions"));
}
exports.sendCurrentQuestionExcel = sendCurrentQuestionExcel;
function generateSheetsInExcel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, path_1.resolve)(__dirname, `../../../statics/${data}`);
    });
}
exports.generateSheetsInExcel = generateSheetsInExcel;
function getQuestionsFromExcel() {
    return __awaiter(this, void 0, void 0, function* () {
        const workbook = xlsx_1.default.readFile(EXCEL_PATH);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = xlsx_1.default.utils
            .sheet_to_json(worksheet)
            .map((row) => row.text);
        return json;
    });
}
exports.getQuestionsFromExcel = getQuestionsFromExcel;
function downloadQuestions(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file_name = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.file_name;
            if (!(file_name &&
                (file_name.endsWith(".xls") || file_name.endsWith(".xlsx"))))
                return;
            const file = yield ctx.getFile();
            yield file.download(EXCEL_PATH);
            (0, _1.setQuestions)(yield getQuestionsFromExcel());
            return ctx.reply("Savollar o'zgartirldi!\nTekshirish uchun: /savollar");
        }
        catch (error) {
            console.error(error);
            return ctx.reply("Excel faylda qandaydir xatolik!");
        }
    });
}
exports.downloadQuestions = downloadQuestions;
const getAdminSection = () => {
    const bot = new grammy_1.Composer();
    bot.on(":document", downloadQuestions);
    bot.command("savollar", (ctx) => ctx.reply((0, _1.getQuestions)()
        .map((t, i) => `${i + 1}. ${t}`)
        .join("\n")));
    bot.command("anketalar", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        return ctx.replyWithDocument(new grammy_1.InputFile(yield generateSheetsInExcel("locations.xlsx"), "Hamma Locatsiyalar.xlsx"));
    }));
    bot.command("admin", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        return ctx.reply("Admin uchun\n/anketalar_lokatsiya - lokatsiyalar bo'yicha anketalar\n/anketalar - barcha anketalar\n/savollar - savollar");
    }));
    bot.command("anketalar_lokatsiya", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const dir = "./statics";
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (file.split(".")[0] === "questions")
                console.log("question");
            else if (file.split(".")[0] === "locations")
                console.log("location");
            else
                ctx.replyWithDocument(new grammy_1.InputFile(yield generateSheetsInExcel(file), file));
        }
    }));
    return bot;
};
exports.getAdminSection = getAdminSection;
