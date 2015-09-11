export default class Roll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <tr className="roll" id={this.props.id}>
      <td>{this.props.roller}</td>
      <td>{_(this.props.results).join(", ")}</td>
      <td>{this.props.target}</td>
      <td>{this.props.successes}</td>
    </tr>
  }
}
