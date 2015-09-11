import classnames from 'classnames';

export default class Roll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = classnames('roll', {
      success: parseInt(this.props.successes) > 0,
      botch: this.props.successes == "botch"
    })
    return <tr className={classes} id={this.props.id}>
      <td>{this.props.roller}</td>
      <td>{_(this.props.results).join(", ")}</td>
      <td>{this.props.target}</td>
      <td>{this.props.successes}</td>
    </tr>
  }
}
