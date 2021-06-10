import React from 'react';

class CurrentForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitCurrent = this.submitCurrent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

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
      this.submitCurrent();
    });
  }

  handleSelectChange(event) {
    const string = event.target.value;
    const stringArr = string.split(' ');
    const collection = [];
    for(let i=0; i<stringArr.length; i++) {
      collection.push(stringArr[i]);
    }
    this.props.globalCurrentConfiguration(collection);
  }

  submitCurrent() {
    const { globalCurrentConfiguration } = this.props;
    const configuration = [];
    for(let key in this.state){
      if (this.state[key] === true) {
        configuration.push(key)
      }
    }
    globalCurrentConfiguration(configuration);
  }


  render() {
    return (
      <div className="CurrentForm">
        <h2>Current Configuration</h2>
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
          <input type="button" value="SUBMIT" onClick={this.submitCurrent}></input>
          <input type="button" value="RESET" onClick={this.props.resetCurrent}></input>
        </form>
        {/* <label htmlFor="current">sample configs: </label>
        <select id="current" onChange={this.handleSelectChange}>
          <option>--</option>
          <option value="C E G B">CM7</option>
          <option value="C E G Bb">C7</option>
          <option value="C Eb G Bb">Cm7</option>
          <option value="C Eb Gb Bb">Cm7b5</option>
        </select> */}
      </div>
    );
  }
}

export default CurrentForm;