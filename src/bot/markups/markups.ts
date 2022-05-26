import { texts } from "../constants/texts";
import { t } from "../i18";
import { MyContext } from "../types/MyContext";

export const main_menu = async (ctx: MyContext) => {
	return ctx.reply(t(ctx, texts.main_text), {
		reply_markup: {
			keyboard: [
				[
					{
						text: t(ctx, texts.men),
						// callback_data: texts.yunusobod,
					},
					{
						text: t(ctx, texts.women),
						// callback_data: texts.chilonzor,
					},
				],
			],
			resize_keyboard: true,
		},

		parse_mode: "HTML",
	});
};
// reply_markup: {
// 	keyboard: [
// 		[
// 			{
// 				text: t(ctx, texts.yunusobod),
// 				// callback_data: texts.yunusobod,
// 			},
// 			{
// 				text: t(ctx, texts.chilonzor),
// 				// callback_data: texts.chilonzor,
// 			},
// 		],
// 		[
// 			{
// 				text: t(ctx, texts.yakkasaroy),
// 				// callback_data: texts.yakkasaroy,
// 			},
// 			{
// 				text: t(ctx, texts.beruniy),
// 				// callback_data: texts.beruniy,
// 			},
// 		],
// 		[
// 			{
// 				text: t(ctx, texts.sergili),
// 				// callback_data: texts.sergili,
// 			},
// 		],
// 	],
// 	resize_keyboard: true,
// },
