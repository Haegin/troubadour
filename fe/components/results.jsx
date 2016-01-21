import Roll from './roll.jsx';
import { connect } from 'alt-react';
import rollStore from '../stores/rollStore.es6';
import rollActions from '../actions/rollActions.es6';

class Results extends React.Component {
  constructor(props) {
    super(props);
    rollActions.listRolls();
  }

  componentDidMount() {
    let socket = new WebSocket(window.location.protocol.replace("http", "ws") + "//" + window.location.host);

    socket.onmessage = (event) => {
      let message = JSON.parse(event.data);

      switch(message.type) {
        case "ping":
          socket.send(JSON.stringify({type: "pong"}));
          break;
        case "roll":
          rollActions.getRoll(message.data);
          break;
      }
    };
  }

  render() {
    var rolls = this.props.rolls.map(roll => {
      return (<Roll key={roll.id} id={roll.id} roller={roll.roller} results={roll.results} target={roll.target} successes={roll.successes} />);
    });
    return <div id="results">
      <h2>Results</h2>
      <table id="rolls">
        <thead>
          <tr><th>Person</th><th className="optional">Results</th><th>Target</th><th>Successes</th></tr>
        </thead>
        <tbody>
          {rolls}
        </tbody>
    </table>
  </div>;
  }
}

export default connect(Results, {
  listenTo() {
    return [rollStore];
  },
  getProps() {
    return rollStore.getState();
  }
})
