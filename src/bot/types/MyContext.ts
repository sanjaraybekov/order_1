import { Context, SessionFlavor } from "grammy";
import { I18nContextFlavor } from "@grammyjs/i18n";
import { Session } from "./Session";
import { FileFlavor } from "@grammyjs/files";

export type MyContext = FileFlavor<
	Context & I18nContextFlavor & SessionFlavor<Session>
>;
