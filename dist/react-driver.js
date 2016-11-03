"use strict";
const app_react_1 = require('./app-react');
const react_addons_test_utils_1 = require('react-addons-test-utils');
class TodoAppDriver {
    constructor(elem) {
        this.elem = elem;
    }
    static create(items = []) {
        const elem = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(elem);
        app_react_1.renderTodoList(elem, items);
        return new TodoAppDriver(elem);
    }
    getVisibleItems() {
        const visibleItemsNodes = this.elem.querySelectorAll('.todo span');
        return Array.from(visibleItemsNodes).map((e) => e.textContent);
    }
    getCount() {
        return parseInt(this.elem.querySelector('.counter').textContent, 10);
    }
    addItem(name) {
        const addItemInput = this.elem.querySelector('.new-item');
        addItemInput.value = name;
        react_addons_test_utils_1.Simulate.change(addItemInput);
        react_addons_test_utils_1.Simulate.click(this.elem.querySelector('.add-btn'));
    }
    deleteItem(name) {
        const idx = this.getVisibleItems().indexOf(name);
        react_addons_test_utils_1.Simulate.click(this.elem.querySelectorAll('.todo .delete')[idx]);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoAppDriver;
;
