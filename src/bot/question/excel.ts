import { InputFile } from "grammy";
import { setQuestions } from ".";
import { MyContext } from "../types/MyContext";

const EXCEL_PATH = "bot/questions/questions.xlsx";

export function sendCurrentQuestionExcel(ctx: MyContext) {
	return ctx.replyWithDocument(new InputFile(EXCEL_PATH, "questions"));
}

export async function getQuestionsFromExcel() {
	return {
		first: "Hi_1",
		second: "Hi_2",
		third: "Hi_3",
		fourth: "Hi_4",
		fifth: "Hi_5",
	};
}

export async function downloadQuestions(ctx: MyContext) {
	try {
		// download
		const file = await ctx.getFile();

		// Download the file to a temporary location.
		await file.download(EXCEL_PATH);

		// set new data
		setQuestions(await getQuestionsFromExcel());

		return ctx.reply("Savollar o'zgartirldi!");
	} catch (error) {
		console.error(error);

		return ctx.reply("Excel faylda qandaydir xatolik!");
	}
}
