import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const LoginFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
  loginUser,
  loginPassword
}) => {
  return (
    <div className="input-group mt-3">
      {loginUser && <div className="input-group-prepend"><div className="input-group-text"><i className="far fa-envelope"></i></div></div>}
      {loginPassword && <div className="input-group-prepend"><div className="input-group-text"><i className="fas fa-key"></i></div></div>}
      <input
      type={type} 
      className={classnames('form-control form-control-lg', {
        'is-invalid': error
      })}
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      name={name} 
      disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  );
};

LoginFieldGroup.propTypes = {
  loginUser: PropTypes.string,
  loginPassword: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}

LoginFieldGroup.defaultProps = {
  type: 'text'
}

export default LoginFieldGroup;