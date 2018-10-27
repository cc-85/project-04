import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/users/Profile';
import CocktailsIndex from './components/cocktails/CocktailsIndex';
import CocktailsHome from './components/cocktails/CocktailsHome';
import CocktailsShow from './components/cocktails/CocktailsShow';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          {/* <FlashMessages /> */}
          <main className="section">
            <div className="container">

              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cocktails/:id" component={CocktailsShow} />
                <Route path="/cocktails" component={CocktailsIndex} />
                <Route path="/profile" component={Profile} /> */
                <Route path="/" component={CocktailsHome} />
              </Switch>

            </div>

          </main>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
