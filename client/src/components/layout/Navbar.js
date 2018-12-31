import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginModal, openSignupModal } from '../../actions/modalActions';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

    loginModalHandler = (e) => {
        e.preventDefault();
        this.props.openLoginModal();
    }

    signupModalHandler = (e) => {
        e.preventDefault();
        this.props.openSignupModal();
    }

    onLogoutHandler = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
        <ul className="navbar-nav navbar-right">
            <li className="nav-item">
                <Link className="nav-link" to="/feed">Post Feed</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <img className="rounded-circle" src={user.avatar} alt={user.name} style={{ width: '40px', marginRight: '5px' }} title="You must have a Gravatar connected to your email to display an image" />
                {' '}
                <button className="btn btn-sm btn-light" onClick={ this.onLogoutHandler }>Log out <i className="fas fa-sign-out-alt"></i></button>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav navbar-right">
            <li className="nav-item mr-3">
                <button className="btn btn-sm btn-light" onClick={ this.signupModalHandler }>Sign up <i className="fa fa-user-plus"></i></button>
            </li>
            <li className="nav-item">
                <button className="btn btn-sm btn-light" onClick={ this.loginModalHandler }>Log in <i className="fa fa-user"></i></button>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/"><i className="fas fa-laptop-code"></i> CoderRoom</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="profiles">Developers<span className="sr-only">(current)</span></Link>
                    </li>
                    </ul>
                    { isAuthenticated ? authLinks : guestLinks }
                </div>
            </div>
        </nav>
    )
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { clearCurrentProfile, logoutUser, openLoginModal, openSignupModal })(Navbar);
