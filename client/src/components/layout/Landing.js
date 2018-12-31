import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

  render() {
    return (
        <div className="landing">
            <div className="dark-overlay text-light">
                <div className="container text-center landing-inner">
                    <h1 className="display-1 mb-4 landing-font">CoderRoom</h1>
                    <h2 className="display-5 landing-font">Meet more coder, share more ideas</h2>
                    <Link to="/profiles" className="btn btn-lg btn-light mt-3">Exploring   <i className="fas fa-arrow-circle-right pt-1"></i></Link>
                </div>
            </div>
        </div>
    )
  }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);