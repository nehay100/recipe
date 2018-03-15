import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';
import moment from 'moment';

import Steps from './Steps';

class ViewMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {},
            comments: {},
            comment: ''
        };
    }

    componentDidMount() {
        this.recipeRef = firebase.database().ref('recipes').child(this.props.recipeKey);
        this.recipeRef.on('value', (snapshot) => {
            this.setState({
                recipe: snapshot.val(),
            });
        })

        let commentsRef = firebase.database().ref('comments').child(this.props.recipeKey)
        commentsRef.on('value', (snapshot) => {
            this.setState({
                comments: snapshot.val(),
            });
        })
    }

    // creates and handles comment details
    addComment() {
        let commentsRef = firebase.database().ref('comments').child(this.props.recipeKey)
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

    handleChange(event) {
        let field = event.target.name; //which input
        let value = event.target.value; //what value
  
        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

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
            <div className="card mt-8" width="18rem">
                <h1>More Information!</h1>
                <img className="card-img-top" src={this.state.recipe.imgURL} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.state.recipe.title}</h5>
                    <p className="card-subtitle mb-2 text-muted">{this.state.recipe.description}</p>
                    <p className="card-text">{"Author: " + this.state.recipe.author}</p>
                    <p className="card-text">{"Calories: " + this.state.recipe.calories}</p>
                    <p className="card-text">{"Duration: " + this.state.recipe.duration + " minutes"}</p>
                    <p className="card-text">{"Ingredients: " + this.state.recipe.ingredients}</p>

                    <p className="card-text">{"Genres: " + this.state.recipe.genres}</p>
                    <p className="card-text">{"Total Likes: " + this.state.recipe.likes}</p>
                    <p className="card-text">{"Ratings: " + this.state.recipe.ratings}</p>
                    <p className="card-text">{"Allergies: " + this.state.recipe.allergies}</p>
                    <a href="#/steps" className="btn btn-primary">Steps</a>
                    <div className="mt-4">
                    {commentArray.map((comment) => {
                        return <p key={comment.key}>{comment.text} <span className="text-muted">By {comment.creator_name}, {moment(comment.timestamp).fromNow()}.</span></p>
                    })}
                    <textarea rows="3" className="form-control" onChange={(event) => this.handleChange(event)} name="comment" value={this.state.comment}></textarea>
                    <button className="btn btn-success btn-sm mt-3" onClick={() => this.addComment()}>Add Comment</button>
                </div>
                </div>
            </div>
        );
    }
}

export default ViewMore;