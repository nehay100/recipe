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
        this.recipeRef = firebase.database().ref('recipes').child(this.props.key);
        this.recipeRef.on('value', (snapshot) => {
            this.setState({
                recipe: snapshot.val(),
            });
        })
    }

    render() {
        return (
            <div className="card mt-8" width="18rem">
                <h1>ViewMore</h1>
                {/* <img className="card-img-top" src={this.state.recipe.imgURL} alt="Card image cap" /> */}
                <div className="card-body">
                    {/* <h5 className="card-title">{this.state.recipe.title}</h5>
                    <p className="card-text d-inline mr-3">{"Author: " + this.state.recipe.author}</p>
                    <p className="card-text d-inline mr-3">{"Calories: " + this.state.recipe.calories}</p>
                    <p className="card-text d-inline mr-3">{"Duration: " + this.state.recipe.duration}</p>
                    <p className="card-text mt-3">{this.state.recipe.description}</p>
                    <p className="card-text">{"Ingredients: " + this.state.recipe.ingredients}</p> */}
                    <a href="#/steps" className="btn btn-primary">Steps</a>
                </div>
            </div>
        );
    }
}

export default ViewMore;