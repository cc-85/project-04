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
    this.state = { cocktails: [], filter: '', ingredients: [], modelActive: 'is-active' };
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {

    const requests = {
      cocktails: axios.get('/api/cocktails').then(res => res.data),
      ingredients: []
    };

    if(Auth.isAuthenticated()) {
      const token = Auth.getToken();
      const userId = Auth.getPayload().sub;
      requests.ingredients = axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}`}
      }).then(res => res.data.ingredients);
    }

    Promise.props(requests)
      .then(res => {
        const cocktails = res.cocktails.map(cocktail => {
          cocktail.ingredientRatio = this.getIngredientRatio(cocktail, res.ingredients);
          return cocktail;
        });

        res.cocktails = _.orderBy(cocktails, ['ingredientRatio', 'name'], ['desc', 'asc']);

        this.setState(res);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //creates a sorted array for us to loop over
  getFilteredCocktails() {
    const re = new RegExp(this.state.filter, 'i');

    return _.filter(this.state.cocktails, cocktail => {
      return cocktail.ingredients.some(ingredient=> re.test(ingredient.name)) || re.test(cocktail.name);
    });
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
    this.setState({ modelActive: false });
  }

  render() {
    console.log(this.state);
    return (
      <main className="section">
        <div className="container">
          <h1 className="title is-1">Cocktails Index page</h1>
          <Modal
            modalActive={this.state.modelActive}
            handleCloseModal={this.handleCloseModal}
          />
          {/* <IngredientsSelect
            isMulti
            name="colors"
            ingredients={this.state.ingredients}
            defaultValue={this.state.user.ingredients}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.handleChange}
          /> */}

          <Profile/>
          {Auth.isAuthenticated() ? <FilterBar handleChange={this.handleChange} /> : <p>Sign in</p>}
          <div className="columns is-multiline">
            {this.getFilteredCocktails().map(cocktail =>
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
