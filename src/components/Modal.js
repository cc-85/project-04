// import React from 'react';
// import axios from 'axios';
// import Auth from '../lib/Auth';
// import CocktailsShow from './cocktails/CocktailsShow';

// class Register extends React.Component {
//   constructor() {
//     super();
//     this.state = { modelActive: []};
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//
//   }
//
//   componentDidMount() {
//     this.setState({ modelActive: true });
//   }
//
//   handleCloseModal() {
//     this.setState({ modelActive: false });
//   }
//
//   render() {
//     return (
//
//       <div
//         className={`modal ${this.state.modelActive === true ? 'is-active' : ''}`}
//       >
//         <div className="modal-background" onClick={this.handleCloseModal}></div>
//         <div className="modal-card">
//           <header className="modal-card-head">
//             <p className="modal-card-title">Modal title</p>
//             <button className="delete" aria-label="close" onClick={this.handleCloseModal}></button>
//           </header>
//           <section className="modal-card-body">
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
//
//           </section>
//           <footer className="modal-card-foot">
//             <button className="button" onClick={this.handleCloseModal}>Cancel</button>
//           </footer>
//         </div>
//       </div>
//
//     );
//   }
// }
//
// export default Register;


import React from 'react';
// import Select from 'react-select';

const Modal = ({ modalActive, handleCloseModal, ...props }) => {


  console.log(props);
  const isActive = modalActive;

  return (
    <div className={`modal ${isActive === 'is-active' ? 'is-active' : ''}`} >
      <div className="modal-background" onClick={handleCloseModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close" onClick={handleCloseModal}></button>
        </header>
        <section className="modal-card-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>

        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={handleCloseModal}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
