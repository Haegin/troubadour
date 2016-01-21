import classnames from 'classnames';
import React from 'react';

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
      <td className="optional">{_(this.props.results.sort((a, b) => { return a - b})).join(", ")}</td>
      <td>{this.props.target}</td>
      <td>{this.props.successes}</td>
    </tr>
  }
}
