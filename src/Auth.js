import React, { Component } from 'react';
import firebase from 'firebase';
//import SignUp from './SignUp';
// import './Auth.css';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            errorMessage: '',
            email: '',
            password: '',
            username: '',
            //signup: false
        };
    }
    componentDidMount() {
        this.stopWatchingAuth = firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.setState({
                    user: firebaseUser,
                    errorMessage: '',
                    email: '',
                    password: '',
                    username: ''
                });
            }
            else {
                this.setState({ user: null }); //null out the saved state
            }
        })
    }

    handleSignUp() {
        /* Create a new user and save their information */
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(firebaseUser => {
                //include information (for app-level content)
                let profilePromise = firebaseUser.updateProfile({
                    displayName: this.state.username,
                }); //return promise for chaining
                
                this.addMember();

                return profilePromise;
            })
            .then(firebaseUser => {
                this.setState({
                    user: firebase.auth().currentUser
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err.message })
            });
    }

    addMember() {
        let memberRef = firebase.database().ref('members');     // adds new members to database
        memberRef.push({
            username: this.state.username
        });
    }

    handleSignIn() {
        //A callback function for logging in existing users
  
  
        /* Sign in the user */
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((err) => {
                console.log(err)
                this.setState({ errorMessage: err.message })
            });
  
    }
  
    handleSignOut() {
        this.setState({ errorMessage: null }); //clear old error
  
        /* Sign out the user, and update the state */
        firebase.auth().signOut()
            .then(() => {
                this.setState({ user: null }); //null out the saved state
            })
            .catch((err) => {
                console.log(err)
                this.setState({ errorMessage: err.message })
            })
    }
  
    handleChange(event) {
        let field = event.target.name; //which input
        let value = event.target.value; //what value
  
        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }
  
    // renders form for sign up/login
    render() {
            return (
                <div className="container">
                    {this.state.errorMessage &&
                        <p className="alert alert-danger">{this.state.errorMessage}</p>
                    }
                    <div className="page-header">
                        <h1>recip.e</h1>
                    </div>

    
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={(event) => { this.handleChange(event) }}
                        />
                    </div>
    
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={(event) => { this.handleChange(event) }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="username" className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={(event) => { this.handleChange(event) }}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary mr-2" onClick={() => this.handleSignUp()}>
                            Sign Up
                        </button>
                        <button className="btn btn-success mr-2" onClick={() => this.handleSignIn()}>
                            Sign In
                        </button>
                    </div>
                </div>
            );
    }
  }
  
  export default Auth;