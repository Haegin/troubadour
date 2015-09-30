import alt from '../alt.es6';
import _ from 'lodash';

class RollActions {
  constructor() {
    this.generateActions('getRoll');
  }

  listRolls() {
    return (dispatch) => {
      fetch('/api/rolls?limit=10').then(response => {
        return response.json();
      }).then(data => {
        dispatch(data);
      });
    }
  }

  rollDice(pool, target, roller) {
    return (dispatch) => {
      let results = _.times(pool, _.partial(_.random, 1, 10, false));
      fetch('/api/rolls', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roll: {
          target: target,
          results: results,
          roller: roller
        }})
      }).then(response => {
        return response.json();
      }).then(data => {
        dispatch(data);
      });
    }
  }

  sendDice(pool, target, roller, rolls) {
    return (dispatch) => {
      fetch('/api/rolls', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roll: {
          target: target,
          results: rolls,
          roller: roller
        }})
      }).then(response => {
        return response.json();
      }).then(data => {
        dispatch(data);
      });
    }
  }
}

const rollActions = alt.createActions(RollActions);
export default rollActions;
