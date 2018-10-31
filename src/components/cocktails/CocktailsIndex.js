import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterBar from '../FilterBar';
import _ from 'lodash';
import Auth from '../../lib/Auth';
import Promise from 'bluebird';
import Profile from '../users/Profile';
import Modal from '../Modal';

class CocktailsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      cocktails: null,
      filter: '',
      user: null,
      ingredients: [],
      modalActive: false,
      modalContent: 'HelloWorld!'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleLaunchModal = this.handleLaunchModal.bind(this);
  }

  componentDidMount() {

    const requests = {
      cocktails: axios.get('/api/cocktails').then(res => res.data),
      ingredients: axios.get('/api/ingredients').then(res => res.data),
      user: { ingredients: [] }
    };

    if(Auth.isAuthenticated()) {
      const token = Auth.getToken();
      const userId = Auth.getPayload().sub;
      requests.user = axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}`}
      }).then(res => res.data);
    }

    Promise.props(requests)
      .then(res => this.setState(res));
  }

  handleSearch(e) {
    this.setState({ filter: e.target.value });
  }

  handleChange(e) {
    const token = Auth.getToken();
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    axios
      .put(`/api/users/${Auth.getPayload().sub}`, user, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => this.setState({ user }, () => console.log(this.state)));
  }

  //creates a sorted array for us to loop over
  getOrderedAndFilteredCocktails() {
    const re = new RegExp(this.state.filter, 'i');

    const cocktails = this.state.cocktails.map(cocktail => {
      cocktail.ingredientRatio = this.getIngredientRatio(cocktail, this.state.user.ingredients);
      return cocktail;
    });

    const filtered = _.filter(cocktails, cocktail => {
      return cocktail.ingredients.some(ingredient=> re.test(ingredient.name)) || re.test(cocktail.name);
    });
    return _.orderBy(filtered, ['ingredientRatio', 'name'], ['desc', 'asc']);
  }

  getIngredientRatio(cocktail, ingredients) {
    const cocktailIngredients = cocktail.ingredients.map(ingredient => ingredient.name);
    const userIngredients = ingredients.map(ingredient => ingredient.name);

    const matchingIngredients = _.intersection(cocktailIngredients, userIngredients);
    return matchingIngredients.length / cocktailIngredients.length;
  }


  getClassName(cocktail) {
    if (cocktail.ingredientRatio === 1) {
      return 'full-match';
    } else if (cocktail.ingredientRatio > 0) {
      return 'part-match';
    } else {
      return '';
    }
  }

  handleCloseModal() {
    this.setState({ modalActive: false });
  }

  handleLaunchModal(){
    this.setState({ modalActive: true });
  }

  render() {
    if(!this.state.cocktails) return null;
    return (
      <main className="section">
        <div className="container">
          {/* <h1 className="title is-1">Cocktails Index page</h1> */}
          {/* <button onClick={this.handleLaunchModal}>Launch Modal</button> */}
          <Modal
            modalActive={this.state.modalActive}
            handleCloseModal={this.handleCloseModal}
            modalContent={this.modalContent}
          />

          {Auth.isAuthenticated() ? (
            <Profile
              user={this.state.user}
              handleChange={this.handleChange}
              ingredients={this.state.ingredients}
            />
          ) : (
            <p>Sign in</p>
          )}

          <FilterBar handleChange={this.handleSearch} />

          <div className="columns is-multiline">
            {this.getOrderedAndFilteredCocktails().map(cocktail =>
              <div key={cocktail.id} className="column is-one-quarter">
                <Link to={`/cocktails/${cocktail.id}`}>
                  <div className={`card ${this.getClassName(cocktail)}`}>
                    <div className="card-header">
                      <p className="card-header-title">
                        {cocktail.name}
                      </p>
                    </div>

                    <div className="card-image">
                      <figure className="image">
                        <img src={cocktail.image} alt={cocktail.name} />
                      </figure>
                    </div>

                  </div>
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>

    );
  }
}

export default CocktailsIndex;
