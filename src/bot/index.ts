import { session } from "grammy";
import { DEVELOPER_ID } from "../config";
import bot from "./core/bot";
import { main_menu } from "./markups/markups";
import i18n, { t } from "./i18";
import { form, routes } from "./routes/filterUserInfo";
import { texts } from "./constants/texts";

export const loadBot = () => {
	bot.use(
		session({
			initial: () => ({
				user: {},
				route: "",
				msg_id_to_delete: 0,
				data: {},
			}),
		})
	);
	bot.use(i18n.middleware());
	bot.use(routes);
	bot.command("start", (ctx) => {
		const firstStep = form[0];
		ctx.session.route = firstStep.id;
		return ctx.reply(firstStep.entry_text);
		// main_menu(ctx);
		// ctx.session.route = texts.locations;
	});
	bot.start({
		onStart() {
			bot.api.sendMessage(DEVELOPER_ID, "bot started /start");
		},
	});
};
