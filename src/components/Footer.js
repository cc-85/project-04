import React from 'react';

class Footer extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>🍸 Tippled. </strong> An awesome website by <a href="https://github.com/jamesr101">James</a> and <a href="https://github.com/cc-85">Caoimhe</a>. 🍸
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
