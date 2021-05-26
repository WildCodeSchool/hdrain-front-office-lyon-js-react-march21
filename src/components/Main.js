import { Switch, Route } from 'react-router';
import HistoryPage from '../screens/HistoryPage';
import HomePage from '../screens/HomePage';
import MonitoringPage from '../screens/MonitoringPage';
import NeuronsNetwork from './NeuronsNetwork';
import VirtualEngine from './VirtualEngine';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/monitoring" component={MonitoringPage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route
          exact
          path="/monitoring/neurons_network"
          component={NeuronsNetwork}
        />
        <Route
          exact
          path="/monitoring/virtual_engine"
          component={VirtualEngine}
        />
      </Switch>
    </main>
  );
}
