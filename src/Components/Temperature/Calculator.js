import React from "react";
import TemperatureInput from "./TemperatureInput";
import tryConvert from "./tryConvert";
import toCelsius from "./toCelcius";
import toFahrenheit from "./toFahrenheit";



// * Creating Calculator class to be a single "source of truth"
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
    // * React re-renders itself by calling this.setState() with new input value
    // * Both <TemperatureInput /> values are re-computed based on the input...
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }
    
    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }    
  
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
      return (
        <div>
        <TemperatureInput 
            scale="c"
            temperature = {celsius}
            onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={this.handleFahrenheitChange} />        
      </div>
      );
    }
  }

  export default Calculator;