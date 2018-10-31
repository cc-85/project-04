import React from 'react';

const Modal = ({ modalActive, handleCloseModal, modalContent, ...props }) => {


  console.log(props);
  const isActive = modalActive;
  console.log(modalContent);

  return (
    <div className={`modal ${isActive === true ? 'is-active' : ''}`} >
      <div className="modal-background" onClick={handleCloseModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`${modalContent}`}</p>
          <button className="delete" aria-label="close" onClick={handleCloseModal}></button>
        </header>
        <section className="modal-card-body">

          <img src="https://66.media.tumblr.com/e9d8981ccf2097f03bc10d1977039053/tumblr_oqh9ebevpA1s9a9yjo1_500.gif" alt="Smiley face" height="420"/>

        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={handleCloseModal}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
