import {renderTodoList} from './app-react';
import {Simulate} from 'react-addons-test-utils';

export default class TodoAppDriver {

	constructor(private elem: HTMLElement) {}

	static create(items = []) {
		const elem = document.createElement('div');
		document.body.innerHTML = '';
		document.body.appendChild(elem);
		renderTodoList(elem, items);
		return new TodoAppDriver(elem);
	}

	getVisibleItems(): string[] {
		const visibleItemsNodes = this.elem.querySelectorAll('.todo span');
		return Array.from(visibleItemsNodes).map((e: any) => e.textContent);
	}

	getCount(): number {
		return parseInt(this.elem.querySelector('.counter').textContent, 10);
	}

	addItem(name: string) {
		const addItemInput = this.elem.querySelector('.new-item') as HTMLInputElement;
		addItemInput.value = name;
		Simulate.change(addItemInput);
		Simulate.click(this.elem.querySelector('.add-btn'));
	}

	deleteItem(name: string) {
		const idx = this.getVisibleItems().indexOf(name);
		Simulate.click(this.elem.querySelectorAll('.todo .delete')[idx]);
	}
};
