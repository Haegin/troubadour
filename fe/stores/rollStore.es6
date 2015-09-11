import rollActions from '../actions/rollActions.es6';
import alt from '../alt.es6';
import _ from 'lodash';

class RollStore {
  constructor() {
    this.bindAction(rollActions.listRolls, this.onListRolls);
    this.bindAction(rollActions.rollDice, this.onRollDice);

    this.state = {
      rolls: [],
    }
  }

  onListRolls(rolls) {
    this.setState({ rolls: rolls });
  }

  onRollDice(roll) {
    let newRolls = this.state.rolls
    newRolls.unshift(roll)
    this.setState({ rolls: newRolls });
  }
}

const rollStore = alt.createStore(RollStore);
export default rollStore;
