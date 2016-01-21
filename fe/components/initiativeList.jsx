import { connect } from 'alt-react';
import React from 'react';

import NumberInput from './numberInput.jsx';
import Initiative from './initiative.jsx';
import nameStore from '../stores/nameStore.es6';
import initiativeStore from '../stores/initiativeStore.es6';
import initiativeActions from '../actions/initiativeActions.es6';

class InitiativeList extends React.Component {
  constructor(props) {
    super(props);
    initiativeActions.listInitiatives();
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

  render() {
    var initiatives = _.sortBy(this.props.initiatives, 'result').map(initiative => {
      return (
        <Initiative
          key={initiative.id}
          id={initiative.id}
          name={initiative.name}
          result={initiative.result}
        />
      );
    });
    return <div id="initiative">
      <h2>Initiative</h2>
      <NumberInput
        ref="bonus"
        name="Bonus"
        onChange={initiativeActions.setBonus}
        default={this.props.bonus}
        max={5}
      />
      <table>
        <tbody>
          {initiatives}
        </tbody>
      </table>
      <p className="button">
        <input type="button" onClick={this.roll.bind(this)} value="Fight!" name="roll" />
      </p>
    </div>
  }
}

export default connect(InitiativeList, {
  listenTo() {
    return [nameStore, initiativeStore];
  },
  getProps() {
    return {
      ...nameStore.getState(),
      ...initiativeStore.getState(),
    };
  }
})
