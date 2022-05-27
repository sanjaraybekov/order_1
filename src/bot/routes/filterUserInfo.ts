import { Router } from "@grammyjs/router";
import { MyContext } from "../types/MyContext";
import { texts } from "../constants/texts";
import { t } from "../i18";
import { Keyboard } from "grammy";
import { getPost } from "../helpers/getUserPost";
import getButtons from "../helpers/getButtons";
import bot from "../core/bot";
import converterFolder from "../converterFolder";
import { User } from "../../db/User";
import { getOneQuestion } from "../question";
import { ball, men, women } from "../constants/buttons";
import { main_menu } from "../markups/markups";

const routes = new Router<MyContext>((ctx) => ctx.session.route);

routes.route(texts.persontype, async (ctx) => {
	if (
		ctx.message?.text === t(ctx, texts.men) ||
		ctx.message?.text === t(ctx, texts.women)
	) {
		ctx.session.user.user_telegram_id = ctx.chat?.id || 0;
		ctx.session.user.telegram_username = ctx.from?.username || "";
		ctx.session.user.persontype = ctx.message?.text || "";
		ctx.session.route = texts.locations;
		return ctx.reply(t(ctx, texts.choose_location), {
			reply_markup: {
				keyboard: [
					...getButtons(
						ctx,
						ctx.session.user.persontype === t(ctx, texts.men)
							? men
							: women,
						2,
						"location"
					),
				],
				resize_keyboard: true,
			},
		});
	} else
		return ctx.reply(
			"Iltimos quyidagi tugmalar yordamida o'zingizga kerakli bo'limni tanlang"
		);
});

routes.route(texts.locations, async (ctx) => {
	const location = (men || women).find(
		(locate) => locate.id === ctx.message?.text?.split(" ")[men.length - 1]
	);
	if (location) {
		ctx.session.user.locatsiya = ctx.message?.text || "";

		ctx.session.route = texts.first_question;
		return ctx.reply(t(ctx, texts.choose_chapter), {
			reply_markup: {
				keyboard: [
					[
						{
							text: t(ctx, texts.sold),
						},
						{
							text: t(ctx, texts.not_sold),
						},
					],
				],
				resize_keyboard: true,
			},
		});
	}
	return ctx.reply(
		"Iltimos quyidagi tugmalar yordamida o'zingizga tegishli locatsiyangizni tanlang"
	);
});
routes.route(texts.first_question, async (ctx) => {
	if (
		ctx.message?.text === t(ctx, texts.sold) ||
		ctx.message?.text === t(ctx, texts.not_sold)
	) {
		ctx.session.user.bolim = ctx.message?.text || "";
		ctx.session.route = texts.second_question;

		return ctx.reply(t(ctx, getOneQuestion(1)), {
			reply_markup: { remove_keyboard: true },
		});
	}
	return ctx.reply(
		"Iltimos quyidagi tugmalar yordamida o'zingizga tegishli bo'limni tanlang"
	);
});

routes.route(texts.second_question, async (ctx) => {
	if (ctx.update.message?.text?.split(" ").length === 2) {
		ctx.session.user.ism = ctx.update.message?.text;
		ctx.session.route = texts.third_question;
		return ctx.reply(t(ctx, getOneQuestion(2)));
	} else return ctx.reply(t(ctx, texts.seventh_question_err));
});
routes.route(texts.third_question, async (ctx) => {
	const regex = /^[1-9]{2}$/;
	const age = ["10", "20", "30", "40", "50", "60", "70", "80", "90"].find(
		(age) => age === ctx.update.message?.text
	);
	if (
		(ctx.update.message?.text?.length === 2 &&
			regex.test(ctx.update.message.text)) ||
		(age && ctx.update.message?.text === age)
	) {
		ctx.session.user.yosh = ctx.update.message?.text;
		ctx.session.route = texts.fourht_question;
		const sendPhone = new Keyboard().requestContact(
			t(ctx, texts.eighth_question_content)
		);
		return ctx.reply(t(ctx, getOneQuestion(3)), {
			reply_markup: {
				...sendPhone,
				resize_keyboard: true,
			},
			parse_mode: "HTML",
		});
	} else return ctx.reply(t(ctx, texts.sixth_question_err));
});

routes.route(texts.fourht_question, async (ctx) => {
	const regex = /\+?(998)? ?(\d{2} ?\d{3} ?\d{2} ?\d{2})$/gi;
	if (regex.test(ctx.msg?.text || "") || ctx.msg?.contact) {
		ctx.session.user.telefon_raqam =
			ctx.msg?.contact?.phone_number || ctx.msg?.text || "";
		ctx.session.route = texts.fifth_question;
		const chapter = await ctx.session.user.bolim;

		return await ctx.reply(
			t(
				ctx,
				chapter === t(ctx, texts.sold)
					? getOneQuestion(4)
					: getOneQuestion(5)
			),
			{
				reply_markup: {
					keyboard: [
						[
							{
								text: t(ctx, texts.price),
							},
							{
								text: t(ctx, texts.assortment),
							},
						],
						[
							{
								text: t(ctx, texts.service),
							},
						],
					],
					resize_keyboard: true,
				},
			}
		);
	} else {
		return ctx.reply(t(ctx, texts.eighth_question_err));
	}
});

