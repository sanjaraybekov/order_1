"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getButtons(arr, count, query) {
    const btns = [];
    for (let i = 0; i < arr.length; i = i + count) {
        const oneLineBtn = [];
        for (let j = i; j < i + count; j++) {
            if (arr[j]) {
                oneLineBtn.push({
                    text: arr[j].name,
                    callback_data: `${query}_${arr[j].id}`,
                });
            }
        }
        btns.push(oneLineBtn);
    }
    return btns;
}
exports.default = getButtons;
