import React from 'react';

class CurrentForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitCurrent = this.submitCurrent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetCurrentForm = this.resetCurrentForm.bind(this);

    this.state = {
      C: false, 'C#/Db': false, D: false, 'D#/Eb': false, E: false, F: false,
      'F#/Gb': false, G: false, 'G#/Ab': false, A: false, 'A#/Bb': false, B: false,
      }

  }

  componentDidUpdate() {
    if(this.props.clearAll) {
      this.resetCurrentForm();
    }
  }

  handleChange(input) {
    this.setState({
      [input]: !this.state[input],
    }, () => {
      this.submitCurrent();
    });
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

  resetCurrentForm() {
    this.setState({
      C: false, 'C#/Db': false, D: false, 'D#/Eb': false, E: false, F: false,
      'F#/Gb': false, G: false, 'G#/Ab': false, A: false, 'A#/Bb': false, B: false,
    })
  }

  render() {
    const { C, 'C#/Db': Db, D, 'D#/Eb': Eb, E, F, 'F#/Gb': Gb, G, 'G#/Ab': Ab, A, 'A#/Bb': Bb, B } = this.state;
    return (
      <div className="current-form">
        <h2 id="current-form-title">Current</h2>
        <form className="checkbox-container">
          <div
            className="note-checkbox"
            value="C"
            id={`current-${C}`}
            onClick={() => {this.handleChange("C")}}>C
          </div>
          <div
            className="note-checkbox"
            value="Db"
            id={`current-${Db}`}
            onClick={() => {this.handleChange("C#/Db")}}>C#/Db
          </div>
          <div
            className="note-checkbox"
            value="D"
            id={`current-${D}`}
            onClick={() => {this.handleChange("D")}}>D
          </div>
          <div
            className="note-checkbox"
            value="Eb"
            id={`current-${Eb}`}
            onClick={() => {this.handleChange("D#/Eb")}}>D#/Eb
          </div>
          <div
            className="note-checkbox"
            value="E"
            id={`current-${E}`}
            onClick={() => {this.handleChange("E")}}>E
          </div>
          <div
            className="note-checkbox"
            value="F"
            id={`current-${F}`}
            onClick={() => {this.handleChange("F")}}>F
          </div>
          <div
            className="note-checkbox"
            value="Gb"
            id={`current-${Gb}`}
            onClick={() => {this.handleChange("F#/Gb")}}>F#/Gb
          </div>
          <div
            className="note-checkbox"
            value="G"
            id={`current-${G}`}
            onClick={() => {this.handleChange("G")}}>G
          </div>
          <div
            className="note-checkbox"
            value="Ab"
            id={`current-${Ab}`}
            onClick={() => {this.handleChange("G#/Ab")}}>G#/Ab
          </div>
          <div
            className="note-checkbox"
            value="A"
            id={`current-${A}`}
            onClick={() => {this.handleChange("A")}}>A
          </div>
          <div
            className="note-checkbox"
            value="Bb"
            id={`current-${Bb}`}
            onClick={() => {this.handleChange("A#/Bb")}}>A#/Bb
          </div>
          <div
            className="note-checkbox"
            value="B"
            id={`current-${B}`}
            onClick={() => {this.handleChange("B")}}>B
          </div>
          {/* <input type="button" value="SUBMIT" onClick={this.submitCurrent}></input> */}
        </form>
        <input
          id="form-reset-button"
          type="button"
          value="RESET CURRENT"
          onClick={() => {
            this.props.resetCurrent();
            this.resetCurrentForm();
            }}>
        </input>
      </div>
    );
  }
}

export default CurrentForm;