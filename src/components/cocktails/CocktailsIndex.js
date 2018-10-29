import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterBar from '../FilterBar';
import _ from 'lodash';
import Auth from '../../lib/Auth';


class CocktailsIndex extends React.Component {
  constructor() {
    super();
    this.state = { cocktails: [], filter: '', ingredients: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/cocktails')
      .then(res => this.setState({ cocktails: res.data}));
    const token = Auth.getToken();
    axios
      .get(`/api/users/${Auth.getPayload().sub}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(res => this.setState({
        ingredients: res.data.ingredients
      }));
    //const yellow = [{name: 'Vodka'}, {name: 'Creme de Cacao'}];
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


  hasIngredients(cocktail) {
    const cocktailIngredients = cocktail.ingredients.map(ingredient => ingredient.name);
    const userIngredients = this.state.ingredients.map(ingredient => ingredient.name);

    const matchingIngredients = _.intersection(cocktailIngredients, userIngredients);
    return matchingIngredients.length === cocktailIngredients.length;
    //matchingIngredients.length > 0 
  }



  render() {
    console.log(this.state);
    return (
      <main className="section">
        <div className="container">
          <h1 className="title is-1">Cocktails Index page</h1>
          <FilterBar handleChange={this.handleChange} />
          <div className="columns is-multiline">
            {this.getFilteredCocktails().map(cocktail =>
              <div key={cocktail.id} className="column is-one-quarter">
                <Link to={`/cocktails/${cocktail.id}`}>
                  <div className={`card ${this.hasIngredients(cocktail) ? 'highlight' : ''}`}>
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
