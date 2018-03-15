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
    }

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
        return (
          <div className="card">
            <img className="card-img-top" src={this.state.recipe.imgURL} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{this.state.recipe.title}</h5>
              <p className="card-subtitle mb-2 text-muted">{this.state.recipe.description}</p>
              <p className="card-text">{"Author: " + this.state.recipe.author}</p>
              <p className="card-text">{"Calories: " + this.state.recipe.calories}</p>
              <p className="card-text">{"Duration: " + this.state.recipe.duration + " minutes"}</p>
              <p className="card-text">{"Ingredients: " + this.state.recipe.ingredients}</p>
              <a href="#/viewmore" className="btn btn-primary" onClick={() => this.props.updateSelectedRecipe(this.props.recipeKey)}>View More</a>
              <button className="btn btn-primary ml-3" onClick={() => this.likeMessage()}>
                {/* These two statements make sure it goes between "like" and "likes" correctly */}
                {this.state.recipe.likes === 1 && this.state.recipe.likes + " like"}
                {this.state.recipe.likes !== 1 && this.state.recipe.likes + " likes"}
              </button>
            </div>
          </div>);
    }
}

export default Recipe;