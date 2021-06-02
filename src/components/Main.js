import { Switch, Route } from 'react-router-dom';
import { LocationContextProvider } from '../contexts/LocationContext';
import HistoryPage from '../screens/HistoryPage';
import HomePage from '../screens/HomePage';
import MonitoringPage from '../screens/MonitoringPage';
import DataAssimilationPage from '../screens/DataAssimilationPage';
import NeuralNetworkPage from '../screens/NeuralNetworkPage';
import VirtualMachinePage from '../screens/VirtualMachinePage';

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
            component={DataAssimilationPage}
          />
          <Route exact path="/history" component={HistoryPage} />
          <Route
            exact
            path="/monitoring/neuralNetwork"
            component={NeuralNetworkPage}
          />
          <Route
            exact
            path="/monitoring/virtualMachine"
            component={VirtualMachinePage}
          />
        </Switch>
      </LocationContextProvider>
    </main>
  );
}
