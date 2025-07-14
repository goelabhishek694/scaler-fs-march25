import React, { Component } from 'react'

export default class Counter extends Component {
    //allows component to use properties from it's parent class
    constructor(props){
        //calls constructor of parent class, enables the component to use "this" to refer itself. 
        super(props);
        //initialization if state
        this.state = {
            count: 0
        }
    }

    handleIncrement  = () => {
        console.log(this);
        //update our state
        this.setState({count: this.state.count+1});
    }

    handleDecrement(){
        console.log(this);
        this.setState({count: this.state.count-1});
        //bind with "this"
    }
  render() {
    return (
      <div>
        {/* accessing a state */}
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    )
  }
}
