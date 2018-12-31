import React, { Component } from 'react';
import Modal from 'react-modal';
import Register from '../auth/Register';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '30px',
    width                 : '500px',
    height                : '600px'     
  }
};

const closeButtonStyle = {
    position: 'fixed',
    top:   '0px',
    right:    '0px' 
}

Modal.setAppElement('#root')

class SignupModal extends Component {

  state = {
    modalIsOpen: true
  }

  clickHandler = () => {
    this.props.closeModal();
  }

  render() {
    return (
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Login"
        >
        <button className="btn" style={closeButtonStyle} onClick={this.clickHandler}><i className="fas fa-times"></i></button>
        <Register /> 
        </Modal>
    );
  }
}

export default connect(null, { closeModal })(SignupModal);

