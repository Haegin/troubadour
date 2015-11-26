import alt from '../alt.es6';
import _ from 'lodash';

class InitiativeActions {
  constructor() {
    this.generateActions('setBonus', 'changeInitiative');
  }

  listInitiatives() {
    return (dispatch) => {
      fetch('/api/initiatives').then(response => {
        return response.json();
      }).then(data => {
        dispatch(data);
      });
    }
  }

  roll(name, bonus) {
    return (dispatch) => {
      fetch('/api/initiatives', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initiative: {
          name: name,
          result: _.random(1, 10, false) + bonus,
        }})
      }).then(response => {
        return response.json();
      }).then(data => {
        dispatch(data);
      });
    }
  }
}

const initiativeActions = alt.createActions(InitiativeActions);
export default initiativeActions;
