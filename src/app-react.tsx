import * as React from 'react';
import * as ReactDOM from 'react-dom';

class TodoApp extends React.Component<any, any> {

	state = {
		value: '',
		list: []
	};

	constructor(props) {
		super(props);
		this.state.list = props.list;
	}

	render() {
		return (<div>
		<ul>
			{this.state.list.map((item, idx) => (<li className='todo'>
					<span>{item}</span><button className='delete' onClick={() => this.removeItem(idx)}>x</button>
			</li>))}
		</ul>
		<div>There are <span className='counter'>{this.state.list.length}</span></div>
		<input className='new-item' value={this.state.value} onChange={(e: any) => this.setState({value: e.target.value})}/>
		<button onClick={() => this.addItem()} className='add-btn'>Add</button>
		</div>);
	}

	addItem() {
		this.setState({list: [...this.state.list, this.state.value], value: ''});
	}

	removeItem(idx) {
		this.setState({list: this.state.list.filter((_, _idx) => idx !== _idx)});
	}
}

export const renderTodoList = (element: HTMLElement, items = []) => {
	ReactDOM.render(<TodoApp list={items}/>, element);
};
