import { texts } from "../constants/texts";
import { t } from "../i18";
import { MyContext } from "../types/MyContext";
import { UserType } from "../types/User";

export const getPost = (ctx: MyContext, data: UserType) => {
	return `Yangi ma'lumot\n\n${
		t(ctx, texts.shaxs) +
		(data.persontype.split(" ")[1] === "Erkaklar"
			? data.persontype.split(" ")[1].slice(0, 5)
			: data.persontype.split(" ")[1].slice(0, 4))
	}\n${t(ctx, texts.userfullname) + data.ism}\n${
		t(ctx, texts.age) + data.yosh
	}\n${t(ctx, texts.userchapter) + t(ctx, data.bolim)}\n${
		t(ctx, texts.location) + t(ctx, data.locatsiya)
	}\n${
		t(ctx, data.bolim === t(ctx, texts.sold) ? texts.like : texts.dislike) +
		t(ctx, data.nima_yoqdi)
	}\n${t(ctx, texts.price_ball) + data.narx_ball}\n${
		t(ctx, texts.assorti_ball) + data.assortiment_ball
	}\n${t(ctx, texts.service_ball) + data.xizmat_ball}\n${
		t(ctx, texts.offer) + data.taklif
	}\n${
		t(ctx, texts.username) +
		(ctx.from?.username ? `@${data.telegram_username}` : "Mavjud emas")
	}\n${t(ctx, texts.phone) + data.telefon_raqam}\n\nID: ${
		data.user_telegram_id
	}`;
};
