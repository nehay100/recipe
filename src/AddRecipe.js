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
            allergies: [],
            genres: [],
            clock: -1,
            steps: [],
            recipesRef: firebase.database().ref('recipes'),
        };
    }

    componentDidMount() {
        // Create references to the 'imgs' endpoings on database and storage
        this.dataRef = firebase.database().ref('imgs/')
        this.storageRef = firebase.storage().ref('imgs/')

        // When the database 'value' changes, change the state of `imgs`
        this.dataRef.on('value', (snapshot) => {
            this.setState({
                imgs: snapshot.val() || {}
            })
        })
    }

    updateAllergy(allergy) {
        this.state.allergies.push(allergy);
    }

    updateGenre(genre) {
        this.state.genres.push(genre);
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
            ratings: [0],
            allergies: this.state.allergies,
            genres: this.state.genres,
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
                <form>
                    <h4>Recipe Stats</h4>
                    <input className="form-control mb-2" type="text" placeholder="Recipe Title" onChange={(event) => { this.setState({title: event.target.value}) }}/>
                    <input className="form-control mb-2" type="text" placeholder="Short Description" onChange={(event) => { this.setState({description: event.target.value}) }}/>
                    <input className="form-control mb-2" type="number" min="0" placeholder="Duration (minutes)" onChange={(event) => { this.setState({duration: event.target.value}) }}/>
                    <input className="form-control mb-2" type="number" min="0" placeholder="Calorie Intake" onChange={(event) => { this.setState({calories: event.target.value}) }}/>
                    
                    <h7 className="mt-6">Allergy Tags</h7>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("milk")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Milk
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("eggs")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Eggs
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("nuts")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Nuts
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("peanuts")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Peanuts
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("shellfish")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Shellfish
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("wheat")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Wheat
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("soy")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Soy
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateAllergy("fish")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Fish
                        </label>
                    </div>

                    <h7 className="mt-3">Types of Food Tags</h7>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("american")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            American
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("chinese")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Chinese
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("french")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            French 
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("indian")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Indian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("milk")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Italian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("japanese")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Japanese
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("korean")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Korean
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("mediterranean")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Mediterranean
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("mexican")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Mexican
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("thai")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Thai
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {this.updateGenre("other")}}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Other
                        </label>
                    </div>
                    
                    
                    <h4 className="pt-3">Add Recipe Image</h4>
                    <input type="file" onChange={(e) => this.fileChange(e)}/>
                    <h4 className="pt-4">Ingredients</h4>
                    <div className="form-group">
                        {/* <label htmlFor="exampleFormControlTextarea1">Ingredients</label> */}
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(event) => { this.setState({ingredients: event.target.value}) }}></textarea>
                    </div>
                    <h4 className="pt-3">Add a Step to Recipe Procedure</h4>
                    <form name="add">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Instructions</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(event) => { this.setState({instruction: event.target.value}) }}></textarea>
                            
                            <label className="pt-2" htmlFor="exampleFormControlTextarea1">If this step requires a timer, enter that time in minutes.</label>
                            <input className="form-control mb-2" type="number" min="1" placeholder="Clock Duration" onChange={(event) => { 
                                if (event.target.value === "") {
                                    this.setState({clock: -1})
                                } else {
                                    this.setState({clock: event.target.value * 60}) }}
                                }
                            />
                            <div className="form-group">
                                <button className="btn btn-success mr-3" onClick={event => {event.preventDefault(); this.addStep()}}>Add Step</button>
                                <button className="btn btn-info mr-3" onClick={event => {event.preventDefault(); this.clearStep()}}>Clear</button>
                            </div>
                        </div>
                    </form>
                    <button className="btn btn-primary" onClick={event => {event.preventDefault; this.handleNewRecipe()}}>Add Recipe</button>
                </form>
            </div>
        );
    }
}
export default AddRecipe;