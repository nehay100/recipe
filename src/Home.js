import React, { Component } from 'react';
import firebase from 'firebase';
import Recipe from './Recipe';
import _ from 'lodash';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            filteredAllergens: [],
        };
    }
    // retrieves all posts for state
    componentDidMount() {
        let recipeRef = firebase.database().ref('recipes').orderByChild('timestamp');
        recipeRef.on('value', (snapshot) => {
            this.setState({
                recipes: snapshot.val()
            });
        });
    }

    updateAllergenFilter(e) {
        let newFilter = this.state.filteredAllergens;
        if (e.target.checked) {
            newFilter.push(e.target.value);
        } else {
            let index = newFilter.indexOf(e.target.value);
            newFilter.splice(index, 1);
        }
        this.setState({filteredAllergens: newFilter});
    }

    // renders all posts
    render() {
        let allergens = ['Milk', 'Eggs', 'Nuts', 'Peanuts', 'Shellfish', 'Wheat', 'Soy', 'Fish'];
        // let filteredRecipes = _.map(this.state.recipes, recipe => {
        //     return (_.intersection(this.state.filteredAllergens, recipe.allergies).length > 0)
        // });
        let filteredRecipes = _.reduce(this.state.recipes, (result, value, key) => {
            if (_.intersection(_.map(this.state.filteredAllergens, _.lowerFirst), value.allergies).length === 0) {
                result.push(key);
            }
            return result;
        }, []);
        console.log(filteredRecipes);
        return <div>
            <div className="container">
            <h1>Home</h1>
            <p>Filter common allergens:</p>

              <fieldset onChange={(e) => {this.updateAllergenFilter(e)}}>
                {allergens.map(a => {
                    return <div className="form-check form-check-inline" key={a}>
                        <input className="form-check-input" name="allergens" type="checkbox" value={a} id="{'allergen-' + a}">
                        </input>
                        <label className="form-check-label" htmlFor={'allergen-' + a}>
                            {a}
                        </label>
                    </div>;
                })}
              </fieldset>
              <div className="row mt-4">
              {filteredRecipes.map(key => {
                  return <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4" key={key}>
                      <Recipe recipeKey={key} updateSelectedRecipe={this.props.updateSelectedRecipe} />
                    </div>;
                })}
              </div>
            </div>
          </div>;
    }
}
export default Home;