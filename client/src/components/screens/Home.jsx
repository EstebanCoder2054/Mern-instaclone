import React, { useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from '../../context/GlobalState';

//components
import SinglePost from "../SinglePost";

const Home = () => {

  //para poder acceder a la data del GlobalContext
  const { posts, getPosts, user } = useContext(GlobalContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      {posts.length !== 0 ? (<SinglePost posts={posts} />) : (<h1>There are no post to show :c</h1>)}
    </div>
  );
};

export default Home;
