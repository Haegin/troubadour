import React from 'react';

import Results from './results.jsx';
import Roller from './roller.jsx';
import InitiativeList from './initiativeList.jsx';

export default class App extends React.Component {
  render() {
    return <div>
      <h1>Troubadour</h1>
      <div id="app">
        <div id="sidebar">
          <Roller />
          <InitiativeList />
        </div>
        <Results />
      </div>
    </div>
  }
}
