"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
const i18n_1 = require("@grammyjs/i18n");
const path_1 = __importDefault(require("path"));
const i18n = new i18n_1.I18n({
    defaultLanguageOnMissing: true,
    defaultLanguage: "uz",
    sessionName: "session",
    directory: path_1.default.resolve(__dirname, "locales"),
    useSession: true,
    templateData: {
        pluralize: i18n_1.pluralize,
        uppercase: (value) => value.toUpperCase(),
    },
});
const t = (ctx, key) => ctx.i18n.t(key);
exports.t = t;
exports.default = i18n;
