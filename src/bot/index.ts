import { session } from "grammy";
import { DEVELOPER_ID } from "../config";
import bot from "./core/bot";
import { main_menu } from "./markups/markups";
import i18n, { t } from "./i18";
import { routes } from "./routes/filterUserInfo";
import { texts } from "./constants/texts";
import { getAdminSection } from "./question/excel";
import { hydrateFiles } from "@grammyjs/files";

// import { User } from "../db/User";

export const loadBot = () => {
	bot.api.config.use(hydrateFiles(bot.token));
	bot.use(getAdminSection());
	bot.use((ctx, next) => (ctx.chat?.type === "private" ? next() : undefined));
	bot.use(
		session({
			initial: () => ({
				user: {},
				route: "main",
				msg_id_to_delete: 0,
				data: {},
			}),
		})
	);
	bot.use(i18n.middleware());
	bot.use(routes);

	bot.on(":text", async (ctx) => {
		if (ctx.chat) {
			// const user = await User.findOne({
			// 	where: {
			// 		User_telegram_id: ctx.chat?.id,
			// 	},
			// });

			// if (user) {
			// 	return ctx.reply("Siz ankatani to'ldirib bo'lgansiz. Rahmat!");
			// }

			ctx.session.route = texts.locations;
			return main_menu(ctx);
		}

		return;
	});

	bot.start({
		onStart() {
			bot.api.sendMessage(DEVELOPER_ID, "bot started /start");
		},
	});
};
