import React from 'react';

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.default};
  }

  key() {
    return this.props.name.toLowerCase();
  }

  value() {
    return this.state.value;
  }

  adjust(value) {
    // TODO: support a minimum that isn't 1
    let newValue = ((this.state.value - this.props.min) + value) % this.range();
    if (newValue < 0)
      newValue = this.range() + newValue
    newValue = newValue + this.props.min;
    this.props.onChange(newValue);
    this.setState({value: newValue});
  }

  range() {
    return this.props.max - (this.props.min - 1)
  }

  decrement() {
    this.adjust(-1);
  }

  increment() {
    this.adjust(this.props.step);
  }

  render() {
    let buttonStyles =  {
      border: '1px solid #666',
      backgroundColor: '#eee',
      borderRadius: '0.3em',
      width: '1em',
      height: '1em',
      fontSize: '2em',
      lineHeight: '1em',
      verticalAlign: 'middle',
      textAlign: 'center',
      display: 'inline-block'
    }
    let inputStyles = {
      width: '2em',
    }
    let labelStyles = {
      width: '200px',
      display: 'inline-block'
    }
    return <p>
      <label htmlFor={this.key()} style={labelStyles}>{this.props.name}:</label>
      <span onClick={this.decrement.bind(this)} style={buttonStyles}>-</span>
      <input
        id={this.key()}
        type="text"
        name={this.key()}
        value={this.state.value}
        readOnly={true}
        style={inputStyles}
      />
      <span onClick={this.increment.bind(this)} style={buttonStyles}>+</span>
    </p>;
  }
}

NumberInput.defaultProps = {
  min: 1,
  max: 10,
  default: 5,
  step: 1,
  onChange: (i => {})
}

NumberInput.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  default: React.PropTypes.number,
  step: React.PropTypes.number,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func
}
