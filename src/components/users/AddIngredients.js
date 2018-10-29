import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import IngredientsSelect from './IngredientsSelect';
import Promise from 'bluebird';

class AddIngredients extends React.Component {
  constructor() {
    super();
    this.state = { user: null, errors: {} };

    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    const token = Auth.getToken();
    const userId = Auth.getPayload().sub;

    Promise.props({
      user: axios.get(`/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}`} }).then(res => res.data),
      ingredients: axios.get('/api/ingredients').then(res => res.data)
    })
      .then(data => this.setState(data, () => console.log(this.state)));
  }

  handleChange(e) {
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    this.setState({ user }, () => console.log(this.state));
  }

  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">

          <h1 className="title is-1">Ingredients Page</h1>

          <IngredientsSelect
            isMulti
            name="colors"
            ingredients={this.state.ingredients}
            defaultValue={this.state.user.ingredients}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.handleChange}
          />

        </div>
      </main>
    );
  }
}

export default AddIngredients;
