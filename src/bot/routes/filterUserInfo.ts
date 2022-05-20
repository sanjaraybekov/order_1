import { Router } from "@grammyjs/router";
import { MyContext } from "../types/MyContext";
import { texts } from "../constants/texts";
import { t } from "../i18";
import { InputFile, Keyboard } from "grammy";
import { getPost } from "../helpers/getUserPost";
import getButtons from "../helpers/getButtons";
import bot from "../core/bot";
import converterFolder from "../converterFolder";
import { User } from "../../db/User";
import { resolve } from "path";
import { getOneQuestion } from "../question";

const routes = new Router<MyContext>((ctx) => ctx.session.route);

routes.route(texts.locations, async (ctx) => {
	ctx.session.user.User_telegram_id = ctx.chat?.id || 0;
	ctx.session.user.Telegram_username = ctx.from?.username || "";
	ctx.session.user.Locatsiya = t(ctx, ctx.update.callback_query?.data || "");
	console.log(getOneQuestion(2));

	ctx.session.route = texts.first_question;
	return ctx.editMessageText(t(ctx, texts.choose_chapter), {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: t(ctx, texts.sold), callback_data: texts.sold },
					{
						text: t(ctx, texts.not_sold),
						callback_data: texts.not_sold,
					},
				],
			],
		},
	});
});
routes.route(texts.first_question, async (ctx) => {
	ctx.session.user.Bolim = t(ctx, ctx.update.callback_query?.data || "");
	const chapter = ctx.update.callback_query?.data;
	ctx.session.route = texts.second_question;
	return ctx.editMessageText(
		t(
			ctx,
			chapter === texts.sold
				? texts.first_question_sold
				: texts.first_question_not_sold
		),
		{
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: t(ctx, texts.price),
							callback_data: texts.price,
						},
						{
							text: t(ctx, texts.assortment),
							callback_data: texts.assortment,
						},
					],
					[
						{
							text: t(ctx, texts.service),
							callback_data: texts.service,
						},
					],
				],
			},
		}
	);
});

routes.route(texts.second_question, async (ctx) => {
	const first_answer = ctx.update.callback_query?.data;
	ctx.session.user.Nima_yoqdi =
		t(ctx, first_answer ? first_answer : "") || "";

	ctx.session.route = texts.third_question;
	return ctx.editMessageText(t(ctx, texts.second_question), {
		reply_markup: {
			inline_keyboard: [
				...getButtons(
					[
						{ name: 1, id: 1 },
						{ name: 2, id: 2 },
						{ name: 3, id: 3 },
						{ name: 4, id: 4 },
						{ name: 5, id: 5 },
						{ name: 6, id: 6 },
						{ name: 7, id: 7 },
						{ name: 8, id: 8 },
						{ name: 9, id: 9 },
						{ name: 10, id: 10 },
					],
					4,
					"ball"
				),
			],
		},
	});
});
routes.route(texts.third_question, (ctx) => {
	ctx.session.user.Narx_ball =
		ctx.update.callback_query?.data?.split("_")[1] || "";
	ctx.session.route = texts.fourht_question;
	return ctx.editMessageText(t(ctx, texts.third_question), {
		reply_markup: {
			inline_keyboard: [
				...getButtons(
					[
						{ name: 1, id: 1 },
						{ name: 2, id: 2 },
						{ name: 3, id: 3 },
						{ name: 4, id: 4 },
						{ name: 5, id: 5 },
						{ name: 6, id: 6 },
						{ name: 7, id: 7 },
						{ name: 8, id: 8 },
						{ name: 9, id: 9 },
						{ name: 10, id: 10 },
					],
					4,
					"ball"
				),
			],
		},
	});
});

