import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

// components
import Home from "./components/screens/Home";
import SignIn from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import PageNotFound from "./components/screens/PageNotFound";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";

//Uso del GlobalState
import { GlobalProvider } from './context/GlobalState';

const Routing = () => {
  
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      history.push('/signin')
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/create" component={CreatePost} />
      <Route exact path="/profile/:userid" component={UserProfile} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

function App() {
  //REDUCER - User
  // const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
