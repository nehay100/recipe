import React, { Component } from "react";
import firebase from "firebase";
import Scrollspy from "react-scrollspy";
import Clock from "./Clock";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        procedure: []
      }
    };
  }

  componentDidMount() {
    this.recipeRef = firebase
      .database()
      .ref("recipes")
      .child(this.props.recipeKey);
    this.recipeRef.on("value", snapshot => {
      this.setState({
        recipe: snapshot.val()
      });
    });
  }

  render() {
    console.log(this.state.recipe);
    let items = [];
    return (
      <div className="row">
        <div className="col-8 order-12">
          <div className="list-group">
            {this.state.recipe.procedure.map(step => {
              let stepNum = `Step-${this.state.recipe.procedure.indexOf(step) + 1}`;
              items.push(stepNum);
              return (
                <div key={stepNum} id={stepNum} className="card" style={{ width: "auto" }}>
                  <div class="card-body">
                    <h5 class="card-title">{stepNum}</h5>
                    <p class="card-text">{step.instruction}</p>
                    {step.clock !== -1 && <Clock time={step.clock} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-4 order-1">
          <div className="list-group">
            <Scrollspy
              items={items}
              currentClassName="list-group-item list-group-item-action active"
              scrolledPastClassName="list-group-item list-group-item-action"
            >
              {this.state.recipe.procedure.map(step => {
                let stepNum = `Step-${this.state.recipe.procedure.indexOf(step) + 1}`;
                console.log(stepNum);
                return (
                  <a key={stepNum} id={stepNum}>
                    {stepNum}
                  </a>
                );
              })}
            </Scrollspy>
          </div>
        </div>
      </div>
    );
  }
}

export default Steps;
