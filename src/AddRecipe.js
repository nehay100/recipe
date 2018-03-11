import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            calories: '',
            duration: 0,
            imgURL: "",
            ingredients: '',
            instruction: '',
            clock: -1,
            steps: [],
            recipesRef: firebase.database().ref('recipes')
        };
    }

    componentDidMount() {
        // Create references to the 'imgs' endpoings on database and storage
        this.dataRef = firebase.database().ref('imgs/')
        this.storageRef = firebase.storage().ref('imgs/')

        // When the database 'value' changes, change the state of `imgs`
        this.dataRef.on('value', (snapshot) => {
            console.log('snapshot', snapshot.val());
            this.setState({
                imgs: snapshot.val() || {}
            })
        })
    }

    // handling new post details when post is added
    handleNewRecipe() {
        this.state.recipesRef.push({
            author: firebase.auth().currentUser.displayName,
            title: this.state.title,
            description: this.state.description,
            calories: this.state.calories,
            duration: this.state.duration,
            imgURL: this.state.img,
            ingredients: this.state.ingredients,
            procedure: this.state.steps,
            ratings: [],
            likes: 0,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        })

        this.setState({
            title: '',
            description: '',
            calories: '',
            duration: 0,
            imgURL: "",
            ingredients: '',
            instruction: '',
            clock: -1,
            steps: []
        })

        swal({
            title: 'Recipe added!',
            icon: 'success'
        });
    }

    fileChange(event) {
        // Get the uploaded file and its name
        let name = event.target.files[0].name;
        let file = event.target.files[0];

        // Create a new child reference (on storage) for the image using its name
        // Then, `put` the file contents. *then()*
        // Using the `snapshot.downloadURL` value, push a new element into 
        // The _database_ `imgs` reference
        let imgRef = this.storageRef.child(name);
        imgRef.put(file).then((snapshot) => {
            this.dataRef.push({
                url: snapshot.downloadURL
            })

            this.setState({
                img: snapshot.downloadURL
            })
        });

    }

    addStep(event) {
        let step = {
            instruction: this.state.instruction,
            clock: this.state.clock
        }
        this.state.steps.push(step);
        console.log(this.state.steps);
        this.clearStep();
    }
    
    clearStep() {
        this.setState({
            instruction: '',
            clock: -1
        });
        document.forms['add'].reset();
    }

    // renders input and button for a new post
    render() {
        return (
            <div>
                <h1>Add a Recipe</h1>
                <form name="add">
                    <h4>Recipe Stats</h4>
                    <input className="form-control mb-2" type="text" placeholder="Recipe Title" onChange={(event) => { this.setState({title: event.target.value}) }}/>
                    <input className="form-control mb-2" type="text" placeholder="Short Description" onChange={(event) => { this.setState({description: event.target.value}) }}/>
                    <input className="form-control mb-2" type="text" placeholder="Duration (minutes)" onChange={(event) => { this.setState({duration: event.target.value}) }}/>
                    <input className="form-control mb-2" type="text" placeholder="Calorie Intake" onChange={(event) => { this.setState({calories: event.target.value}) }}/>
                    <h4 className="pt-3">Add Recipe Image</h4>
                    <input type="file" onChange={(e) => this.fileChange(e)}/>
                    <h4 className="pt-4">Ingredients</h4>
                    <div className="form-group">
                        {/* <label htmlFor="exampleFormControlTextarea1">Ingredients</label> */}
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(event) => { this.setState({ingredients: event.target.value}) }}></textarea>
                    </div>
                    <h4 className="pt-3">Add a Step to Recipe Procedure</h4>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Instructions</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(event) => { this.setState({instruction: event.target.value}) }}></textarea>
                        
                        <label className="pt-2" htmlFor="exampleFormControlTextarea1">If this step requires a timer, enter that time in seconds. If not enter -1.</label>
                        <input className="form-control mb-2" type="text" placeholder="Clock Duration" onChange={(event) => { this.setState({clock: event.target.value}) }}/>
                        <div className="form-group">
                            <button className="btn btn-success mr-3" onClick={() => this.addStep()}>Add Step</button>
                            <button className="btn btn-info mr-3" onClick={() => this.clearStep()}>Clear</button>
                        </div>
                        
                    </div>
                    
                    <button className="btn btn-primary" onClick={() => this.handleNewRecipe()}>Add Recipe</button>
                </form>
            </div>
        );
    }
}
export default AddRecipe;