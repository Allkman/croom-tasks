import React from "react";

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

  // * Creating a controlled component. Controlled by a parent Calculator
  // * new props are supplied by <Calculator />.
  // * <TemperatureInput /> has no control over the supplied props
  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }
  
    render() {
      const temperature = this.props.temperature;
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={temperature}
                 onChange={this.handleChange} />
        </fieldset>
      );
    }
  }

  export default TemperatureInput;