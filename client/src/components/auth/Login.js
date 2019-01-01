import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import LoginFieldGroup from '../common/LoginFieldGroup';
import { Link } from 'react-router-dom';
import { closeModal } from '../../actions/modalActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData, this.props.history); 
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <h1 className="display-4 text-center"><strong>Log in</strong></h1>
          <p className="lead text-center">
            <strong>to your CoderRoom account</strong>
          </p>
          <form noValidate onSubmit={this.onSubmitHandler}>
            <LoginFieldGroup
              loginUser="true"
              placeholder="Email Adress"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              error={errors.email}
            />
            <LoginFieldGroup
              loginPassword="false"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              error={errors.password}
            />
            <input type="submit" className="btn btn-primary btn-block mt-4 mb-4" />
          </form>
          <div className="container text-center">
            <small>Doesn't have an acount? <Link to="/register" onClick={this.props.closeModal}>Sign up</Link> now ! <span><i className="fas fa-arrow-circle-right"></i></span></small>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser, closeModal })(withRouter(Login));