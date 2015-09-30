import rollActions from '../actions/rollActions.es6';
import nameActions from '../actions/nameActions.es6';
import nameStore from '../stores/nameStore.es6';
import connectToStores from 'alt/utils/connectToStores';
import NumberInput from './numberInput.jsx';
import TextInput from './textInput.jsx';

class Roller extends React.Component {
  constructor(props) {
    super(props);
  }

  roll(evt) {
    let pool = this.refs.pool.value();
    let target = this.refs.target.value();
    let roller = this.refs.roller.value();
    let rolls = this.refs.rolls.value();
    if (rolls !== "") {
      rolls = rolls.split("").map(i => {
        i = parseInt(i)
        return i == 0 ? 10 : i;
      });
      rollActions.sendDice(pool, target, roller, rolls);
    } else {
      rollActions.rollDice(pool, target, roller);
    };
  }

  changeName(name) {
    nameActions.setName(name);
  }

  static getStores() {
    return [nameStore];
  }

  static getPropsFromStores() {
    return nameStore.getState()
  }

  render() {
    return <div id="roller">
      <h2>Roll</h2>
      <NumberInput ref="pool" name="Pool" default={3} />
      <NumberInput ref="target" name="Target" default={6} />
      <TextInput ref="roller" name="Roller" onChange={this.changeName.bind(this)} default={this.props.name} />
      <TextInput ref="rolls" name="Rolls" />
      <p className="button">
        <input type="button" onClick={this.roll.bind(this)} value="Roll!" name="roll" />
      </p>
    </div>
  }
}

export default connectToStores(Roller)
