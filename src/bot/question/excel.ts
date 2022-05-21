import { Composer, InputFile } from "grammy";
import { getQuestions, setQuestions, TQuestions } from ".";
import { resolve } from "path";
import { MyContext } from "../types/MyContext";
import XLSX from "xlsx";
const fs = require("fs");

const EXCEL_PATH = resolve(__dirname, "../../../statics/questions.xlsx");

export function sendCurrentQuestionExcel(ctx: MyContext) {
	return ctx.replyWithDocument(new InputFile(EXCEL_PATH, "questions"));
}

export async function generateSheetsInExcel(data: string) {
	return resolve(__dirname, `../../../statics/${data}`);
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
	bot.command("anketalar", async (ctx) =>
		ctx.replyWithDocument(
			new InputFile(
				await generateSheetsInExcel("locations.xlsx"),
				"Hamma Locatsiyalar.xlsx"
			)
		)
	);
	bot.command("admin", async (ctx) =>
		ctx.reply(
			"Admin uchun\n/anketalar_lokatsiya - lokatsiyalar bo'yicha anketalar\n/anketalar - barcha anketalar\n/savollar - savollar"
		)
	);

	bot.command("anketalar_lokatsiya", async (ctx) => {
		const dir = "./statics";
		const files = fs.readdirSync(dir);
		for (const file of files) {
			if (file.split(".")[0] === "questions") console.log("question");
			else if (file.split(".")[0] === "locations")
				console.log("location");
			else
				ctx.replyWithDocument(
					new InputFile(await generateSheetsInExcel(file), file)
				);
		}
	});

	return bot;
};
