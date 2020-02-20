import * as React from 'react';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';

import Home from './HomeComponent';
import FormComponent from './FormComponent';
import DisplayContactComponent from './DisplayContactComponent';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route path="/" component={Home} />
          <Switch>
            <Route path={["/add", "/update/:id"]} component={FormComponent} />
            {/* <Route path="/update/:id" component={FormComponent} /> */}
            <Route exact={true} path="/displayContact/:id" component={DisplayContactComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;