routes.route(texts.fifth_question, async (ctx) => {
	if (
		ctx.message?.text === t(ctx, texts.service) ||
		ctx.message?.text === t(ctx, texts.assortment) ||
		ctx.message?.text === t(ctx, texts.price)
	) {
		const first_answer = ctx.message?.text;
		ctx.session.user.nima_yoqdi =
			t(ctx, first_answer ? first_answer : "") || "";

		ctx.session.route = texts.sixth_question;

		return ctx.reply(t(ctx, getOneQuestion(6)), {
			reply_markup: {
				keyboard: [...getButtons(ctx, ball, 4, "ball")],
				resize_keyboard: true,
			},
		});
	}
	return ctx.reply("Iltimos quyidagi tugmalar yordamida tanlov qiling");
});
routes.route(texts.sixth_question, async (ctx) => {
	const bal = ball.find(
		(ball) =>
			String(ball.id) === ctx.message?.text?.split(" ")[0] ||
			String(ball.id) === ctx.message?.text
	);
	if (bal) {
		ctx.session.user.narx_ball =
			ctx.message?.text?.split(" ")[0] || ctx.message?.text || "";
		ctx.session.route = texts.seventh_question;
		return ctx.reply(t(ctx, getOneQuestion(7)), {
			reply_markup: {
				keyboard: [...getButtons(ctx, ball, 4, "ball")],
				resize_keyboard: true,
			},
		});
	} else return ctx.reply("Iltimos quyidagi tugmalar yordamida baho bering");
});
routes.route(texts.seventh_question, (ctx) => {
	const bal = ball.find(
		(ball) =>
			String(ball.id) === ctx.message?.text?.split(" ")[0] ||
			String(ball.id) === ctx.message?.text
	);
	if (bal) {
		ctx.session.user.assortiment_ball =
			ctx.message?.text?.split(" ")[0] || ctx.message?.text || "";
		ctx.session.route = texts.eighth_question;
		return ctx.reply(t(ctx, getOneQuestion(8)), {
			reply_markup: {
				keyboard: [...getButtons(ctx, ball, 4, "ball")],
				resize_keyboard: true,
			},
		});
	} else return ctx.reply("Iltimos quyidagi tugmalar yordamida baho bering");
});

routes.route(texts.eighth_question, async (ctx) => {
	const bal = ball.find(
		(ball) =>
			String(ball.id) === ctx.message?.text?.split(" ")[0] ||
			String(ball.id) === ctx.message?.text
	);
	if (bal) {
		ctx.session.user.xizmat_ball =
			ctx.message?.text?.split(" ")[0] || ctx.message?.text || "";
		ctx.session.route = texts.last_session;

		return ctx.reply(t(ctx, getOneQuestion(9)), {
			reply_markup: {
				keyboard: [[{ text: t(ctx, texts.skip_btn) }]],
				resize_keyboard: true,
			},
			parse_mode: "HTML",
		});
	} else return ctx.reply("Iltimos quyidagi tugmalar yordamida baho bering");
});

routes.route(texts.last_session, async (ctx) => {
	if (ctx.update.message?.text) {
		ctx.session.user.taklif =
			ctx.update.message?.text === t(ctx, texts.skip_btn)
				? "Taklif qoldirilmadi"
				: ctx.update.message?.text;

		const newInfo = ctx.session.user;
		ctx.session.route = texts.final;
		const newInfoDB = await User.create({
			user_telegram_id: Number(newInfo.user_telegram_id) || 0,
			telegram_username: `@${newInfo.telegram_username}`,
			locatsiya: newInfo.locatsiya,
			bolim: newInfo.bolim,
			telefon_raqam: newInfo.telefon_raqam,
			yoqdi_yoqmadi: newInfo.nima_yoqdi,
			narx_ball: newInfo.narx_ball,
			assortiment_ball: newInfo.assortiment_ball,
			xizmat_ball: newInfo.xizmat_ball,
			taklif: newInfo.taklif,
			yosh: newInfo.yosh,
			ism: newInfo.ism,
			shaxs:
				newInfo.persontype.split(" ")[1] === "Erkaklar"
					? newInfo.persontype.split(" ")[1].slice(0, 5)
					: newInfo.persontype.split(" ")[1].slice(0, 4),
		});

		await newInfoDB.save();

		ctx.session.route = "main";
		await converterFolder(ctx);
		await bot.api
			.sendMessage(
				// -1001718670724,
				-1001607304530,
				getPost(ctx, ctx.session.user)
			)
			.catch((err) => console.log(err));
		return ctx.reply(t(ctx, texts.thanks), {
			reply_markup: { remove_keyboard: true },
		});
	} else return ctx.reply(t(ctx, texts.fifth_question_err));
});

// routes.route(texts.final, async (ctx) => {
// 	const time = new Date().getHours();
// 	if (time <= 23) {
// 		return ctx.reply(
// 			"Siz bugungi limittan foydalandingiz. Ertaga yana do'konimizga tashrif buyiring va o'yinimizda yana ovoz berish imkoniyatiga ega bo'ling 😊"
// 		);
// 	} else return main_menu(ctx);
// });

export { routes };
