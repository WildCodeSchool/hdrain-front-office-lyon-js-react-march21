import { Switch, Route } from 'react-router-dom';
import { LocationContextProvider } from '../contexts/LocationContext';
import HistoryPage from '../screens/HistoryPage';
import HomePage from '../screens/HomePage';
import DataAssimilationPage from '../screens/DataAssimilationPage';
import NeuralNetworkPage from '../screens/NeuralNetworkPage';

export default function Main() {
  return (
    <main>
      <LocationContextProvider>
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/history" component={HistoryPage} />
          <Route exact path="/neuralNetwork" component={NeuralNetworkPage} />
          <Route exact path="/assimilation" component={DataAssimilationPage} />
        </Switch>
      </LocationContextProvider>
    </main>
  );
}
