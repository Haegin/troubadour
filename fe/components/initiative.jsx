import classnames from 'classnames';
import nameStore from '../stores/nameStore.es6';
import { connect } from 'alt-react';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = classnames('initiative', {
      mine: this.props.currentUser.name == this.props.name
    })
    return <tr className={classes} id={this.props.id}>
      <td>{this.props.name}</td>
      <td>{this.props.result}</td>
    </tr>
  }
}

export default connect(Initiative, {
  listenTo() {
    return [nameStore];
  },
  getProps() {
    return { currentUser: nameStore.getState() };
  }
});
