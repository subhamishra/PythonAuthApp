import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Index from './Component/Index';
import Home from './Component/Home';
import Register from './Component/Register';
import ModalRoot from './Component/Common/ModalRoot';
import PrivateRoute from './Component/Common/PrivateRoute';

class  App extends React.Component {
  render () {

    return (
      <React.Fragment>
        <BrowserRouter>                    
          <Switch>                                
            <Route exact path="/" component={Index} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/Home" component={Home} />
          </Switch>
        </BrowserRouter>
        <ModalRoot />
        <ModalRoot isNested={true} />
      </React.Fragment>
    );
  }
}

export default App;
