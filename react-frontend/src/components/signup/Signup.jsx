import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useSignup from './useSignup';
import './sigup.css';
import LoaderButton from '../loaderbtn/LoaderBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '70%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    background: '#35363b',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  input: {
    width: '90%',
    background: '#1F2025',
    color: 'white !important',
    padding: 20,
    outline: 'none',
    border: 'none',
    marginTop: 5,
    fontFamily: 'Roboto',
  },
  form: {
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 10,
    justifyContent: 'center',
    marginTop: '10%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  eye: {
    height: 30,
    position: 'absolute',
    right: 20,
    top: 35,
    cursor: 'pointer',
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const { handleOnSubmit, handleOnChange, username, usernameVal, email, emailVal, password, passwordVal, submitting } = useSignup();
  const [visible, setvisible] = React.useState(false);
  const handleVisible = () => {
    setvisible(!visible);
  };
  return (
    <>
      <div className='card_log'>
        <div className='logo_container_log'>
          <div className='logo_log'>
            <img src={'/assets/lock.png'} alt='' />
          </div>
        </div>
        <div className={classes.root}>
          <div className='page_title_log'>CREATE ACCOUNT</div>
          <div className='subtitle_log'>Wow, you must be someone special!</div>
          <div className='container_log'>
            <form className={classes.form} noValidate autoComplete='off'>
              <div className='field_container_log'>
                <label>Name</label>
                <input
                  className={classes.input}
                  required
                  type='text'
                  name='username'
                  value={username}
                  onChange={handleOnChange}
                  placeholder='First name'
                />
                <text className='Valtext'>{usernameVal}</text>
              </div>
              <div className='field_container_log'>
                <label>Email</label>
                <input className={classes.input} required name='email' onChange={handleOnChange} placeholder='Email' />
                <text className='Valtext'>{emailVal}</text>
              </div>
              <div className='field_container_log'>
                <label>Password</label>
                <input
                  className={classes.input}
                  required
                  type={visible ? 'text' : 'password'}
                  name='password'
                  onChange={handleOnChange}
                  placeholder='Password'
                />
                <img name='password' onClick={handleVisible} className={classes.eye} src={'/assets/eye.png'} alt='' />
                <text className='Valtext'>{passwordVal}</text>
              </div>
            </form>
            <LoaderButton style={'button_log'} text={'Submit'} loading={submitting} height={30} width={30} onClick={handleOnSubmit} />
          </div>
        </div>
        <div>
          <Link to="/">
              <a>Login</a>
          </Link>
        </div>
      </div>
    </>
  );
}
