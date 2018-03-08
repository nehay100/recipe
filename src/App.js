import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'firebase';
import bootstrap from 'bootstrap';
import Auth from './Auth';
import Home from './Home';
import NewPost from './NewPost';
import MyRecipes from './MyRecipes';
import About from './About';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            email: '',
            password: '',
            username: ''
        };
    }

    handleSignOut() {
    this.setState({ errorMessage: null }); //clear old error

    /* Sign out the user, and update the state */
    firebase.auth().signOut()
        .catch((err) => {
            console.log(err)
            this.setState({ errorMessage: err.message });
        });
    }

    componentDidMount() {
        // Authentication
        this.stopWatchingAuth = firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.setState({
                    user: firebaseUser,
                    errorMessage: '',
                    loaded: true
                });
            }
            else {
                this.setState({ user: null, loaded: true }); //null out the saved state
            }
        });
    }
    render() {
        return (
        <div>
            {(this.state.user && this.state.loaded) &&
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">recip.e</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/my-recipes">My Recipes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/post">+</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => this.handleSignOut()}>Sign out</a>
                        </li>
                        </ul>
                    </div>
                    </nav>
                    
                    <Router>
                    <div className="container">
                        <Route exact path="/" component={Home} />
                        <Route path="/post" component={NewPost} />
                        <Route path="/my-recipes" component={MyRecipes} />
                        <Route path="/about" component={About} />
                    </div>
                    </ Router>
                </div>
            }
            {
                (!this.state.user && this.state.loaded) &&
                <Auth />
            }
        </div>
        );
    }
}

export default App;
