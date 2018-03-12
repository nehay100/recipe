import React, { Component } from 'react';
import firebase from 'firebase';

class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        };
    }

    componentDidMount() {
        // this.recipeRef = firebase.database().ref('recipes').child(this.props.recipeKey);
        // this.recipeRef.on('value', (snapshot) => {
        //     this.setState({
        //         recipe: snapshot.val(),
        //     });
        // })
    }

    render() {
        return (
            <div>
                <h1>Steps</h1>
            </div>
        );
    }
}

export default Steps;