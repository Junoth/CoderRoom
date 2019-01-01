import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import RegisterFieldGroup from '../../components/common/RegisterFieldGroup';
import { Link } from 'react-router-dom';
import { closeModal } from '../../actions/modalActions';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  } 

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <h1 className="display-4 text-center text-black"><strong>Sign up</strong></h1>
          <p className="lead text-center text-black">
            <strong>to your CoderRoom account</strong>
          </p>
          <form noValidate onSubmit={ this.onSubmitHandler }>
            <RegisterFieldGroup
              registerUser="true"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChangeHandler}
              error={errors.name}
            />
            <RegisterFieldGroup
              registerEmail="true"
              placeholder="Email Address"
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.onChangeHandler}
              error={errors.email}
            />
            <RegisterFieldGroup
              registerPassword="true"
              placeholder="Password"
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.onChangeHandler}
              error={errors.password}
            />
            <RegisterFieldGroup
              registerPassword2="true"
              placeholder="Confirm Password"
              name='password2'
              type='password'
              value={this.state.password2}
              onChange={this.onChangeHandler}
              error={errors.password2}
            />
            <input type="submit" className="btn btn-primary btn-block mt-4 mb-4" />
          </form>
          <div className="container text-center">
            <small>Alreay have an acount? <Link to="/login" onClick={this.props.closeModal}>Log in</Link> now ! <span><i className="fas fa-arrow-circle-right"></i></span></small>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser, closeModal })(withRouter(Register));