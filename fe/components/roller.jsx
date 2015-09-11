import rollActions from '../actions/rollActions.es6';
import nameActions from '../actions/nameActions.es6';
import nameStore from '../stores/nameStore.es6';
import connectToStores from 'alt/utils/connectToStores';

class Roller extends React.Component {
  constructor(props) {
    super(props);
  }

  roll(evt) {
    let pool = React.findDOMNode(this.refs.pool).value;
    let target = React.findDOMNode(this.refs.target).value;
    let roller = React.findDOMNode(this.refs.roller).value;
    rollActions.rollDice(pool, target, roller);
  }

  changeName(evt) {
    let roller = React.findDOMNode(this.refs.roller).value;
    nameActions.setName(roller);
  }

  static getStores() {
    return [nameStore];
  }

  static getPropsFromStores() {
    return nameStore.getState()
  }


  render() {
    return <div id="roller">
      <h2>Roll Dice</h2>
      <p>
        <label htmlFor="pool">Pool:</label>
        <input id="pool" type="number" min="1" max="10" defaultValue="3" step="1" name="pool" ref="pool" />
      </p>
      <p>
        <label htmlFor="target">Target Number:</label>
        <input id="target" type="number" min="1" max="10" defaultValue="6" step="1" name="target" ref="target" />
      </p>
      <p>
        <label htmlFor="name">Name:</label>
        <input id="name" name="roller" ref="roller" value={this.props.name} onChange={this.changeName.bind(this)} />
      </p>
      <p>
        <input type="button" onClick={this.roll.bind(this)} value="Roll!" name="roll" />
      </p>
    </div>
  }
}

export default connectToStores(Roller)
