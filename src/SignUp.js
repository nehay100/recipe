import React, { Component } from 'react';
import firebase from 'firebase';
import {Form, FormGroup, Col, FormControl} from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            photoURL: '',
            members: []
        }
    }

    componentDidMount() {
        this.memberRef = firebase.database().ref('members');
        this.memberRef.on('value', (snapshot) => {
            let members = snapshot.val();
            this.setState({
                members: members
            });
        });
    }

    // Add a handleSignUp() method
    handleSignUp(email, password, username) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((firebaseUser) => {
                console.log('User created: ' + firebaseUser.uid);
                this.setState({
                    user: firebase.auth().currentUser
                });
                
                this.addMember();
                return firebaseUser.updateProfile({
                    displayName: username
                });

            })
            .catch((error) => {
                console.log(error.message);
                this.setState({
                    errorMessage: error.message
                });
            });
    }

    addMember() {
        let member = {
            username: this.state.username,
            // photoURL: 
        }
        this.memberRef.push(member);
    }

    // Add a method to handle changes to any input element
    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        console.log(value, field);
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    render() {  
        return (
            <div>
                {this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                }
                <h4>Sign Up</h4>
                
                {
                    console.log("i'm here")
                    ['email', 'password', 'username'].map((input) => {
                        return <input
                            name={input}
                            className="validate"
                            placeholder={input}
                            type={input === 'username' ? 'text' : input}
                            onChange={(event) => {this.handleChange(event)}}
                        />
                    })
                }
                <RaisedButton primary={true} onClick={() => {
                        this.handleSignUp(this.state.email, this.state.password, this.state.username); 
                    }}>
                    Sign Up
                </RaisedButton>
                {/* <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Enter Email" onChange={(event) => this.handleChange(event)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Enter Password" onChange={(event) => this.handleChange(event)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalUsername">
                        <Col sm={2}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl type="username" placeholder="Enter Username" onChange={(event) => this.handleChange(event)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                this.handleSignUp(this.state.email, this.state.password, this.state.username); 
                            }}>Sign Up</button>
                        </Col>
                    </FormGroup>
                </Form> */}
                            {/* // <div className="input-group mb-3">
                            //     <div className="input-group-prepend">
                            //     {console.log("near span")}
                            //         <span className="input-group-text" id="inputGroup-sizing-default">{input}</span>
                            //     </div>
                            //     <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                            //         onChange={(event) => {this.handleChange(event)}}
                            //     />
                            // </div> */}
                                    
                

     
            </div>
        );
    }
}