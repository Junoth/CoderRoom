import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const RegisterFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
  registerUser,
  registerPassword,
  registerEmail,
  registerPassword2
}) => {
  return (
    <div className="input-group mt-3">
      {registerUser && <div className="input-group-prepend"><div className="input-group-text"><i className="far fa-user"></i></div></div>}
      {registerEmail && <div className="input-group-prepend"><div className="input-group-text"><i className="fas fa-envelope"></i></div></div>}
      {registerPassword && <div className="input-group-prepend"><div className="input-group-text"><i className="fas fa-key"></i></div></div>}
      {registerPassword2 && <div className="input-group-prepend"><div className="input-group-text"><i className="fas fa-check"></i></div></div>} 
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

RegisterFieldGroup.propTypes = {
  registerUser: PropTypes.string,
  registerPassword: PropTypes.string,
  registerPassword2: PropTypes.string,
  registerEmail: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}

RegisterFieldGroup.defaultProps = {
  type: 'text',
}

export default RegisterFieldGroup;