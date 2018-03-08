import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';
import swal from 'sweetalert';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            likes: {},
            comments: {},
            comment: '',
        };
    }

    componentDidMount() {
        let postRef = firebase.database().ref('posts').child(this.props.postKey)
        postRef.on('value', (snapshot) => {
            this.setState({
                post: snapshot.val(),
            });
        })

        let likesRef = firebase.database().ref('likes').child(this.props.postKey)
        likesRef.on('value', (snapshot) => {
            this.setState({
                likes: snapshot.val(),
            });
        })

        let commentsRef = firebase.database().ref('comments').child(this.props.postKey)
        commentsRef.on('value', (snapshot) => {
            this.setState({
                comments: snapshot.val(),
            });
        })

    }

    // checks and updates liking status
    likePost() {
        if (! _.has(this.state.likes, firebase.auth().currentUser.uid)) {
            let likesRef = firebase.database().ref('likes').child(this.props.postKey)
            likesRef.update({
                [firebase.auth().currentUser.uid]: true
            })   
        } else {
            console.log(this.state.likes);
            swal("You've already liked this :^)");
        }
    }

    handleChange(event) {
        let field = event.target.name; //which input
        let value = event.target.value; //what value
  
        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    // creates and handles comment details
    addComment() {
        let commentsRef = firebase.database().ref('comments').child(this.props.postKey)
        commentsRef.push({
            text: this.state.comment,
            timestamp: Date.now(),
            creator: firebase.auth().currentUser.uid,
            creator_name: firebase.auth().currentUser.displayName
        })
        this.setState({
            comment: '',
        })
        swal({
            title: 'Comment added!',
            icon: 'success'
        });
    }

    // renders post with all like/coment details
    render() {
        let commentKeys = [];
        if (this.state.comments != null) {
            commentKeys = Object.keys(this.state.comments);
        }
        let commentArray = commentKeys.map((key) => { //map array of keys into array of tasks
            let comment = this.state.comments[key]; //access element at that key
            comment.key = key; //save the key for later referencing!
            return comment; //the transformed object to store in the array
        });
        return (
            <div className="card m-4 p-4">
                <div className="card-block">
                    <a className="card-title" href={this.state.post.url}>{this.state.post.title}</a>
                    <p className="card-text">Posted by {this.state.post.creator_name} {moment(this.state.post.timestamp).fromNow()}.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => this.likePost()}>Like</button>
                    <span className="card-text"> This post has {(this.state.likes != null) ? Object.keys(this.state.likes).length : 'no'} like(s).</span>
                </div>
                <div className="mt-4">
                    {commentArray.map((comment) => {
                        return <p key={comment.key}>{comment.text} <span className="text-muted">By {comment.creator_name}, {moment(comment.timestamp).fromNow()}.</span></p>
                    })}
                    <textarea rows="3" className="form-control" onChange={(event) => this.handleChange(event)} name="comment" value={this.state.comment}></textarea>
                    <button className="btn btn-success btn-sm mt-3" onClick={() => this.addComment()}>Add Comment</button>
                </div>
            </div>
        );
    }
}
export default Post;