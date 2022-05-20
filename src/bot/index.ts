import { session } from "grammy";
import { DEVELOPER_ID } from "../config";
import bot from "./core/bot";
import { main_menu } from "./markups/markups";
import i18n, { t } from "./i18";
import { routes } from "./routes/filterUserInfo";
import { texts } from "./constants/texts";
import { getQuestions } from "./question";

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
		ctx.session.route = texts.locations;
		return main_menu(ctx);
	});

	bot.start({
		onStart() {
			bot.api.sendMessage(DEVELOPER_ID, "bot started /start");
		},
	});
};
