import { getQuestionsFromExcel } from "./excel";

let questions: TQuestions;

export type TQuestions = {
	first: string;
	second: string;
	third: string;
	fourth: string;
	fifth: string;
};

export async function initQuestions() {
	return setQuestions(await getQuestionsFromExcel());
}

export function getQuestions() {
	return questions;
}

export function setQuestions(new_qs: TQuestions) {
	questions = new_qs;
	return questions;
}
