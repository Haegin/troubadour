import classnames from 'classnames';
import nameStore from '../stores/nameStore.es6';
import connectToStores from 'alt/utils/connectToStores';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [nameStore];
  }

  static getPropsFromStores() {
    return { currentUser: nameStore.getState() };
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

export default connectToStores(Initiative)
