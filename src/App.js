import React from 'react';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>

    );
  }
}

export default App;
