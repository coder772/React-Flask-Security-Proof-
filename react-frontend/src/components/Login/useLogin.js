import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { login } from '../../services/services';
function useLogin() {
  const history = useHistory();
  const alert = useAlert();
  const [state, setState] = useState({
    username: '',
    password: '',
    usernameVal: '',
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
      setState((prev) => ({ ...prev, usernameVal: 'Email is required!' }));
    }
    if (state.password === '') {
      validated = false;
      setState((prev) => ({ ...prev, passwordVal: 'Password is required!' }));
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
      const req = await login({ email: state.username, password: state.password });
      // const req = await authenticationService.login(state.username, state.password);

      alert.show('login Successful!');
      // history.push('/create');
    } catch (err) {
      if (err.response.data.response.errors.email) {
        setState((prev) => ({
          ...prev,
          submitting: false,
        }));
        alert.show(err.response.data.response.errors.email[0]);
      } else {
        setState((prev) => ({
          ...prev,
          submitting: false,
        }));
        alert.show('Invalid Credentials!');
      }
    }
  };
  return {
    ...state,
    handleOnChange,
    handleOnSubmit,
  };
}

export default useLogin;
