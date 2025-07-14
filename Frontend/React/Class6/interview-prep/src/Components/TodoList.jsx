import React, { Component } from 'react'

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            newTodo:""
        }
        console.log("Constructor: setting up initial state and bindings");   
    }

    componentDidMount(){
        console.log("CDM: called after component is mounted");
        //simulate fetching data from API
        setTimeout(() => {
            this.setState({
                todos: ["learn react", "read a book"]
            })
        },1000);
    }

    shouldComponentUpdate(){
        console.log("shouldComponentUpdate is called");
        return true;
    }

    componentDidUpdate(prevProps, prevState){
        console.log("CDU: checking if new todo was added");
        if(prevState.todos != this.state.todos){
            console.log("updated todos", this.state.todos);
        }
    }

    componentWillUnmount(){
        console.log("CWU : cleaning up resources");
    }

    handleInputChange = (e) =>{
        this.setState({newTodo: e.target.value});
    }

    handleAddTodo = () => {
        this.setState({
            todos: [...this.state.todos, this.state.newTodo],
            newTodo: ""
        });
    }
  render() {
    console.log("UI is rendered");
    return (
      <div>
        <h1>Todo List</h1>
        <input 
        type='text' 
        placeholder='Enter your task' 
        value={this.state.newTodo} 
        onChange={this.handleInputChange}/>
        <button onClick={this.handleAddTodo}>Add</button>
        <ul>
            {this.state.todos.map((todo, idx) => {
                return (
                    <li key={idx}>{todo}</li>
                )
            })}
        </ul>
      </div>
    )
  }
}
