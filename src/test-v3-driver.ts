import TodoAppDriver from './vanilla-driver';
// import TodoAppDriver from './react-driver';

import 'mocha';
import {expect} from 'chai';

describe.only('todo app - tests v3 - driver', () => {

it('should add new items to empty list', () => {
	const newItem = 'Buy milk';
	const comp = TodoAppDriver.create();

	comp.addItem(newItem);
	expect(comp.getVisibleItems()).to.eql([newItem]);
});

it('should create prepopulated lists', () => {
	const items = ['Angular', 'React', 'Ember'];
	const comp = TodoAppDriver.create(items);

	expect(comp.getVisibleItems()).to.eql(items);
});

it('should show a counter of pending todo items and increase it when an item is added', () => {
	const items = ['Angular', 'React', 'Ember'];
	const comp = TodoAppDriver.create(items);

	expect(comp.getCount()).to.equal(items.length);

	comp.addItem('Vue.js');

	expect(comp.getCount()).to.equal(items.length + 1);
});

it('should remove items from the list when they are clicked', () => {
	const items = ['Angular', 'React', 'Ember'];
	const comp = TodoAppDriver.create(items);
	const itemToRemove = items[2];

	comp.deleteItem(itemToRemove);

	expect(comp.getVisibleItems()).not.to.include(itemToRemove);
});

});
