import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import { Provider as AlertProvider } from 'react-alert';

const options = {
  timeout: 3000,
  offset: '30px',
};

const AlertTemplate = ({ message }) => (
  <div
    style={{
      background: '#4AD669',
      width: '200px',
      height: '42px',
      position: 'absolute',
      right: '70px',
      top: '60px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Roboto',
    }}>
    {message}
  </div>
);

function App() {
  const history = createBrowserHistory();
  return (
    <div className='App'>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Router>
      </AlertProvider>
    </div>
  );
}

export default App;
