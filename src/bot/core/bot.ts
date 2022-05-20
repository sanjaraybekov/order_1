import { Bot } from "grammy";
import { TOKEN } from "../../config";
const convertJsonToExcel = require("../converterFolder");
import { MyContext } from "../types/MyContext";
const bot = new Bot<MyContext>(TOKEN);
convertJsonToExcel;
export default bot;
