import Rolls from './rolls.jsx';
import Roller from './roller.jsx';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  render() {
    return <div id="app">
      <Rolls />
      <Roller />
    </div>
  }
}
