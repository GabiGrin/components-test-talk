"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: []
        };
        this.state.list = props.list;
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("ul", null, this.state.list.map((item, idx) => (React.createElement("li", { className: 'todo' },
                React.createElement("span", null, item),
                React.createElement("button", { className: 'delete', onClick: () => this.removeItem(idx) }, "x"))))),
            React.createElement("div", null,
                "There are ",
                React.createElement("span", { className: 'counter' }, this.state.list.length)),
            React.createElement("input", { className: 'new-item', value: this.state.value, onChange: (e) => this.setState({ value: e.target.value }) }),
            React.createElement("button", { onClick: () => this.addItem(), className: 'add-btn' }, "Add")));
    }
    addItem() {
        this.setState({ list: [...this.state.list, this.state.value], value: '' });
    }
    removeItem(idx) {
        this.setState({ list: this.state.list.filter((_, _idx) => idx !== _idx) });
    }
}
exports.renderTodoList = (element, items = []) => {
    ReactDOM.render(React.createElement(TodoApp, { list: items }), element);
};
