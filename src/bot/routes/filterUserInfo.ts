import { Router } from "@grammyjs/router";
import { MyContext } from "../types/MyContext";
import { texts } from "../constants/texts";
import { t } from "../i18";
import { Composer, Context, InputFile, Keyboard } from "grammy";
import { getPost } from "../helpers/getUserPost";
import getButtons from "../helpers/getButtons";
import bot from "../core/bot";
import converterFolder from "../converterFolder";
import { User } from "../../db/User";
import { resolve } from "path";

type FormType = "text" | "phone" | "keyboard";
type TForm = {
	id: string;
	type: FormType;
	entry_text: string;
	keyboards?: string[];
	next?: () => string;
};

export const form: TForm[] = [
	{
		type: "text",
		id: "address",
		entry_text: "Manzilni yuboring",
	},
	{
		type: "keyboard",
		id: "choose",
		entry_text: "Ikki yoki bir",
		keyboards: ["one", "two"],
	},
	{
		type: "keyboard",
		id: "locations",
		entry_text: "Lokatsiya",
		keyboards: ["1", "2", "3", "4"],
	},
	{
		type: "phone",
		id: "phone_number",
		entry_text: "Telefon raqamingizni yuboring",
	},
];

const routes = new Router<MyContext>((ctx) => ctx.session.route);

function handlePrevRouteData(prevField: TForm, ctx: MyContext) {
	if (ctx.message?.text) {
		if (prevField.type === "text") {
			ctx.session.data[prevField.id] = ctx.message.text;
		} else if (prevField.type === "keyboard") {
			if (prevField.keyboards?.includes(ctx.message.text)) {
				ctx.session.data[prevField.id] = ctx.message.text;
			} else {
				throw new Error("");
			}
		} else if (prevField.type === "phone") {
			if (
				ctx.message.text.match(
					/^(\+998)?(\s)?\d{2}(\s)?\d{3}(\s)?\d{2}(\s)?\d{2}$/
				)
			) {
				ctx.session.data[prevField.id] = ctx.message.text;
			} else {
				throw new Error("Telefon raqam xato!");
			}
		}
	} else if (ctx.message?.contact) {
		if (prevField.type === "phone") {
			ctx.session.data[prevField.id] = ctx.message.contact.phone_number;
		} else {
			throw new Error("");
		}
	}
}

for (let index = 0; index < form.length; index++) {
	console.log(index);

	routes.route(form[index].id, (ctx) => {
		const field = form[index];
		try {
			handlePrevRouteData(field, ctx);
		} catch (error) {
			ctx.session.route = field.id;
			const extra: any = {};

			if (field.keyboards) {
				extra.reply_markup = { keyboard: field.keyboards };
			}

			return ctx.reply(error.message || field.entry_text, extra);
		}

		if (form.length === index + 1) {
			console.log(ctx.session.data);

			return ctx.reply("Rahmat", {
				reply_markup: { remove_keyboard: true },
			});
		}

		const extra: any = {};
		const nextField = form[index + 1];

		if (nextField.keyboards) {
			extra.reply_markup = {
				keyboard: nextField.keyboards.map((t) => [t]),
			};
		} else if (nextField.type === "phone") {
			extra.reply_markup = {
				keyboard: [
					[
						{
							request_contact: true,
							text: "Telefon raqamni yuborish",
						},
					],
				],
			};
		}
		ctx.session.route = nextField.id;
		return ctx.reply(nextField.entry_text, extra);
	});
}

// routes.route(texts.locations, amodule);

// routes.route(texts.locations, async (ctx) => {
// 	ctx.session.user.User_telegram_id = ctx.chat?.id || 0;
// 	ctx.session.user.Telegram_username = ctx.from?.username || "";
// 	ctx.session.user.Locatsiya = t(ctx, ctx.update.callback_query?.data || "");

