import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isTimer: false,
      secondsLeft: this.props.time
    };

    this.startTimer = this.startTimer.bind(this);
  }

  // Sets the time and counts down second by second
  startTimer() {
    setTimeout(() => {
      let newProgress = this.state.progress + 1;
      this.setState({
        progress: newProgress,
        secondsLeft: this.state.secondsLeft - 1
      });
      if (newProgress < this.props.time) {
        this.startTimer();
      }
    }, 1000);
  }

  /**
   * Parses seconds to hours, minutes, seconds
   * Copied from https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
   * @param {*} d time in seconds
   */
  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  render() {
    return (
      <div>
        {!this.state.isTimer && (
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={()=> {
            this.setState({progress: this.props.time, isTimer: true});
            // This is kinda janky BUT it allows for the cool animation where the button turns into the progress bar
            setTimeout(() => {
              this.setState({progress: 0});
              this.startTimer();
            }, 1)}}>

            Start timer: {this.secondsToHms(this.state.secondsLeft)}
          </button>
        )}

        {this.state.isTimer &&
          this.state.secondsLeft > 0 && (
            <div className="progress" style={{ height: 48 + "px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: this.state.progress / this.props.time * 100 + "%" }}
                aria-valuenow={this.state.progress.toString()}
                aria-valuemin="0"
                aria-valuemax={this.props.time.toString()}
              >
                {this.secondsToHms(this.state.secondsLeft)}
              </div>
            </div>
        )}

        {(this.state.isTimer && this.state.secondsLeft) === 0 && (
          <div className="progress" style={{ height: 48 + "px" }}>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: 100 + "%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Timer done!
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Clock;
