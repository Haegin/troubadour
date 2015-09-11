import rollActions from '../actions/rollActions.es6';

export default class Roller extends React.Component {
  constructor(props) {
    super(props);
  }

  roll(evt) {
    let pool = React.findDOMNode(this.refs.pool).value;
    let target = React.findDOMNode(this.refs.target).value;
    let roller = React.findDOMNode(this.refs.roller).value;
    rollActions.rollDice(pool, target, roller);
  }

  render() {
    return <div id="roller">
      <label>Pool:<input type="number" min="1" max="10" defaultValue="3" step="1" name="pool" ref="pool" /></label>
      <label>Target Number:<input type="number" min="1" max="10" defaultValue="6" step="1" name="target" ref="target" /></label>
      <label>Name:<input name="roller" ref="roller" /></label>
      <input type="button" onClick={this.roll.bind(this)} value="Roll!" name="roll" />
    </div>
  }
}
