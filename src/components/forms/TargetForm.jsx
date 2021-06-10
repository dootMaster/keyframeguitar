import React from 'react';

class TargetForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitTarget = this.submitTarget.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetTargetForm = this.resetTargetForm.bind(this);
    this.state = {
        C: false, Db: false, D: false, Eb: false, E: false, F: false,
        Gb: false, G: false, Ab: false, A: false, Bb: false, B: false,
      }

  }

  handleChange(input) {
    this.setState({
      [input]: !this.state[input],
    }, () => {
      console.log(input, this.state[input]);
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
      C: false, Db: false,
      D: false, Eb: false,
      E: false, F: false,
      Gb: false, G: false,
      Ab: false, A: false,
      Bb: false, B: false,
    })
  }

  render() {
    const { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B } = this.state;
    return (
      <div className="TargetForm">
        <h2>Target Configuration</h2>
        <form className="checkboxContainer">
          <div
            className="noteCheckbox"
            value="C"
            id={`target${C}`}
            onClick={() => {this.handleChange("C")}}>C
          </div>
          <div
            className="noteCheckbox"
            value="Db"
            id={`target${Db}`}
            onClick={() => {this.handleChange("Db")}}>Db/C#
          </div>
          <div
            className="noteCheckbox"
            value="D"
            id={`target${D}`}
            onClick={() => {this.handleChange("D")}}>D
          </div>
          <div
            className="noteCheckbox"
            value="Eb"
            id={`target${Eb}`}
            onClick={() => {this.handleChange("Eb")}}>Eb/D#
          </div>
          <div
            className="noteCheckbox"
            value="E"
            id={`target${E}`}
            onClick={() => {this.handleChange("E")}}>E
          </div>
          <div
            className="noteCheckbox"
            value="F"
            id={`target${F}`}
            onClick={() => {this.handleChange("F")}}>F
          </div>
          <div
            className="noteCheckbox"
            value="Gb"
            id={`target${Gb}`}
            onClick={() => {this.handleChange("Gb")}}>Gb/F#
          </div>
          <div
            className="noteCheckbox"
            value="G"
            id={`target${G}`}
            onClick={() => {this.handleChange("G")}}>G
          </div>
          <div
            className="noteCheckbox"
            value="Ab"
            id={`target${Ab}`}
            onClick={() => {this.handleChange("Ab")}}>Ab/G#
          </div>
          <div
            className="noteCheckbox"
            value="A"
            id={`target${A}`}
            onClick={() => {this.handleChange("A")}}>A
          </div>
          <div
            className="noteCheckbox"
            value="Bb"
            id={`target${Bb}`}
            onClick={() => {this.handleChange("Bb")}}>Bb/A#
          </div>
          <div
            className="noteCheckbox"
            value="B"
            id={`target${B}`}
            onClick={() => {this.handleChange("B")}}>B
          </div>
          {/* <input type="button" value="SUBMIT" onClick={this.submitCurrent}></input> */}
        </form>
        <input
          id="formResetButton"
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