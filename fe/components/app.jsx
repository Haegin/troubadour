import Results from './results.jsx';
import Roller from './roller.jsx';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  render() {
    return <div>
      <h1>Troubadour</h1>
      <div id="app">
        <Roller />
        <Results />
      </div>
    </div>
  }
}
