import Roll from './roll.jsx';
import connectToStores from 'alt/utils/connectToStores';
import rollStore from '../stores/rollStore.es6';
import rollActions from '../actions/rollActions.es6';

class Rolls extends React.Component {
  constructor(props) {
    super(props);
    rollActions.listRolls();
  }

  componentDidMount() {
    let socket = new WebSocket("ws://" + window.location.host);

    socket.onmessage = (event) => {
      let message = JSON.parse(event.data);

      switch(message.type) {
        case "roll":
          rollActions.getRoll(message.data);
          break;
        default:
          console.log("Unknown WebSocket message: ", message)
      }
    };
  }

  static getStores() {
    return [rollStore];
  }

  static getPropsFromStores() {
    return rollStore.getState()
  }

  render() {
    var rolls = this.props.rolls.map(roll => {
      return (<Roll key={roll.id} id={roll.id} roller={roll.roller} results={roll.results} target={roll.target} successes={roll.successes} />);
    });
    return <table id="rolls">
      <tr><th>Person</th><th>Results</th><th>Target</th><th>Successes</th></tr>
      {rolls}
    </table>;
  }
}

export default connectToStores(Rolls)
