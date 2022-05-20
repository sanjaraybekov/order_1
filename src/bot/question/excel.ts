import { Composer, InputFile } from "grammy";
import { getQuestions, setQuestions, TQuestions } from ".";
import { resolve } from "path";
import { MyContext } from "../types/MyContext";
import XLSX from "xlsx";

const EXCEL_PATH = resolve(__dirname, "../../../statics/questions.xlsx");

export function sendCurrentQuestionExcel(ctx: MyContext) {
	return ctx.replyWithDocument(new InputFile(EXCEL_PATH, "questions"));
}

export async function getQuestionsFromExcel() {
	const workbook = XLSX.readFile(EXCEL_PATH);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
	const json: TQuestions = XLSX.utils
		.sheet_to_json(worksheet)
		.map((row: any) => row.text);

	return json;
}

export async function downloadQuestions(ctx: MyContext) {
	try {
		// validate
		const file_name = ctx.message?.document?.file_name;
		if (
			!(
				file_name &&
				(file_name.endsWith(".xls") || file_name.endsWith(".xlsx"))
			)
		)
			return;

		// download
		const file = await ctx.getFile();

		// Download the file to a temporary location.
		await file.download(EXCEL_PATH);

		// set new data
		setQuestions(await getQuestionsFromExcel());

		return ctx.reply("Savollar o'zgartirldi!\nTekshirish uchun: /savollar");
	} catch (error) {
		console.error(error);

		return ctx.reply("Excel faylda qandaydir xatolik!");
	}
}

export const getAdminSection = () => {
	const bot = new Composer<MyContext>();

	bot.on(":document", downloadQuestions);
	bot.command("savollar", (ctx) =>
		ctx.reply(
			getQuestions()
				.map((t, i) => `${i + 1}. ${t}`)
				.join("\n")
		)
	);

	return bot;
};
