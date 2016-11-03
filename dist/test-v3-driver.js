"use strict";
const vanilla_driver_1 = require('./vanilla-driver');
require('mocha');
const chai_1 = require('chai');
describe.only('todo app - tests v3 - driver', () => {
    it('should add new items to empty list', () => {
        const newItem = 'Buy milk';
        const comp = vanilla_driver_1.default.create();
        comp.addItem(newItem);
        chai_1.expect(comp.getVisibleItems()).to.eql([newItem]);
    });
    it('should create prepopulated lists', () => {
        const items = ['Angular', 'React', 'Ember'];
        const comp = vanilla_driver_1.default.create(items);
        chai_1.expect(comp.getVisibleItems()).to.eql(items);
    });
    it('should show a counter of pending todo items and increase it when an item is added', () => {
        const items = ['Angular', 'React', 'Ember'];
        const comp = vanilla_driver_1.default.create(items);
        chai_1.expect(comp.getCount()).to.equal(items.length);
        comp.addItem('Vue.js');
        chai_1.expect(comp.getCount()).to.equal(items.length + 1);
    });
    it('should remove items from the list when they are clicked', () => {
        const items = ['Angular', 'React', 'Ember'];
        const comp = vanilla_driver_1.default.create(items);
        const itemToRemove = items[2];
        comp.deleteItem(itemToRemove);
        chai_1.expect(comp.getVisibleItems()).not.to.include(itemToRemove);
    });
});
