import {renderTodoList} from './app-vanilla';

const clickOn = element => {
	const clickEvent = document.createEvent('HTMLEvents');
	clickEvent.initEvent('click', false, true);
	element.dispatchEvent(clickEvent);
};

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
		const visibleItemsNodes = this.elem.querySelectorAll('.todo-item');
		return Array.from(visibleItemsNodes).map((e: any) => e.textContent);
	}

	getCount(): number {
		return parseInt(this.elem.querySelector('.count').textContent, 10);
	}

	addItem(name: string) {
		const addItemInput = this.elem.querySelector('.new-item') as HTMLInputElement;
		addItemInput.value = name;
		clickOn(this.elem.querySelector('.add'));
	}

	deleteItem(name: string) {
		const idx = this.getVisibleItems().indexOf(name);
		clickOn(this.elem.querySelectorAll('.todo-item')[idx]);
	}
};
