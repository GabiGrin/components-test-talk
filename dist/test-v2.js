"use strict";
require('mocha');
const chai_1 = require('chai');
const app_vanilla_1 = require('./app-vanilla');
describe('todo app - tests v2', () => {
    const renderApp = (items = []) => {
        const elem = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(elem);
        app_vanilla_1.renderTodoList(elem, items);
        return elem;
    };
    const clickOn = element => {
        const clickEvent = document.createEvent('HTMLEvents');
        clickEvent.initEvent('click', false, true);
        element.dispatchEvent(clickEvent);
    };
    const getVisibleItems = element => {
        const visibleItemsNodes = element.querySelectorAll('.todo-item');
        return Array.from(visibleItemsNodes).map((e) => e.textContent);
    };
    it('should add new items to empty list', () => {
        const newItem = 'Buy milk';
        const app = renderApp();
        const addItemInput = app.querySelector('.new-item');
        addItemInput.value = newItem;
        clickOn(app.querySelector('.add'));
        chai_1.expect(getVisibleItems(app)).to.eql([newItem]);
    });
    it('should create prepopulated lists', () => {
        const items = ['Angular', 'React', 'Ember'];
        const app = renderApp(items);
        chai_1.expect(getVisibleItems(app)).to.eql(items);
    });
    it('should a counter of pending todo items and increase it when an item is added', () => {
        const items = ['Angular', 'React', 'Ember'];
        const app = renderApp(items);
        const currentCount = parseInt(app.querySelector('.count').textContent, 10);
        chai_1.expect(currentCount).to.equal(items.length);
        const addItemInput = app.querySelector('.new-item');
        addItemInput.value = 'Vue.js';
        clickOn(app.querySelector('.add'));
        const newCount = parseInt(app.querySelector('.count').textContent, 10);
        chai_1.expect(newCount).to.equal(items.length + 1);
    });
    it('should remove items from the list when they are clicked', () => {
        const items = ['Angular', 'React', 'Ember'];
        const app = renderApp(items);
        const itemToRemoveIdx = 2;
        const itemToRemove = items[itemToRemoveIdx];
        clickOn(app.querySelectorAll('.todo-item')[itemToRemoveIdx]);
        chai_1.expect(getVisibleItems(app)).not.to.include(itemToRemove);
    });
});
