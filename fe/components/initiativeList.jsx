import nameStore from '../stores/nameStore.es6';
import initiativeStore from '../stores/initiativeStore.es6';
import initiativeActions from '../actions/initiativeActions.es6';
import connectToStores from 'alt/utils/connectToStores';
import NumberInput from './numberInput.jsx';
import Initiative from './initiative.jsx';

class InitiativeList extends React.Component {
  constructor(props) {
    super(props);
    initiativeActions.listInitiatives();
  }

  static getStores() {
    return [nameStore, initiativeStore];
  }

  static getPropsFromStores() {
    return {
      ...nameStore.getState(),
      ...initiativeStore.getState()
    }
  }

  componentDidMount() {
    let socket = new WebSocket(window.location.protocol.replace("http", "ws") + "//" + window.location.host);

    socket.onmessage = (event) => {
      let message = JSON.parse(event.data);

      switch(message.type) {
        case "initiative":
          initiativeActions.changeInitiative(message.data);
          break;
      }
    };
  }

  roll(evt) {
    var name = this.props.name;
    var bonus = this.props.bonus;
    initiativeActions.roll(name, bonus);
  }

  changeBonus(evt) {
    let bonus = this.refs.bonus.value();
    initiativeActions.setBonus(bonus);
  }

  render() {
    var initiatives = this.props.initiatives.map(initiative => {
      return (<Initiative key={initiative.id} id={initiative.id} name={initiative.name} result={initiative.result} />);
    });
    return <div id="initiative">
      <h2>Initiative</h2>
      <NumberInput ref="bonus" name="Bonus" onChange={this.changeBonus.bind(this)} default={this.props.bonus} max={5} />
      <table>
        {initiatives}
      </table>
      <p className="button">
        <input type="button" onClick={this.roll.bind(this)} value="Fight!" name="roll" />
      </p>
    </div>
  }
}

export default connectToStores(InitiativeList)
