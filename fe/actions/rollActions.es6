import alt from '../alt.es6';
import _ from 'lodash';

class RollActions {
  // addRoll(listId, name) {
  //   return (dispatch) => {
  //     fetch('/lists/' + listId + '/items', {
  //       method: 'post',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ item: { name: name } })
  //     }).then(response => {
  //       return response.json();
  //     }).then(data => {
  //       dispatch([data.id, data.name]);
  //     });
  //   }
  // }

  listRolls() {
    return (dispatch) => {
      fetch('/api/rolls').then(response => {
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
}

const rollActions = alt.createActions(RollActions);
export default rollActions;
