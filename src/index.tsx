import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './components/HomeComponent';
import { Switch, Route, BrowserRouter, Router} from 'react-router-dom';
import FormComponent from './components/FormComponent';
import DisplayContactComponent from './components/DisplayContactComponent';
import App from "./components/App";

{/* <Router>
  <div>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detailsForm" component={FormComponent} />
        <Route path="/displayContact/:id" component={DisplayContactComponent} />
    </Switch>
  </div>
</Router> */}

ReactDOM.render(<App />, document.getElementById('root'));
