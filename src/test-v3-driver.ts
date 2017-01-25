import {renderTodoList} from './app';
import TodoAppDriver from './vanilla-driver';
// import TodoAppDriver from './react-driver';

import 'mocha';
import {expect} from 'chai';

describe.only('todo app - tests v3 - driver', () => {

const createAppAndWrapWithDriver = (items= []) => {
	const elem = document.createElement('div');
	document.body.innerHTML = '';
	document.body.appendChild(elem);
	renderTodoList(elem, items);
	return new TodoAppDriver(elem);
}

it('should add new items to empty list', () => {
	const newItem = 'Buy milk';
	const driver = createAppAndWrapWithDriver();

	driver.addItem(newItem);
	expect(driver.getVisibleItems()).to.eql([newItem]);
});

it('should create prepopulated lists', () => {
	const items = ['Angular', 'React', 'Ember'];
	const driver = createAppAndWrapWithDriver(items);

	expect(driver.getVisibleItems()).to.eql(items);
});

it('should show a counter of pending todo items and increase it when an item is added', () => {
	const items = ['Angular', 'React', 'Ember'];
	const driver = createAppAndWrapWithDriver(items);

	expect(driver.getCount()).to.equal(items.length);

	driver.addItem('Vue.js');

	expect(driver.getCount()).to.equal(items.length + 1);
});

it('should remove items from the list when they are clicked', () => {
	const items = ['Angular', 'React', 'Ember'];
	const driver = createAppAndWrapWithDriver(items);
	const itemToRemove = items[2];

	driver.deleteItem(itemToRemove);

	expect(driver.getVisibleItems()).not.to.include(itemToRemove);
});

});
