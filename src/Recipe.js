import React, { Component } from 'react';
import firebase from 'firebase';
//import moment from 'moment';
//import swal from 'sweetalert';

import ViewMore from './ViewMore';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        };
    }

    componentDidMount() {
        this.recipeRef = firebase.database().ref('recipes').child(this.props.recipeKey);
        this.recipeRef.on('value', (snapshot) => {
            this.setState({
                recipe: snapshot.val(),
            });
        })

        // let commentsRef = firebase.database().ref('comments').child(this.props.postKey)
        // commentsRef.on('value', (snapshot) => {
        //     this.setState({
        //         comments: snapshot.val(),
        //     });
        // })
    }

    // // creates and handles comment details
    // addComment() {
    //     let commentsRef = firebase.database().ref('comments').child(this.props.postKey)
    //     commentsRef.push({
    //         text: this.state.comment,
    //         timestamp: Date.now(),
    //         creator: firebase.auth().currentUser.uid,
    //         creator_name: firebase.auth().currentUser.displayName
    //     })
    //     this.setState({
    //         comment: '',
    //     })
    //     swal({
    //         title: 'Comment added!',
    //         icon: 'success'
    //     });
    // }

    likeMessage() {
        let likeRef = firebase.database().ref('recipes/' + this.props.recipeKey + '/likes');
        //console.log(likeRef);
        likeRef.transaction((currentClicks) => {
            console.log(currentClicks);
            return (currentClicks || 0) + 1;
        });
    }

    // renders post with all like/coment details
    render() {
        // let commentKeys = [];
        // if (this.state.comments != null) {
        //     commentKeys = Object.keys(this.state.comments);
        // }
        // let commentArray = commentKeys.map((key) => { //map array of keys into array of tasks
        //     let comment = this.state.comments[key]; //access element at that key
        //     comment.key = key; //save the key for later referencing!
        //     return comment; //the transformed object to store in the array
        // });
        return (
            <div className="card mt-8" width="18rem">
                <img className="card-img-top" src={this.state.recipe.imgURL} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.state.recipe.title}</h5>
                    <p className="card-text d-inline mr-3">{"Author: " + this.state.recipe.author}</p>
                    <p className="card-text d-inline mr-3">{"Calories: " + this.state.recipe.calories}</p>
                    <p className="card-text d-inline mr-3">{"Duration: " + this.state.recipe.duration}</p>
                    <p className="card-text mt-3">{this.state.recipe.description}</p>
                    <p className="card-text">{"Ingredients: " + this.state.recipe.ingredients}</p>
                    <a href="#/viewmore" className="btn btn-primary" onClick={this.props.updateSelectedRecipe(this.props.recipeKey)}>View More</a>
                    <button className="btn btn-primary ml-3" onClick={() => this.likeMessage()}>{this.state.recipe.likes + " likes"}</button>
                </div>
            </div>
        );
    }
}

export default Recipe;