import { getQuestionsFromExcel } from "./excel";

let questions: TQuestions;

export type TQuestions = string[];

export async function initQuestions() {
	return setQuestions(await getQuestionsFromExcel());
}

export function getQuestions() {
	return questions;
}

export function getOneQuestion(position: number) {
	return questions[position - 1];
}

export function setQuestions(new_qs: TQuestions) {
	questions = new_qs;
	return questions;
}
