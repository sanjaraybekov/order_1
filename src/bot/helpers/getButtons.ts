import { t } from "../i18";
import { MyContext } from "../types/MyContext";

export default function getButtons(
	ctx: MyContext,
	arr: any[],
	count: number,
	query: string
) {
	const btns = [];
	for (let i = 0; i < arr.length; i = i + count) {
		const oneLineBtn = [];
		for (let j = i; j < i + count; j++) {
			if (arr[j]) {
				oneLineBtn.push({
					text: t(ctx, `${query}_${arr[j].id}`),
				});
			}
		}
		btns.push(oneLineBtn);
	}
	return btns;
}
