import React, { Component } from 'react';
import firebase from 'firebase';
import Post from './Post';

class MyRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myPosts: [],
            myPostsRef: null,
        };
    }

    // retrieves user's posts for state
    componentDidMount() {
        let myPostsRef = firebase.database().ref('posts').orderByChild('creator').equalTo(firebase.auth().currentUser.uid)
        myPostsRef.on('value', (snapshot) => {
            this.setState({
                myPosts: snapshot.val(),
            });
        })
    }

    // renders all user's posts
    render() {
        let postKeys = [];
        if (this.state.myPosts != null) {
            postKeys = Object.keys(this.state.myPosts);
        }
        return (
            <div>
                <h1>My Posts</h1>
                {postKeys.map((postKey) => {
                    return <Post postKey={postKey} key={postKey} /> 
                })}
            </div>
        );
    }
}
export default MyRecipes;