import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const Navbar = () => {

    //para poder acceder a la data del GlobalContext
    const { clearUser } = useContext(GlobalContext);

  const renderList = () => {
    
    if(localStorage.getItem('user')){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link 
          onClick={() => 
            {
              localStorage.clear()
              // clearUser()
              window.location.replace('/signin')
            }}
          to="/">Logout</Link></li>
      ]
    }else {
      return [
        <li><Link to="/signin">SignIn</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }

  }

    return ( 
        <nav>
        <div className="nav-wrapper white">
          <Link to={localStorage.getItem('user') ? "/" : "/signin"} className="brand-logo left">InstaClone</Link>
          <ul id="nav-mobile" className="right">
            
            { renderList() }

          </ul>
        </div>
      </nav>
     );
}
 
export default Navbar;