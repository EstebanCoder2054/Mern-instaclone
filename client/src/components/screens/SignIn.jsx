import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import { GlobalContext } from '../../context/GlobalState';

const SignIn = () => {

  const { stockUser } = useContext(GlobalContext);

  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = () => {
    if(email.trim() === '' || password.trim() === ''){
      M.toast({html: 'All fields are required', classes: 'red lighten-1'})   
      return;
    }

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid email', classes: 'red lighten-1'})   
      return;
    }
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        M.toast({html: data.error, classes: 'red lighten-1'})
      }else{
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('ESTE ES EL DATA USER -> JWT: ', data.user);
        history.push('/');
        M.toast({html: 'Signed successfuly', classes: 'green lighten-1'})
        // dispatch({type: 'USER', payload: data.user})
        stockUser(data.user);
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>InstaClone</h2>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button 
            onClick={() => postData()}
            className="btn waves-effect waves-ligth blue lighten-2"
        >
            Login
        </button>
        <h5>
            <Link to="/signup">Don't have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignIn;
