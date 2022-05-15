import { User } from "../../db/User";
import { texts } from "../constants/texts";
import { t } from "../i18";
import { MyContext } from "../types/MyContext";
const XLSX = require("xlsx");

const convertJsonToExcel = async (ctx: MyContext) => {
  const location = ctx.session.user.Locatsiya;

  const usersData = await User.find({ where: { Locatsiya: location } });

  const workSheet = XLSX.utils.json_to_sheet(usersData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workBook,
    workSheet,
    `${
      location === t(ctx, texts.yunusobod)
        ? `Yunusobod`
        : location === t(ctx, texts.yakkasaroy)
        ? `Yakkasaroy`
        : location === t(ctx, texts.sergili)
        ? `Sergili`
        : location === t(ctx, texts.chilonzor)
        ? `Chilonzor`
        : location === t(ctx, texts.beruniy)
        ? `Beruniy`
        : ``
    }`
  );

  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(
    workBook,
    `${
      location === t(ctx, texts.yunusobod)
        ? `Yunusobod`
        : location === t(ctx, texts.yakkasaroy)
        ? `Yakkasaroy`
        : location === t(ctx, texts.sergili)
        ? `Sergili`
        : location === t(ctx, texts.chilonzor)
        ? `Chilonzor`
        : location === t(ctx, texts.beruniy)
        ? `Beruniy`
        : ``
    }.xlsx`
  );
};

export default convertJsonToExcel;
