import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';
import './scss/style.scss';

import Navbar from './components/Navbar';
import Login from './components/Login';
// import Modal from './components/Modal';
import Register from './components/Register';
import Profile from './components/users/Profile';
import ProfileEdit from './components/users/ProfileEdit';
import AddIngredients from './components/users/AddIngredients';
import CocktailsIndex from './components/cocktails/CocktailsIndex';
// import CocktailsHome from './components/cocktails/CocktailsHome';
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

              {/* <Modal/> */}

              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cocktails/:id" component={CocktailsShow} />
                {/* <Route path="/cocktails" component={CocktailsIndex} /> */}
                <Route path="/edit" component={ProfileEdit} />
                <Route path="/profile" component={Profile} />
                <Route path="/ingredients" component={AddIngredients} />
                <Route path="/" component={CocktailsIndex} />
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
