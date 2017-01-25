"use strict";
const app_1 = require("./app");
const react_driver_1 = require("./react-driver");
require("mocha");
const chai_1 = require("chai");
describe.only('todo app - tests v3 - driver', () => {
    const createAppAndWrapWithDriver = (items = []) => {
        const elem = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(elem);
        app_1.renderTodoList(elem, items);
        return new react_driver_1.default(elem);
    };
    it('should add new items to empty list', () => {
        const newItem = 'Buy milk';
        const driver = createAppAndWrapWithDriver();
        driver.addItem(newItem);
        chai_1.expect(driver.getVisibleItems()).to.eql([newItem]);
    });
    it('should create prepopulated lists', () => {
        const items = ['Angular', 'React', 'Ember'];
        const driver = createAppAndWrapWithDriver(items);
        chai_1.expect(driver.getVisibleItems()).to.eql(items);
    });
    it('should show a counter of pending todo items and increase it when an item is added', () => {
        const items = ['Angular', 'React', 'Ember'];
        const driver = createAppAndWrapWithDriver(items);
        chai_1.expect(driver.getCount()).to.equal(items.length);
        driver.addItem('Vue.js');
        chai_1.expect(driver.getCount()).to.equal(items.length + 1);
    });
    it('should remove items from the list when they are clicked', () => {
        const items = ['Angular', 'React', 'Ember'];
        const driver = createAppAndWrapWithDriver(items);
        const itemToRemove = items[2];
        driver.deleteItem(itemToRemove);
        chai_1.expect(driver.getVisibleItems()).not.to.include(itemToRemove);
    });
});
