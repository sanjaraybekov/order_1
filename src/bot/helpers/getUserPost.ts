import { texts } from "../constants/texts";
import { t } from "../i18";
import { MyContext } from "../types/MyContext";
import { UserType } from "../types/User";

export const getPost = (ctx: MyContext, data: UserType) => {
	return `Yangi ma'lumot\n\n${t(ctx, texts.userfullname) + data.Ism}\n${
		t(ctx, texts.age) + data.Yosh
	}\n${t(ctx, texts.userchapter) + t(ctx, data.Bolim)}\n${
		t(ctx, texts.location) + t(ctx, data.Locatsiya)
	}\n${
		t(ctx, data.Bolim === t(ctx, texts.sold) ? texts.like : texts.dislike) +
		t(ctx, data.Nima_yoqdi)
	}\n${t(ctx, texts.price_ball) + data.Narx_ball}\n${
		t(ctx, texts.assorti_ball) + data.Assortiment_ball
	}\n${t(ctx, texts.service_ball) + data.Xizmat_ball}\n${
		t(ctx, texts.offer) + data.Taklif
	}\n${t(ctx, texts.username) + "@" + data.Telegram_username}\n${
		t(ctx, texts.phone) + data.Telefon_raqam
	}\n\nID: ${data.User_telegram_id}`;
};
