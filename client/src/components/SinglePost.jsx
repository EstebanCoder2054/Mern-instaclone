import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const SinglePost = ({ posts }) => {

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    let userLocalStorage = JSON.parse(localStorage.getItem('user'));
    setData(posts);
    setUser(userLocalStorage);
  }, []);

  const handleLike = (id) => {
    console.log('ESTE ES EL ID -> ', id);
    
    fetch('/like', {
      method: 'put',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res=>res.json())
      .then(result => {
        const newData = data.map(item => {
          if(item._id == result._id){
            return result;
          }else{
            return item;
          } 
        })
        setData(newData);
      }).catch(error => console.log(error));
  }

  const handleUnlike = (id) => {
    console.log('ESTE ES EL ID -> ', id);
    
    fetch('/unlike', {
      method: 'post',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res=>res.json())
      .then(result => {
        const newData = data.map(item => {
          if(item._id == result._id){
            return result;
          }else{
            return item;
          } 
        })
        setData(newData);
      }).catch(error => console.log(error));
  }

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if(item._id == result._id){
            return result;
          }else{
            return item;
          }
        })
        setData(newData);
      }).catch(error => console.log(error))
  }

  const deletePost = (postId) => {
    fetch(`/deletepost/:${postId}`, {
      method: 'delete',
      headers: {
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res => res.json())
      .then(result => {
      console.log(result);
      const newData = data.filter(item => {
        return item._id !== result._id
      })
      setData(newData);
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      {data.map((element) => {
        return (
          <Fragment key={element._id}>
            <div className="card home-card">
            <h5>
              <Link to={ element.postedBy._id != user._id ? `/profile/${element.postedBy._id}` : `/profile/` }>
                {element.postedBy.name}
              </Link>
              {element.postedBy._id == user._id ? (
                <i className="material-icons" onClick={() => deletePost(element._id)} style={{float: 'right', cursor: 'pointer'}}>delete</i>
              ) : ''}
            </h5>
              <div className="card-image">
                <img
                  alt="feed-pic"
                  src={element.photo === 'no photo' ? 'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg' : element.photo}
                />
              </div>
              <div className="card-content input-field">
                <i className="material-icons" style={{color: "red"}}>favorite</i>
                {element.likes.includes(user._id) ? (
                  <i className="material-icons" style={{cursor: 'pointer'}} onClick={() => handleUnlike(element._id)}>thumb_down</i>
                ) : 
                (
                  <i className="material-icons" style={{cursor: 'pointer'}} onClick={() => handleLike(element._id)}>thumb_up</i>
                )}
                <h6>{element.likes.length} likes</h6>
                <h6>{element.title}</h6>
                <p>{element.body}</p>
                {
                  element.comments.map(record => {
                    return(
                      <h6 style={{fontWeight: 'bold'}} key={record._id}>
                        <p>{record.postedBy.name}: {record.text}</p>
                      </h6>
                    )
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault()
                  makeComment(e.target[0].value, element._id)
                }}>
                  <input type="text" placeholder="add a comment" />
                </form>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default SinglePost;
