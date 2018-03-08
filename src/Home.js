import React, { Component } from 'react';
import firebase from 'firebase';
import Post from './Post';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            postsRef: null,
        };
    }
    // retrieves all posts for state
    componentDidMount() {
        let postsRef = firebase.database().ref('posts').orderByChild('timestamp')
        postsRef.on('value', (snapshot) => {
            this.setState({
                posts: snapshot.val(),
            });
        })
    }

    // renders all posts
    render() {
        let postKeys = [];
        if (this.state.posts != null) {
            postKeys = Object.keys(this.state.posts);
        }
        return (
            <div>
                <h1>Home</h1>
                {postKeys.map((postKey) => {
                    return <Post postKey={postKey} key={postKey} /> 
                })}
            </div>
        );
    }
}
export default Home;