import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from 'materialize-css';

const CreatePost = () => {

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  useEffect(() => {
    if(imageUrl){
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type':'application/json',
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          title,
          body,
          pic: imageUrl
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          M.toast({html: data.error, classes: 'red lighten-1'})
        }else{
          M.toast({html: 'Post created', classes: 'green lighten-1'})
          history.push('/');
        }
      })
      .catch(error => console.log(error))
    }
  
  }, [imageUrl]);


  const postDetails = () => {

    // configuración para subir la imagen a cloudinary
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
      setImageUrl(data.url)
    })
    .catch(error => console.log(error))

    
  
  }

  return (
    <>
      <div className="card input-file"
            style={{margin: '40px auto', maxWidth: '500px', padding: '20px', textAlign: 'center'}}
      >
        <input type="text" placeholder="title" value={title} onChange={ (e) => setTitle(e.target.value)} />
        <input type="text" placeholder="body" value={body} onChange={ (e) => setBody(e.target.value)} />
        <div className="file-field input-field">
          <div className="btn blue lighten-2">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
            onClick={() => postDetails()}  
            className="btn waves-effect waves-ligth blue lighten-2"
        >
            Create Post
        </button>
      </div>
    </>
  );
};

export default CreatePost;
