import nameActions from '../actions/nameActions.es6';
import alt from '../alt.es6';
import _ from 'lodash';

class NameStore {
  constructor() {
    this.bindAction(nameActions.setName, this.setName);

    this.state = { name: localStorage.getItem("name") }
  }

  setName(name) {
    localStorage.setItem("name", name);
    this.setState({ name: name });
  }
}

const nameStore = alt.createStore(NameStore, "NameStore");
export default nameStore;
