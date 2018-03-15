import React, { Component } from "react";
import firebase from "firebase";
import Recipe from "./Recipe";

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRecipes: [],
      myRecipesRef: null
    };
  }

  // retrieves user's posts for state
  componentDidMount() {
    let myRecipesRef = firebase
      .database()
      .ref("recipes")
      .orderByChild("author")
      .equalTo(firebase.auth().currentUser.displayName);
    myRecipesRef.on("value", snapshot => {
      this.setState({
        myRecipes: snapshot.val()
      });
    });
  }

  // renders all user's posts
  render() {
    let recipeKeys = [];
    if (this.state.myRecipes != null) {
      recipeKeys = Object.keys(this.state.myRecipes);
    }
    return (
      <div>
        <h1>My Recipes</h1>
        <div className="container">
          <div className="row">
            {recipeKeys.map(recipeKey => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <Recipe recipeKey={recipeKey} key={recipeKey} updateSelectedRecipe={this.props.updateSelectedRecipe} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyRecipes;
