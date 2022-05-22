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
exports.setQuestions = exports.getOneQuestion = exports.getQuestions = exports.initQuestions = void 0;
const excel_1 = require("./excel");
let questions;
function initQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        return setQuestions(yield (0, excel_1.getQuestionsFromExcel)());
    });
}
exports.initQuestions = initQuestions;
function getQuestions() {
    return questions;
}
exports.getQuestions = getQuestions;
function getOneQuestion(position) {
    return questions[position - 1];
}
exports.getOneQuestion = getOneQuestion;
function setQuestions(new_qs) {
    questions = new_qs;
    return questions;
}
exports.setQuestions = setQuestions;
