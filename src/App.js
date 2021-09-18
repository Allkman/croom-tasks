import './App.css';
import GoogleMap from './Components/GMapAPI/GoogleMap';
import CurrentTime from './Components/DisplayClock/CurrentTime.js';
import Calculator from './Components/Temperature/Calculator.js';
import TemporaryDrawer from './Components/TemporaryDrawer';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <>
    <div className="App">
      <Router>
      <TemporaryDrawer/>
      <Switch>
          <Route exact path="/">
        <GoogleMap />
            </Route>
          <Route exact path="/CurrentTime">
              <CurrentTime />
            </Route>
          <Route exact path="/Calculator">
            <Calculator/>
          </Route>
          </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;
