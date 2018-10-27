import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class CocktailsIndex extends React.Component {
  constructor() {
    super();
    this.state = { cocktails: []};
  }

  componentDidMount() {
    axios
      .get('/api/cocktails')
      .then(res => this.setState({ cocktails: res.data}));
  }



  render() {
    console.log(this.state);
    return (
      <main className="section">
        <div className="container">
          <h1 className="title is-1">Cocktails Index page</h1>

          <div className="columns is-multiline">
            {this.state.cocktails.map(cocktail =>
              <div key={cocktail.id} className="column is-one-quarter">
                <Link to={`/cocktails/${cocktail.id}`}>
                  <div className="card">
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
