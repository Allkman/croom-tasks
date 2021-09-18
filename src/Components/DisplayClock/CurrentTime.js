import React, { Component } from 'react';
import './Clock.css';

class CurrentTime extends Component {
    constructor(props){
    super(props);
    //This declared the state of time at the very beginning
    this.state ={
    time: new Date().toLocaleTimeString("lt-LT")
    }
    }
    
    
    //This happens when the component mount and the setInterval function get called with a call back function updateClock()
    componentDidMount() {
    this.intervalID = setInterval(() =>
    this.updateClock(),
    500
    );}
    
    //This section clears setInterval by calling intervalID so as to optimise memory
    componentWillUnmount(){
    clearInterval(this.intervalID)
    }
    
    //This function set the state of the time to a new time
    updateClock(){
    this.setState({
    time: new Date().toLocaleTimeString("lt-LT")
    });
    }
    render() {
    return (
    <div className="Time">
         <p> {this.state.time}</p>
    </div>
    );}
    }
    export default CurrentTime;