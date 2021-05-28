import { Switch, Route } from 'react-router';
import HistoryPage from '../screens/HistoryPage';
import HomePage from '../screens/HomePage';
import MonitoringPage from '../screens/MonitoringPage';
import NeuralNetwork from './NeuralNetwork';
import VirtualMachine from './VirtualMachine';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/monitoring" component={MonitoringPage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route
          exact
          path="/monitoring/neural_network"
          component={NeuralNetwork}
        />
        <Route
          exact
          path="/monitoring/virtual_machine"
          component={VirtualMachine}
        />
      </Switch>
    </main>
  );
}
