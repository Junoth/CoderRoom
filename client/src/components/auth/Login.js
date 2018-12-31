import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

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
          <h1 className="display-4 text-center">Log in <i className="fas fa-hand-point-right"></i></h1>
          <p className="lead text-center">
            Log in to your Yamy accoun
          </p>
          <form noValidate onSubmit={this.onSubmitHandler}>
            <TextFieldGroup
              placeholder="Email Adress"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              error={errors.password}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
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

export default connect(mapStateToProps, { loginUser })(withRouter(Login));