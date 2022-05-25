import { Composer, InputFile } from "grammy";
import { getQuestions, setQuestions, TQuestions } from ".";
import { resolve } from "path";
import { MyContext } from "../types/MyContext";
import XLSX from "xlsx";
import fs from "fs";
import { User } from "../../db/User";
const EXCEL_PATH = resolve(__dirname, "../../../statics/questions.xlsx");
export function sendCurrentQuestionExcel(ctx: MyContext) {
	return ctx.replyWithDocument(new InputFile(EXCEL_PATH, "questions"));
}

export async function getPath(data: string) {
	return resolve(__dirname, `../../../statics/${data}`);
}

export async function generateExcel() {
	const users = await User.find();
	// console.log(users);
	const workSheet = XLSX.utils.json_to_sheet(users);
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, workSheet);
	XLSX.writeFile(
		workBook,
		`${resolve(__dirname, "../../../statics/locations.xlsx")}`
	);
	console.log("sss");
}

export async function getQuestionsFromExcel() {
	let path = EXCEL_PATH;

	if (!fs.existsSync(EXCEL_PATH)) {
		path = path.replace("questions", "init_questions");
		fs.copyFile(path, EXCEL_PATH, () => "");
	}

	const workbook = XLSX.readFile(path);
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
	bot.command("savollar", async (ctx) => {
		await ctx.replyWithDocument(new InputFile(EXCEL_PATH));

		return ctx.reply(
			getQuestions()
				.map((t, i) => `${i + 1}. ${t}`)
				.join("\n")
		);
	});
	bot.command("anketalar", async (ctx) => {
		await generateExcel();
		return ctx.replyWithDocument(
			new InputFile(
				await getPath("locations.xlsx"),
				"Hamma Locatsiyalar.xlsx"
			)
		);
	});
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
			else if (file.split(".")[0] === "init_questions")
				console.log("init_questions");
			else
				ctx.replyWithDocument(new InputFile(await getPath(file), file));
		}
	});

	return bot;
};
