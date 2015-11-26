import initiativeActions from '../actions/initiativeActions.es6';
import alt from '../alt.es6';
import _ from 'lodash';

class InitiativeStore {
  constructor() {
    this.bindAction(initiativeActions.setBonus, this.setBonus);
    this.bindAction(initiativeActions.listInitiatives, this.listInitiatives);
    this.bindAction(initiativeActions.changeInitiative, this.changeInitiative);
    this.bindAction(initiativeActions.roll, this.roll);

    this.state = {
      bonus: localStorage.getItem("initiativeMod") || 3,
      initiatives: []
    }

    this.ws = new WebSocket(window.location.protocol.replace("http", "ws") + "//" + window.location.host);
  }

  setBonus(bonus) {
    localStorage.setItem("initiativeMod", bonus);
    this.setState({ bonus: bonus });
  }

  listInitiatives(initiatives) {
    this.setState({ initiatives: initiatives });
  }

  roll(initiative) {
    this.ws.send(JSON.stringify({ type: "initiative", data: initiative }));
  }

  changeInitiative(update) {
    let updated = false;
    let newInitiatives = this.state.initiatives.map((initiative) => {
      if (update.name == initiative.name) {
        updated = true
        return update;
      } else {
        return initiative;
      }
    }, []);
    if (!updated) {
      newInitiatives.push(update);
    }
    this.setState({ initiatives: newInitiatives });
  }
}

const initiativeStore = alt.createStore(InitiativeStore, "InitiativeStore");
export default initiativeStore;
