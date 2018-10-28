import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';


class AddIngredients extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, errors: {}, ingredients: [], allPossibleIngredients: [] };

    this.handleChange = this.handleChange.bind(this);
    this.printState = this.printState.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);


  }

  componentDidMount() {
    const token = Auth.getToken();
    axios
      .get(`/api/users/${Auth.getPayload().sub}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(res => this.setState({
        ingredients: res.data.ingredients,
        user: res.data
      }));
    axios
      .get('/api/ingredients')
      .then(res => this.setState({
        allPossibleIngredients: res.data
      }));



  }

  handleChange(e) {
    this.setState({ newIngredient: e.target.value });
    const query = e.target.value;
    const allPossibleIngredients = this.state.allPossibleIngredients.slice();
    const ingredientsSearchResult = allPossibleIngredients.filter(ingredient => ingredient.name.includes(query));
    console.log(this.state);
    console.log('search results ------> ' + ingredientsSearchResult);
    console.log('search query ------> ' + query);
    console.log(allPossibleIngredients);
    this.setState({
      newIngredient: e.target.value,
      ingredientsSearchResult: ingredientsSearchResult
    });
  }

  printState() {
    console.log(this.state);
  }

  handleNewIngredient() {

    const newIngredient = this.state.newIngredient;
    console.log('new Ing is ---->' + newIngredient);

    if(newIngredient){
      this.setState({
        ingredients: this.state.ingredients.concat([{name: newIngredient}]),
        newIngredient: ''
      });
      console.log(this.state);
    }
  }

  handleRemoveIngredient = (idx) => () => {
    const remainingIngredients = this.state.ingredients.filter((s, sidx) => idx !== sidx);
    console.log(remainingIngredients);
    this.setState({
      ingredients: remainingIngredients
    });
  }

  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">

          <h1 className="title is-1">Ingredients Page</h1>

          <button onClick={this.printState} className="button is-danger">Print State</button>

          <ul>
            { this.state.ingredients ? this.state.ingredients.map((ingredient, index) =>
              <div key={index}>

                <li >{ ingredient.name }</li>
                <button className="delete" onClick={this.handleRemoveIngredient(index)}></button>
              </div>

            ) : <p>Add ingredients</p>}
          </ul>



          <div className="field">
            <label className="label">New Ingredient</label>
            <div className="control">
              <input
                className={`input ${this.state.error ? 'is-danger' : ''} `}
                name="newIngredient"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.newIngredient  || ''}
              />
              <button onClick={this.handleNewIngredient} className="button is-primary">Add</button>
            </div>
          </div>

          <h2 className="title is-4">Search Results: </h2>
          <ul>

            { this.state.ingredientsSearchResult ? this.state.ingredientsSearchResult.map((ingredient, index) =>
              <div key={index}>
                <li >{ ingredient.name }</li>
              </div>

            ) : <p>Enter Ingredient</p>}
          </ul>

        </div>
      </main>
    );
  }
}

export default AddIngredients;
