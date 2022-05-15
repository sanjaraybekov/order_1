import { session } from "grammy";
import { DEVELOPER_ID } from "../config";
import bot from "./core/bot";
import { main_menu } from "./markups/markups";
import i18n, { t } from "./i18";
import { routes } from "./routes/filterUserInfo";
import { texts } from "./constants/texts";

export const loadBot = () => {
  bot.use(
    session({
      initial: () => ({
        user: {},
        route: "",
        msg_id_to_delete: 0,
      }),
    })
  );
  bot.use(i18n.middleware());
  bot.command("start", (ctx) => {
    main_menu(ctx);
    ctx.session.route = texts.locations;
  });

  bot.use(routes);
  bot.start();

  bot.api.sendMessage(DEVELOPER_ID, "bot started /start");
};
