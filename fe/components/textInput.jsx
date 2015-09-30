export default class TextInput extends React.Component {
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

  onChange(evt) {
    let value = evt.target.value;
    this.setState({value: value});
    this.props.onChange(value);
  }

  render() {
    return <p className="textInput">
      <label htmlFor={this.key()}>{this.props.name}:</label>
      <input
        id={this.key()}
        type="text"
        name={this.key()}
        value={this.state.value}
        onChange={this.onChange.bind(this)}
      />
    </p>;
  }
}

TextInput.defaultProps = {
  default: "",
  onChange: val => { return val; }
}

TextInput.propTypes = {
  default: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func
}
