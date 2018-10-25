import React from 'react';



class CocktailsIndex extends React.Component {
  constructor() {
    super();
    this.state = { cocktails: []};
  }



  render() {
    return (
      <h1 className="title is-1">Cocktails Index page</h1>
    );
  }
}

export default CocktailsIndex;