// 	ctx.session.route = texts.first_question;
// 	return ctx.editMessageText(t(ctx, texts.choose_chapter), {
// 		reply_markup: {
// 			inline_keyboard: [
// 				[
// 					{ text: t(ctx, texts.sold), callback_data: texts.sold },
// 					{
// 						text: t(ctx, texts.not_sold),
// 						callback_data: texts.not_sold,
// 					},
// 				],
// 			],
// 		},
// 	});
// });
// routes.route(texts.first_question, async (ctx) => {
// 	ctx.session.user.Bolim = t(ctx, ctx.update.callback_query?.data || "");
// 	const chapter = ctx.update.callback_query?.data;
// 	ctx.session.route = texts.second_question;
// 	return ctx.editMessageText(
// 		t(
// 			ctx,
// 			chapter === texts.sold
// 				? texts.first_question_sold
// 				: texts.first_question_not_sold
// 		),
// 		{
// 			reply_markup: {
// 				inline_keyboard: [
// 					[
// 						{
// 							text: t(ctx, texts.price),
// 							callback_data: texts.price,
// 						},
// 						{
// 							text: t(ctx, texts.assortment),
// 							callback_data: texts.assortment,
// 						},
// 					],
// 					[
// 						{
// 							text: t(ctx, texts.service),
// 							callback_data: texts.service,
// 						},
// 					],
// 				],
// 			},
// 		}
// 	);
// });

// routes.route(texts.second_question, async (ctx) => {
// 	const first_answer = ctx.update.callback_query?.data;
// 	ctx.session.user.Nima_yoqdi =
// 		t(ctx, first_answer ? first_answer : "") || "";

// 	ctx.session.route = texts.third_question;
// 	return ctx.editMessageText(t(ctx, texts.second_question), {
// 		reply_markup: {
// 			inline_keyboard: [
// 				...getButtons(
// 					[
// 						{ name: 1, id: 1 },
// 						{ name: 2, id: 2 },
// 						{ name: 3, id: 3 },
// 						{ name: 4, id: 4 },
// 						{ name: 5, id: 5 },
// 						{ name: 6, id: 6 },
// 						{ name: 7, id: 7 },
// 						{ name: 8, id: 8 },
// 						{ name: 9, id: 9 },
// 						{ name: 10, id: 10 },
// 					],
// 					4,
// 					"ball"
// 				),
// 			],
// 		},
// 	});
// });
// routes.route(texts.third_question, (ctx) => {
// 	ctx.session.user.Narx_ball =
// 		ctx.update.callback_query?.data?.split("_")[1] || "";
// 	ctx.session.route = texts.fourht_question;
// 	return ctx.editMessageText(t(ctx, texts.third_question), {
// 		reply_markup: {
// 			inline_keyboard: [
// 				...getButtons(
// 					[
// 						{ name: 1, id: 1 },
// 						{ name: 2, id: 2 },
// 						{ name: 3, id: 3 },
// 						{ name: 4, id: 4 },
// 						{ name: 5, id: 5 },
// 						{ name: 6, id: 6 },
// 						{ name: 7, id: 7 },
// 						{ name: 8, id: 8 },
// 						{ name: 9, id: 9 },
// 						{ name: 10, id: 10 },
// 					],
// 					4,
// 					"ball"
// 				),
// 			],
// 		},
// 	});
// });

// routes.route(texts.fourht_question, async (ctx, next) => {
// 	ctx.session.user.Assortiment_ball =
// 		ctx.update.callback_query?.data?.split("_")[1] || "";
// 	ctx.session.route = texts.fifth_question;
// 	return ctx
// 		.editMessageText(t(ctx, texts.fourht_question), {
// 			reply_markup: {
// 				inline_keyboard: [
// 					...getButtons(
// 						[
// 							{ name: 1, id: 1 },
// 							{ name: 2, id: 2 },
// 							{ name: 3, id: 3 },
// 							{ name: 4, id: 4 },
// 							{ name: 5, id: 5 },
// 							{ name: 6, id: 6 },
// 							{ name: 7, id: 7 },
// 							{ name: 8, id: 8 },
// 							{ name: 9, id: 9 },
// 							{ name: 10, id: 10 },
// 						],
// 						4,
// 						"ball"
// 					),
// 				],
// 			},
// 		})
// 		.then(() => next());
// });

