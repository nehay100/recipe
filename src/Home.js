import React, { Component } from 'react';
import firebase from 'firebase';
import Recipe from './Recipe';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
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

    // renders all posts
    render() {
        return (
            <div>
                <h1>Home</h1>
                {
                    Object.keys(this.state.recipes).map((key) => {
                        return <Recipe recipeKey={key}/> 
                    })
                }
            </div>
        );
    }
}
export default Home;