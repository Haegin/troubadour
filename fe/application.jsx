import App from './components/app.jsx';
import Router from 'react-router';

var Route = Router.Route;

var routes = (
  <Route name="rolls" path="/" handler={App}>
  </Route>
);

Router.run(routes, function(Handler, state) {
  React.render(<Handler params={state.params} />, document.getElementById("container"));
});
