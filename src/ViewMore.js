import React, { Component } from 'react';
import firebase from 'firebase';

import Steps from './Steps';

class ViewMore extends Component {
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

    render() {
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
                    {/* <a href="#/steps" className="btn btn-primary" onClick={() => this.props.updateSelectedRecipe(this.props.recipeKey)}>Steps</a> */}
                </div>
            </div>
        );
    }
}

export default ViewMore;