import rollActions from '../actions/rollActions.es6';
import alt from '../alt.es6';
import _ from 'lodash';

class RollStore {
  constructor() {
    this.bindAction(rollActions.listRolls, this.onListRolls);
    this.bindAction(rollActions.rollDice, this.onRollDice);
    this.bindAction(rollActions.sendDice, this.onGetRoll);

    this.state = {
      rolls: [],
    }

    this.ws = new WebSocket(window.location.protocol.replace("http", "ws") + "//" + window.location.host);
  }

  onListRolls(rolls) {
    this.setState({ rolls: rolls });
  }

  onRollDice(roll) {
    this.ws.send(JSON.stringify({ type: "roll", data: roll }));
  }

  onGetRoll(roll) {
    let newRolls = this.state.rolls
    newRolls.unshift(roll)
    this.setState({ rolls: _.take(newRolls, 10) });
  }
}

const rollStore = alt.createStore(RollStore, "RollStore");
export default rollStore;
