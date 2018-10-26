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
      <h1 className="title is-1">Cocktails Show page</h1>
    );
  }
}

export default CocktailsShow;
