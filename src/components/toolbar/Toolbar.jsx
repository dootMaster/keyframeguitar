import React from 'react';
// import Metronome from '@kevinorriss/react-metronome';
// import "rc-slider/assets/index.css";

class Toolbar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      displayMetronome: false,
      saveFileName: 'Enter Save Name Here',
    };

    this.toggleMetronome = this.toggleMetronome.bind(this);
    this.saveNameInputHandler = this.saveNameInputHandler.bind(this);
  }

  saveNameInputHandler(event) {
    this.setState({
      saveFileName: event.target.value,
    })
  }

  toggleMetronome() {
    this.setState({
      displayMetronome: !this.state.displayMetronome,
    })
  }

  setLocalStorage() {
    localStorage.setItem('test file name', JSON.stringify([{one: 1}, {two: 2}, {three: 3}, {four: 4}, {five: 5}]));
  }

  getLocalStorage() {
    const data = localStorage.getItem('test file name');
    console.log(Array.isArray(JSON.parse(data)), JSON.parse(data));
  }

  rmvLocalStorage() {
    localStorage.clear();
  }

  render() {
    const { saveIds, savePreset, loadPreset } = this.props;
    const { saveFileName } = this.state;
    return (
      <div className="toolbar-container">
        <div id="input-div">
        <input
          id='save-name-field'
          type="text"
          value={saveFileName}
          onChange={this.saveNameInputHandler}
          maxLength="64"
          onFocus={() => this.setState({saveFileName: ''})}>
        </input>
        <button onClick={() => {savePreset(saveFileName)}}>SAVE</button>
        </ div>
        <div id="input-div">
        {/* <label id="preset-select-label" htmlFor="toolbar-user-preset-select">User Presets:</label> */}
        <select
          name="userPresets"
          id="toolbar-user-preset-select"
          onChange={loadPreset}
        >
          <option value={[]}>Select Preset</option>
          {saveIds.map((_id, i) => {
            if(_id !== 'loglevel') {
              return (
                <option value={_id} key={_id}>{_id}</option>
              )}
          })}
        </select>
        <button onClick={() => {
          this.props.deletePreset();
          this.props.clearAll();
        }}>DELETE</button>
        </div>
        <button onClick={this.props.toggleTuningModal}>OPTIONS</button>
        <button onClick={this.props.clearAll}>RESET ALL</button>
        {/* <button onClick={this.rmvLocalStorage}>DELETE ALL</button> */}
      </div>
    )
  }
}

export default Toolbar;