// routes.route(texts.fifth_question, async (ctx, next) => {
// 	ctx.session.user.Xizmat_ball =
// 		ctx.update.callback_query?.data?.split("_")[1] || "";
// 	ctx.session.route = texts.sixth_question;
// 	return ctx.editMessageText(t(ctx, texts.fifth_question)).then(() => next());
// });
// routes.route(texts.sixth_question, async (ctx, next) => {
// 	if (ctx.update.message?.text) {
// 		ctx.session.user.Taklif = ctx.update.message?.text;
// 		ctx.session.route = texts.seventh_question;
// 		return ctx.reply(t(ctx, texts.sixth_question)).then(() => next());
// 	} else ctx.reply(t(ctx, texts.fifth_question_err));
// });
// routes.route(texts.seventh_question, async (ctx, next) => {
// 	if (ctx.update.message?.text) {
// 		ctx.session.user.Yosh = ctx.update.message?.text;
// 		ctx.session.route = texts.eighth_question;
// 		return ctx.reply(t(ctx, texts.seventh_question)).then(() => next());
// 	} else ctx.reply(t(ctx, texts.sixth_question_err));
// });

// routes.route(texts.eighth_question, async (ctx) => {
// 	if (ctx.update.message?.text) {
// 		ctx.session.user.Ism = ctx.update.message?.text;
// 		ctx.session.route = texts.last_session;
// 		const sendPhone = new Keyboard().requestContact(
// 			t(ctx, texts.eighth_question_content)
// 		);
// 		return ctx
// 			.reply(t(ctx, texts.eighth_question), {
// 				reply_markup: { ...sendPhone, resize_keyboard: true },
// 				parse_mode: "HTML",
// 			})
// 			.then((v) => (ctx.session.msg_id_to_delete = v.message_id));
// 	} else return ctx.reply(t(ctx, texts.seventh_question_err));
// });

// routes.route(texts.last_session, async (ctx) => {
// 	const regex = /\+?(998)? ?(\d{2} ?\d{3} ?\d{2} ?\d{2})$/gi;
// 	if (regex.test(ctx.msg?.text || "") || ctx.msg?.contact) {
// 		(ctx.session.user.Telefon_raqam = ctx.msg?.contact?.phone_number || ""),
// 			ctx.reply(t(ctx, texts.thanks));

// 		const newInfo = ctx.session.user;
// 		const newInfoDB = await User.create({
// 			User_telegram_id: Number(newInfo.User_telegram_id) || 0,
// 			Telegram_username: `@${newInfo.Telegram_username}`,
// 			Locatsiya: newInfo.Locatsiya,
// 			Bolim: newInfo.Bolim,
// 			Telefon_raqam: newInfo.Telefon_raqam,
// 			Nima_yoqdi: newInfo.Nima_yoqdi,
// 			Narx_ball: newInfo.Narx_ball,
// 			Assortiment_ball: newInfo.Assortiment_ball,
// 			Xizmat_ball: newInfo.Xizmat_ball,
// 			Taklif: newInfo.Taklif,
// 			Yosh: newInfo.Yosh,
// 			Ism: newInfo.Ism,
// 		});

// 		await newInfoDB.save();

// 		await converterFolder(ctx);

// 		const location = ctx.session.user.Locatsiya;

// 		await bot.api.sendDocument(
// 			-1001718670724,
// 			new InputFile(
// 				resolve(__dirname, "../../../statics", `${location}.xlsx`)
// 			),
// 			{
// 				caption: `${
// 					location === t(ctx, texts.yunusobod)
// 						? `Yunusobod`
// 						: location === t(ctx, texts.yakkasaroy)
// 						? `Yakkasaroy`
// 						: location === t(ctx, texts.sergili)
// 						? `Sergili`
// 						: location === t(ctx, texts.chilonzor)
// 						? `Chilonzor`
// 						: location === t(ctx, texts.beruniy)
// 						? `Beruniy`
// 						: ``
// 				}.xlsx`,
// 			}
// 		);
// 		return await bot.api
// 			.sendMessage(-1001718670724, getPost(ctx, ctx.session.user))
// 			.catch((err) => console.log(err));
// 	} else {
// 		return ctx.reply(t(ctx, texts.nineth_question_err));
// 	}
// });

export { routes };
