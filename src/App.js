import './App.css';
import Routes from './Routes'
import GlobalAlertHandler from './containers/GlobalAlertHandler'

function App() {
  return (
    <div className="App">
      <Routes />
      <GlobalAlertHandler />
    </div>
  );
}

export default App;
