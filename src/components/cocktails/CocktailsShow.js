import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
//import _ from 'lodash';


class CocktailsShow extends React.Component {
  constructor() {
    super();
    this.state = { cocktail: null, ingredients: []};

  }


  componentDidMount() {
    axios
      .get(`/api/cocktails/${this.props.match.params.id}`)
      .then(res => this.setState({ cocktail: res.data}));
    const token = Auth.getToken();
    axios
      .get(`/api/users/${Auth.getPayload().sub}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(res => this.setState({
        ingredients: res.data.ingredients.map(ingredient => ingredient.name)
      }));

  }



  render() {
    if(!this.state.cocktail) return null;
    console.log(this.state);
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <img src={ this.state.cocktail.image} alt={this.state.cocktail.name}/>
            </div>

            <div className="column is-half">
              <h1 className="title is-2">{ this.state.cocktail.name }</h1>
              <h2 className="title is-4">Ingredients</h2>
              {this.state.cocktail.ingredients.map(ingredient =>
                //<div className={`card ${this.hasIngredients(cocktail) ? 'highlight' : ''}`}>
                <div key={ingredient.name}>
                  {/* <p className={this.state.ingredients.includes(ingredient.name) ? 'highlight' : ''}> */}
                  <p>{this.state.ingredients.includes(ingredient.name) ? '🍹' : ''}
                    {ingredient.amount} {ingredient.name}
                  </p>
                </div>
              )}
              <h2 className="title is-4">Method</h2>
              <p>{ this.state.cocktail.method }</p>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

export default CocktailsShow;
