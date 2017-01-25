"use strict";
const app_vanilla_1 = require("./app-vanilla");
const clickOn = element => {
    const clickEvent = document.createEvent('HTMLEvents');
    clickEvent.initEvent('click', false, true);
    element.dispatchEvent(clickEvent);
};
class TodoAppDriver {
    constructor(elem) {
        this.elem = elem;
    }
    static create(items = []) {
        const elem = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(elem);
        app_vanilla_1.renderTodoList(elem, items);
        return new TodoAppDriver(elem);
    }
    getVisibleItems() {
        const visibleItemsNodes = this.elem.querySelectorAll('.todo-item');
        return Array.from(visibleItemsNodes).map((e) => e.textContent);
    }
    getCount() {
        return parseInt(this.elem.querySelector('.count').textContent, 10);
    }
    addItem(name) {
        const addItemInput = this.elem.querySelector('.new-item');
        addItemInput.value = name;
        clickOn(this.elem.querySelector('.add'));
    }
    deleteItem(name) {
        const idx = this.getVisibleItems().indexOf(name);
        clickOn(this.elem.querySelectorAll('.todo-item')[idx]);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoAppDriver;
;
