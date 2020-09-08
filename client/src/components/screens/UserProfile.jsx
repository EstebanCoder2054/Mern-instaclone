import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {

    const [profileUser, setProfileUser] = useState({});
    const [profilePosts, setProfilePosts] = useState([]);

    const { userid } = useParams(); 
    
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const response = await axios.get(`/user/${userid}`, {
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        })
        console.log('este es el response USER PROFILE -> ', response);
        setProfileUser(response.data.user);
        setProfilePosts(response.data.posts);
    }

    console.log('user -> ', profileUser);
    console.log('posts -> ', profilePosts);

    return ( 
        <>
            <div style={{maxWidth: '950px', margin: '0px auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', margin: '18px 0px'}}>
                <div>
                    <img style={{width: '160px', height: '160px', borderRadius: '50%'}}
                        src={profileUser.pic}
                        alt="profile-pic"
                    />
                </div>
                <div>
                    <h4>{profileUser.name}</h4>
                    <h5>{profileUser.email}</h5>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h6>{profilePosts.length} posts</h6>
                        <h6>Acá se puede implemenetar una descripción</h6>
                    </div>
                </div>
            </div>
        
        <div className="gallery">
            {profilePosts.map(item => (
                <img
                    key={item._id}
                    className="item"
                    alt="gallery-pic"
                    src={item.photo}
                />
            ))}
        </div>
        
        </div>    
    </>
    );
}
 
export default UserProfile;