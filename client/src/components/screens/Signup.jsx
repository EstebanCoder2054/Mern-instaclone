import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import { useEffect } from "react";

const Signup = () => {

  const history = useHistory();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if(url){
      uploadFields();
    }
  }, [url])

  const uploadFields = () => {
    if(name.trim() === '' || email.trim() === '' || password.trim() === ''){
      M.toast({html: 'All fields are required', classes: 'red lighten-1'})   
      return;
    }

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid email', classes: 'red lighten-1'})   
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        M.toast({html: data.error, classes: 'red lighten-1'})
      }else{
        M.toast({html: data.message, classes: 'green lighten-1'})
        history.push('/signin');
      }
    })
    .catch(error => console.log(error))
  }

  const postData = () => {
    if(image){
      uploadPic();
    }else{
      uploadFields();
    }
  }

  const uploadPic = () => {
    //  configuración para subir la imagen a cloudinary
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone');
    data.append('cloud_name', 'estebandido');
    
    fetch('https://api.cloudinary.com/v1_1/estebandido/image/upload', {
      method: 'post',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      setUrl(data.url)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>InstaClone</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className="file-field input-field">
          <div className="btn blue lighten-2">
            <span>Upload Profile Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button 
          onClick={() => postData()}
          className="btn waves-effect waves-ligth blue lighten-2">
          SignUp
        </button>

        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
