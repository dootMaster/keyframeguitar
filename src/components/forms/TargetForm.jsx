import React from 'react';

class TargetForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitTarget = this.submitTarget.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSelectChangeTarget = this.handleSelectChangeTarget.bind(this);

    this.state = {
        C: false, Db: false, D: false, Eb: false, E: false, F: false,
        Gb: false, G: false, Ab: false, A: false, Bb: false, B: false,
      }

  }

  handleChange(event) {
    this.setState({
      [event.target.value]: !this.state[event.target.value],
    }, () => {
      console.log(event.target.value, this.state[event.target.value]);
      this.submitTarget();
    });
  }

  // handleSelectChangeTarget(event) {
  //   const string = event.target.value;
  //   const stringArr = string.split(' ');
  //   const collection = [];
  //   for(let i=0; i<stringArr.length; i++) {
  //     collection.push(stringArr[i]);
  //   }
  //   this.props.globalTargetConfiguration(collection);
  // }

  submitTarget() {
    const { globalTargetConfiguration } = this.props;
    const configuration = [];
    for(let key in this.state){
      if (this.state[key] === true) {
        configuration.push(key)
      }
    }
    globalTargetConfiguration(configuration);
  }


  render() {
    return (
      <div className="TargetForm">
        <h2>Target Configuration</h2>
        <form className="checkboxContainer">
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="C"
              onChange={this.handleChange}>
            </input>
            <label>C</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="Db"
              onChange={this.handleChange}>
            </input>
            <label>Db/C#</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="D"
              onChange={this.handleChange}>
            </input>
            <label>D</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="Eb"
              onChange={this.handleChange}>
            </input>
            <label>Eb/D#</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="E"
              onChange={this.handleChange}>
            </input>
            <label>E</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="F"
              onChange={this.handleChange}>
            </input>
            <label>F</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="Gb"
              onChange={this.handleChange}>
            </input>
            <label>Gb/F#</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="G"
              onChange={this.handleChange}>
            </input>
            <label>G</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="Ab"
              onChange={this.handleChange}>
            </input>
            <label>Ab/G#</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="A"
              onChange={this.handleChange}>
            </input>
            <label>A</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="Bb"
              onChange={this.handleChange}>
            </input>
            <label>Bb/A#</label>
          </div>
          <div>
            <input
              className="noteCheckbox"
              type="checkbox"
              value="B"
              onChange={this.handleChange}>
            </input>
            <label>B</label><br />
          </div>
          <input type="button" value="SUBMIT" onClick={this.submitTarget}></input>
          <input type="button" value="RESET" onClick={this.props.resetTarget}></input>
        </form>
        {/* <label htmlFor="target">sample configs: </label>
        <select id="target" onChange={this.handleSelectChangeTarget}>
          <option value="">--</option>
          <option value="F A C E">FM7</option>
          <option value="F A C Eb">F7</option>
          <option value="F Ab C Eb">Fm7</option>
          <option value="F Ab B Eb">Fm7b5</option>
        </select> */}
      </div>
    );
  }
}

export default TargetForm;