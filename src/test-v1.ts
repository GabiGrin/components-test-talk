import 'mocha';
import {expect} from 'chai';
import {renderTodoList} from './app-vanilla';

describe('todo app - tests v1', () => {

	it('should add new items to empty list', () => {
		const newItem = 'Buy milk';
		const elem = document.createElement('div');
		document.body.innerHTML = '';
		document.body.appendChild(elem);

		const app = renderTodoList(elem, []);
		const addItemInput = app.querySelector('.new-item') as HTMLInputElement;

		addItemInput.value = newItem;

		const clickEvent = document.createEvent('HTMLEvents');

		clickEvent.initEvent('click', false, true);
		app.querySelector('.add').dispatchEvent(clickEvent);

		const visibleItemsNodes = app.querySelectorAll('.todo-item');
		const visibleItems = Array.from(visibleItemsNodes).map(e => e.textContent);

		expect(visibleItems).to.eql([newItem]);
	});

	it('should create prepopulated lists', () => {
		const elem = document.createElement('div');
		document.body.innerHTML = '';
		document.body.appendChild(elem);

		const items = ['Angular', 'React', 'Ember'];
		const app = renderTodoList(elem, items);
		const visibleItemsNodes = app.querySelectorAll('.todo-item');
		const visibleItems = Array.from(visibleItemsNodes).map(e => e.textContent);

		expect(visibleItems).to.eql(items);
	});

	it('should a counter of pending todo items and increase it when an item is added', () => {
		const elem = document.createElement('div');
		document.body.innerHTML = '';
		document.body.appendChild(elem);

		const items = ['Angular', 'React', 'Ember'];
		const app = renderTodoList(elem, items);
		const currentCount = parseInt(app.querySelector('.count').textContent, 10);

		expect(currentCount).to.equal(items.length);

		const addItemInput = app.querySelector('.new-item') as HTMLInputElement;
		addItemInput.value = 'Vue.js';

		const clickEvent = document.createEvent('HTMLEvents');
		clickEvent.initEvent('click', false, true);

		app.querySelector('.add').dispatchEvent(clickEvent);

		const newCount = parseInt(app.querySelector('.count').textContent, 10);
		expect(newCount).to.equal(items.length + 1);
	});

	it('should remove items from the list when they are clicked', () => {
		const elem = document.createElement('div');
		document.body.innerHTML = '';
		document.body.appendChild(elem);

		const items = ['Angular', 'React', 'Ember'];
		const app = renderTodoList(elem, items);
		const clickEvent = document.createEvent('HTMLEvents');

		clickEvent.initEvent('click', false, true);

		const itemToRemoveIdx = 2;
		const itemToRemove = items[itemToRemoveIdx];

		app.querySelectorAll('.todo-item')[itemToRemoveIdx].dispatchEvent(clickEvent);

		const visibleItemsNodes = app.querySelectorAll('.todo-item');
		const visibleItems = Array.from(visibleItemsNodes).map(e => e.textContent);

		expect(visibleItems).not.to.include(itemToRemove);
	});
});
