import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import useLogin from './useLogin';
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
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  input: {
    background: '#1F2025',
    color: 'white !important',
    padding: 20,
    outline: 'none',
    border: 'none',
    width: '90%',
    fontFamily: 'Roboto',
  },
  form: {
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 20,
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
  forgot_password: {
    // textDecoration: "none",
    fontSize: 16,
    fontFamily: 'Roboto',
    // color: '#FFFFFF',
    color: '#a94ad6',
  },
  forgot_div: {
    marginTop: 10,
    marginBottom: 10,
    // textAlign: 'right',
  },
  eye: {
    height: 30,
    position: 'absolute',
    right: 10,
    top: 12,
    cursor: 'pointer',
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [visible, setvisible] = React.useState(false);

  const { handleOnChange, handleOnSubmit, username, password, passwordVal, usernameVal, submitting } = useLogin();
  const handleVisible = () => {
    setvisible(!visible);
  };
  return (
    <>
      <div className='card'>
        <div className='logo_container'>
          <div className='logo'>
            <img src={'/assets/lock.png'} alt='' />
          </div>
        </div>
        <div className={classes.root}>
          <div className='page_title'>SIGN IN</div>
          <div className='container'>
            <form className={classes.form} noValidate autoComplete='off'>
              <div className={classes.inputContainer}>
                <input className={classes.input} name='username' value={username} onChange={handleOnChange} placeholder='Email' />
                <text className='Valtext'>{usernameVal}</text>
              </div>
              <div className={classes.inputContainer}>
                <input
                  className={classes.input}
                  type={visible ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={handleOnChange}
                  placeholder='Password'
                />
                <img name='password' onClick={handleVisible} className={classes.eye} src={'../assets/eye.png'} alt='' />
                <text className='Valtext'>{passwordVal}</text>
              </div>
            </form>
            <LoaderButton style={'button'} text={'Submit'} loading={submitting} height={30} width={30} onClick={handleOnSubmit} />
          </div>
        </div>
        <div>
          <Link to="/signup">
              <a>Sign up</a>
          </Link>
        </div>
      </div>
    </>
  );
}
