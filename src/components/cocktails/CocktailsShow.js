import React from 'react';
import axios from 'axios';


class CocktailsShow extends React.Component {
  constructor() {
    super();
    this.state = { cocktail: null };
  }


  componentDidMount() {
    axios.get(`/api/cocktails/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ cocktail: res.data });
      });
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
                <div key={ingredient.name}>
                  <p>
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