routes.route(texts.fourht_question, async (ctx, next) => {
	ctx.session.user.Assortiment_ball =
		ctx.update.callback_query?.data?.split("_")[1] || "";
	ctx.session.route = texts.fifth_question;
	return ctx.editMessageText(t(ctx, texts.fourht_question), {
		reply_markup: {
			inline_keyboard: [
				...getButtons(
					[
						{ name: 1, id: 1 },
						{ name: 2, id: 2 },
						{ name: 3, id: 3 },
						{ name: 4, id: 4 },
						{ name: 5, id: 5 },
						{ name: 6, id: 6 },
						{ name: 7, id: 7 },
						{ name: 8, id: 8 },
						{ name: 9, id: 9 },
						{ name: 10, id: 10 },
					],
					4,
					"ball"
				),
			],
		},
	});
});

routes.route(texts.fifth_question, async (ctx) => {
	ctx.session.user.Xizmat_ball =
		ctx.update.callback_query?.data?.split("_")[1] || "";
	ctx.session.route = texts.sixth_question;
	return ctx.editMessageText(t(ctx, texts.fifth_question));
});
routes.route(texts.sixth_question, (ctx) => {
	if (ctx.update.message?.text) {
		ctx.session.user.Taklif = ctx.update.message?.text;
		ctx.session.route = texts.seventh_question;
		return ctx.reply(t(ctx, texts.sixth_question));
	} else return ctx.reply(t(ctx, texts.fifth_question_err));
});
routes.route(texts.seventh_question, (ctx) => {
	if (ctx.update.message?.text) {
		ctx.session.user.Yosh = ctx.update.message?.text;
		ctx.session.route = texts.eighth_question;
		return ctx.reply(t(ctx, texts.seventh_question));
	} else return ctx.reply(t(ctx, texts.sixth_question_err));
});

routes.route(texts.eighth_question, async (ctx) => {
	if (ctx.update.message?.text) {
		ctx.session.user.Ism = ctx.update.message?.text;
		ctx.session.route = texts.last_session;
		const sendPhone = new Keyboard().requestContact(
			t(ctx, texts.eighth_question_content)
		);
		return ctx
			.reply(t(ctx, texts.eighth_question), {
				reply_markup: { ...sendPhone, resize_keyboard: true },
				parse_mode: "HTML",
			})
			.then((v: any) => (ctx.session.msg_id_to_delete = v.message_id));
	} else return ctx.reply(t(ctx, texts.seventh_question_err));
});

routes.route(texts.last_session, async (ctx) => {
	const regex = /\+?(998)? ?(\d{2} ?\d{3} ?\d{2} ?\d{2})$/gi;
	if (regex.test(ctx.msg?.text || "") || ctx.msg?.contact) {
		ctx.session.user.Telefon_raqam = ctx.msg?.contact?.phone_number || "";

		const newInfo = ctx.session.user;
		const newInfoDB = await User.create({
			User_telegram_id: Number(newInfo.User_telegram_id) || 0,
			Telegram_username: `@${newInfo.Telegram_username}`,
			Locatsiya: newInfo.Locatsiya,
			Bolim: newInfo.Bolim,
			Telefon_raqam: newInfo.Telefon_raqam,
			Nima_yoqdi: newInfo.Nima_yoqdi,
			Narx_ball: newInfo.Narx_ball,
			Assortiment_ball: newInfo.Assortiment_ball,
			Xizmat_ball: newInfo.Xizmat_ball,
			Taklif: newInfo.Taklif,
			Yosh: newInfo.Yosh,
			Ism: newInfo.Ism,
		});

		await newInfoDB.save();

		ctx.session.route = "main";
		await ctx.reply(t(ctx, texts.thanks), {
			reply_markup: { remove_keyboard: true },
		});

		await converterFolder(ctx);

		const location = ctx.session.user.Locatsiya;

		await bot.api.sendDocument(
			-1001718670724,
			new InputFile(
				resolve(__dirname, "../../../statics", `${location}.xlsx`)
			),
			{
				caption: `${
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
				}.xlsx`,
			}
		);
		return await bot.api
			.sendMessage(-1001718670724, getPost(ctx, ctx.session.user))
			.catch((err) => console.log(err));
	} else {
		return ctx.reply(t(ctx, texts.nineth_question_err));
	}
});

export { routes };
