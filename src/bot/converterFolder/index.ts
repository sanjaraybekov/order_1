import { User } from "../../db/User";
import { texts } from "../constants/texts";
import { t } from "../i18";
import { resolve } from "path";
import { MyContext } from "../types/MyContext";
const XLSX = require("xlsx");

const convertJsonToExcel = async (ctx: MyContext) => {
	const location = ctx.session.user.locatsiya;

	const usersData = await User.find({ where: { locatsiya: location } });

	const workSheet = XLSX.utils.json_to_sheet(usersData);
	const workBook = XLSX.utils.book_new();

	XLSX.utils.book_append_sheet(
		workBook,
		workSheet,
		`${
			location === t(ctx, texts.location_beruniy)
				? `Beruniy`
				: location === t(ctx, texts.location_magnit)
				? `Magnit`
				: location === t(ctx, texts.location_shuxrat)
				? `Shuxrat`
				: ``
		}`
	);

	XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
	XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

	XLSX.writeFile(
		workBook,
		`${resolve(__dirname, "../../../statics", location)}.xlsx`
	);
};

export default convertJsonToExcel;
