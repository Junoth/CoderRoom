import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import './App.css';
import ModalConductor from './components/modal/ModalConductor';
import { clearCurrentProfile } from './actions/profileActions';
import NotFound from './components/not-found/NotFound';

import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import io from "socket.io-client";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile);
    // Redirect to Login
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.socket = io('localhost:5000');
  }

  componentDidMount() {
    addResponseMessage("Welcome! You've joined the chat room");
  }

  handleNewUserMessage = (newMessage) => {
    this.socket.emit('SEND_MESSAGE', {
      message: newMessage
    })
  }

  render() {

    this.socket.on('RECEIVE_MESSAGE', function(data){
      addResponseMessage(data.message);
    });

     return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar/>
            <Widget
              handleNewUserMessage={this.handleNewUserMessage}
              title="Chatting room"
              subtitle="Communicate with online coders"
            />
            <ModalConductor />
            <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Route exact path="/feed" component={Posts} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/not-found" component={NotFound} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-experience" component={AddExperience} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-education" component={AddEducation} />
                </Switch>
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
