import React from 'react';

class TargetForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitTarget = this.submitTarget.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetTargetForm = this.resetTargetForm.bind(this);
    this.state = {
        C: false, 'C#/Db': false, D: false, 'D#/Eb': false, E: false, F: false,
        'F#/Gb': false, G: false, 'G#/Ab': false, A: false, 'A#/Bb': false, B: false,
      }

  }

  componentDidUpdate() {
    if(this.props.clearAll) {
      this.resetTargetForm();
    }
  }

  handleChange(input) {
    this.setState({
      [input]: !this.state[input],
    }, () => {
      this.submitTarget();
    });
  }

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

  resetTargetForm() {
    this.setState({
      C: false, 'C#/Db': false, D: false, 'D#/Eb': false, E: false, F: false,
      'F#/Gb': false, G: false, 'G#/Ab': false, A: false, 'A#/Bb': false, B: false,
    })
  }

  render() {
    const { C, 'C#/Db': Db, D, 'D#/Eb': Eb, E, F, 'F#/Gb': Gb, G, 'G#/Ab': Ab, A, 'A#/Bb': Bb, B } = this.state;
    return (
      <div className="target-form">
        <h2 id="target-form-title">Target Configuration</h2>
        <form className="checkbox-container">
          <div
            className="note-checkbox"
            value="C"
            id={`target-${C}`}
            onClick={() => {this.handleChange("C")}}>C
          </div>
          <div
            className="note-checkbox"
            value="Db"
            id={`target-${Db}`}
            onClick={() => {this.handleChange("C#/Db")}}>C#/Db
          </div>
          <div
            className="note-checkbox"
            value="D"
            id={`target-${D}`}
            onClick={() => {this.handleChange("D")}}>D
          </div>
          <div
            className="note-checkbox"
            value="Eb"
            id={`target-${Eb}`}
            onClick={() => {this.handleChange("D#/Eb")}}>D#/Eb
          </div>
          <div
            className="note-checkbox"
            value="E"
            id={`target-${E}`}
            onClick={() => {this.handleChange("E")}}>E
          </div>
          <div
            className="note-checkbox"
            value="F"
            id={`target-${F}`}
            onClick={() => {this.handleChange("F")}}>F
          </div>
          <div
            className="note-checkbox"
            value="Gb"
            id={`target-${Gb}`}
            onClick={() => {this.handleChange("F#/Gb")}}>F#/Gb
          </div>
          <div
            className="note-checkbox"
            value="G"
            id={`target-${G}`}
            onClick={() => {this.handleChange("G")}}>G
          </div>
          <div
            className="note-checkbox"
            value="Ab"
            id={`target-${Ab}`}
            onClick={() => {this.handleChange("G#/Ab")}}>G#/Ab
          </div>
          <div
            className="note-checkbox"
            value="A"
            id={`target-${A}`}
            onClick={() => {this.handleChange("A")}}>A
          </div>
          <div
            className="note-checkbox"
            value="Bb"
            id={`target-${Bb}`}
            onClick={() => {this.handleChange("A#/Bb")}}>A#/Bb
          </div>
          <div
            className="note-checkbox"
            value="B"
            id={`target-${B}`}
            onClick={() => {this.handleChange("B")}}>B
          </div>
          {/* <input type="button" value="SUBMIT" onClick={this.submitCurrent}></input> */}
        </form>
        <input
          id="form-reset-button"
          type="button"
          value="RESET TARGET"
          onClick={() => {
            this.props.resetTarget();
            this.resetTargetForm();
            }}>
        </input>
      </div>
    );
  }
}

export default TargetForm;