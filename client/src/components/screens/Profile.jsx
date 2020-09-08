import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';

const Profile = () => {

    const [myPosts, setMyPosts] = useState([]);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if(image){
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
                setUrl(data.url);
                console.log(data);
                // JSON.stringifylocalStorage.setItem('user')
            })
            .catch(error => console.log(error))
        }
    }, [image])

    const fetchPosts = async () => {
        const response = await axios.get('/mypost', {
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        })
        setMyPosts(response.data.mypost);
    }
    const updatePhoto = (file) => {
        setImage(file);
    }

    return ( 
        <div style={{maxWidth: '950px', margin: '0px auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', margin: '18px 0px'}}>
                <div>
                    <img style={{width: '160px', height: '160px', borderRadius: '50%'}}
                        src={userLocalStorage.pic}
                        alt="profile-pic"
                    />
                </div>
                <div>
                    <h4>{userLocalStorage.name}</h4>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h6>40 posts</h6>
                        <h6>30 followers</h6>
                        <h6>10 following</h6>
                    </div>
                </div>
            </div>
        
        <div className="file-field input-field" style={{margin: '10px'}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e) => updatePhoto(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input type="text" className="file-path validate"/>
            </div>
        </div>
        
        <div className="gallery">
            {myPosts.map(item => (
                <img
                    key={item._id}
                    className="item"
                    alt="gallery-pic"
                    src={item.photo}
                />
            ))}
        </div>
        
        
        
        
        
        
        
        </div>
     );
}
 
export default Profile;