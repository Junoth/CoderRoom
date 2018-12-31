import React from 'react'
import LoginModal from './LoginModal';
import SignupModal from './SignupModal'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'LOG_IN':
      return <LoginModal />;

    case 'SIGN_UP':
      return <SignupModal />;

    default:
      return null;
  }
};

ModalConductor.propTypes = {
  currentModal: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  currentModal: state.modals.currentModal
});

export default connect(mapStateToProps, null)(ModalConductor);

