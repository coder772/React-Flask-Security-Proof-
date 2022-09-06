import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { register } from '../../services/services';

function useSignup() {
  const history = useHistory();
  const alert = useAlert();
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    usernameVal: '',
    emailVal: '',
    passwordVal: '',
    submitting: false,
  });
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value, [name + 'Val']: '' }));
  };

  const isValidated = () => {
    let validated = true;
    if (state.username === '') {
      validated = false;
      setState((prev) => ({ ...prev, usernameVal: 'Username is required!' }));
    }
    if (state.password === '') {
      validated = false;
      setState((prev) => ({ ...prev, passwordVal: 'Password is required!' }));
    }
    if (state.email === '') {
      validated = false;
      setState((prev) => ({ ...prev, emailVal: 'Email is required!' }));
    }
    if (state.submitting) {
      return;
    }
    return validated;
  };

  const handleOnSubmit = async () => {
    if (!isValidated()) return;
    try {
      setState((prev) => ({
        ...prev,
        submitting: true,
      }));

      const formData = { email: state.email, password: state.password };
      const req = await register(formData);
      history.push('/');
      alert.show('Signup Successfull ');
    } catch (err) {
      console.log('<<<<<<<<<<<<<<<<<<<<<', err);
      setState((prev) => ({
        ...prev,
        submitting: false,
      }));
      alert.show('There is an error !');
    }
  };
  return {
    ...state,
    handleOnChange,
    handleOnSubmit,
  };
}

export default useSignup;
