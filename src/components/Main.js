import { Switch, Route } from 'react-router-dom';
import { LocationContextProvider } from '../contexts/LocationContext';
import HistoryPage from '../screens/HistoryPage';
import HomePage from '../screens/HomePage';
import MonitoringPage from '../screens/MonitoringPage';
import DataAssimilation from './DataAssimilation';
import NeuralNetwork from './NeuralNetwork';
import VirtualMachine from './VirtualMachine';

export default function Main() {
  return (
    <main>
      <LocationContextProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/monitoring" component={MonitoringPage} />
          <Route
            exact
            path="/monitoring/assimilation"
            component={DataAssimilation}
          />
          <Route exact path="/history" component={HistoryPage} />
          <Route
            exact
            path="/monitoring/neuralNetwork"
            component={NeuralNetwork}
          />
          <Route
            exact
            path="/monitoring/virtualMachine"
            component={VirtualMachine}
          />
        </Switch>
      </LocationContextProvider>
    </main>
  );
}
