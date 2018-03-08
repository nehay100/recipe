import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: '',
            postsRef: firebase.database().ref('posts')
        };
    }

    handleChange(event) {
        let field = event.target.name; //which input
        let value = event.target.value; //what value
  
        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    // handling new post details when post is added
    handleNewPost() {
        this.state.postsRef.push({
            url: this.state.url,
            title: this.state.title,
            timestamp: Date.now(),
            creator: firebase.auth().currentUser.uid,
            creator_name: firebase.auth().currentUser.displayName
        })
        this.setState({
            url: '',
            title: ''
        })
        swal({
            title: 'Post added!',
            icon: 'success'
        });
    }

    // renders input and button for a new post
    render() {
        return (
            <div>
                <h1>New Post</h1>
                <input className="form-control mb-2" type="text" name="url" placeholder="Web URL" onChange={(event) => { this.handleChange(event) }} value={this.state.url} />
                <input className="form-control mb-2" type="text" name="title" placeholder="Post title" onChange={(event) => { this.handleChange(event) }} value={this.state.title} />
                <button className="btn btn-primary" onClick={() => this.handleNewPost()}>Add</button>
            </div>
        );
    }
}
export default NewPost;