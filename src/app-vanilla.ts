export const renderTodoList = (element: HTMLElement, items = []) => {
	const model = {list: items.map(name => ({name, completed: false}))};


	const addItem = name => model.list = [...model.list, {name, completed: false}];

	const removeItem = idx => model.list = model.list.filter((_, _idx) => idx !== _idx);

	const renderList = list => `<ul>${list.map(item => `<li class="todo-item ${item.completed ? 'complete' : 'pending'}">${item.name}</li>`).join('')}</ul>`;
	const render = () => {
		element.innerHTML = `<div>
			${renderList(model.list)}
			<div>There are <span class="count">${model.list.length}</span> items!</div>
			<input class='new-item'/><button class="add">Add</button>
		</div>`;

		element.querySelector('.add').addEventListener('click', () => {
			const input: any = element.querySelector('.new-item');
			addItem(input.value);

			input.value = '';
			render();
		});

		[...element.querySelectorAll('.todo-item')].forEach((element, index) => {
			element.addEventListener('click', () => {
				removeItem(index);
				render();
			});
		});
	};

	render();

	return element;
};
