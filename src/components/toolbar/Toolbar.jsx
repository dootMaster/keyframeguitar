import React from 'react';
// import Metronome from '@kevinorriss/react-metronome';
// import "rc-slider/assets/index.css";

class Toolbar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      displayMetronome: false,
      saveFileName: 'Save Name',
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


  render() {
    const { saveIds, savePreset, loadPreset } = this.props;
    const { displayMetronome, saveFileName } = this.state;
    return (
      <div className="toolbarContainer">
        <div id="inputDiv">
        <input
          id='saveNameField'
          type="text"
          value={saveFileName}
          onChange={this.saveNameInputHandler}
          maxLength="64"
          onFocus={() => event.target.value = ""}>
        </input>
        <button onClick={() => {savePreset(saveFileName)}}>SAVE</button>
        </ div>
        <div id="inputDiv">
        <label id="presetSelectLabel" htmlFor="toolbarUserPresetSelect">User Presets:</label>
        <select
          name="userPresets"
          id="toolbarUserPresetSelect"
          onChange={loadPreset}
        >
          <option value={[]}>---------------</option>
          {saveIds.map((_id, i) => {
            return (
              <option value={_id} key={_id}>{_id}</option>
            )
          })}
        </select>
        <button onClick={this.props.deletePreset}>DELETE</button>
        </div>
        <button onClick={this.props.switchTuning}>TOGGLE 7 STRING</button>
        <button onClick={this.props.clearAll}>CLEAR FRETBOARD</button>
        {/* <br />
        <button onClick={this.toggleMetronome}>Metronome</button>
        {displayMetronome ?
        <Metronome
          sliderStyle={{
            width: "25%",
          }}
          playPauseStyle={{
            position: "relative",
            right: "90%",
            "background-color": "lightseagreen",
          }}
        />
        : null} */}
      </div>
    )
  }
}

export default Toolbar;