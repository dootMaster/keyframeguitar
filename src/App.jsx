import React from 'react';
import Fretboard from './components/fretboard/Fretboard.jsx';
import tuning from './components/fretboard/tuning.js';
import CurrentForm from './components/forms/CurrentForm.jsx';
import TargetForm from './components/forms/TargetForm.jsx';
import Toolbar from './components/toolbar/Toolbar.jsx';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.globalCurrentConfiguration = this.globalCurrentConfiguration.bind(this);
    this.globalTargetConfiguration = this.globalTargetConfiguration.bind(this);
    this.resetCurrent = this.resetCurrent.bind(this);
    this.resetTarget = this.resetTarget.bind(this);
    this.clickToggle = this.clickToggle.bind(this);
    this.switchTuning = this.switchTuning.bind(this);
    this.getAllIds = this.getAllIds.bind(this);
    this.savePreset = this.savePreset.bind(this);
    this.loadPreset = this.loadPreset.bind(this);
    this.deletePreset = this.deletePreset.bind(this);
    this.clearAll = this.clearAll.bind(this);
    // this.testButton = this.testButton.bind(this);

    this.state = {
      tuning: tuning.standard,
      saveIds: [],
      currentPreset: '',
    }
  }

  componentDidMount() {
    this.getAllIds();
  }

  clickToggle(string, fret) {
    const { tuning } = this.state;
    if(tuning[string][fret].displayType === "neutral") {
      tuning[string][fret].displayType = "current";
    } else if(tuning[string][fret].displayType === "current") {
      tuning[string][fret].displayType = "target";
    } else if(tuning[string][fret].displayType === "target") {
      tuning[string][fret].displayType = "common";
    } else if(tuning[string][fret].displayType === "common") {
      tuning[string][fret].displayType = "neutral";
    }
    this.setState({
      tuning: tuning,
    })
  }

  globalCurrentConfiguration(collection) {
    const { tuning } = this.state;
    const config = tuning;
    for(let i=0; i<config.length; i++){
      for(let ii=0; ii<config[i].length; ii++) {
        if(collection.includes(config[i][ii].note)) {
          if(config[i][ii].displayType === 'target') {
            config[i][ii].displayType = 'common';
          } else {
            config[i][ii].displayType = 'current';
          }
        }
      }
    }
    console.log(tuning);
    this.setState({
      tuning: config,
    })
  }

  globalTargetConfiguration(collection) {
    const { tuning } = this.state;
    const config = tuning;
    for(let i=0; i<config.length; i++){
      for(let ii=0; ii<config[i].length; ii++) {
        if(collection.includes(config[i][ii].note)) {
          if(config[i][ii].displayType === 'current') {
            config[i][ii].displayType = 'common';
          } else {
            config[i][ii].displayType = 'target';
          }
        }
      }
    }
    this.setState({
      tuning: config,
    })
  }

  resetCurrent() {
    const { tuning } = this.state;
    const config = Array.from(tuning);
    for(let i=0; i<config.length; i++){
      for(let ii=0; ii<config[i].length; ii++) {
        if(config[i][ii].displayType === 'current') {
          config[i][ii].displayType = 'neutral';
        } else if(config[i][ii].displayType === 'common'){
          config[i][ii].displayType = 'target';
        }
      }
    }
    this.setState({
      tuning: config,
    })
  }

  resetTarget() {
    const { tuning } = this.state;
    const config = Array.from(tuning);
    for(let i=0; i<config.length; i++){
      for(let ii=0; ii<config[i].length; ii++) {
        if(config[i][ii].displayType === 'target') {
          config[i][ii].displayType = 'neutral';
        } else if(config[i][ii].displayType === 'common'){
          config[i][ii].displayType = 'current';
        }
      }
    }
    this.setState({
      tuning: config,
    })
  }

  clearAll() {
    const { tuning } = this.state;
    const config = tuning;
    for(let i=0; i<config.length; i++){
      for(let ii=0; ii<config[i].length; ii++) {
          config[i][ii].displayType = 'neutral';
      }
    }
    this.setState({
      tuning: config,
    })
  }

  switchTuning() {
    if(this.state.tuning.length === 6) {
      this.setState({
        tuning: tuning.sevenStringB,
      })
    } else {
      this.setState({
        tuning: tuning.standard,
      })
    }
  }

  getAllIds() {
    $.ajax({
      url: 'http://localhost:3000/id',
      method: 'GET',
      success: (data) => {
        this.setState({
          saveIds: data,
        }, () => {
          console.log(this.state.saveIds)
        })
      },
      error: (err) => {console.log(err)}
    })
  }

  savePreset(saveName) {
    if(saveName !== '') {
        const { tuning } = this.state;
      $.ajax({
        url: 'http://localhost:3000/',
        method: 'POST',
        data: JSON.stringify({_id: saveName, diagram: tuning}),
        success: (meta) => {
          console.log(meta);
          this.getAllIds();
        },
        error: (err) => {console.log(err)}
      })
    } else {
      alert('Preset needs name.')
    }
  }

  loadPreset(event) {
    const _id = event.target.value;
    $.ajax({
      url: `http://localhost:3000/getUserPreset/${_id}`,
      method: 'GET',
      success: (data) => {
        console.log(data);
        this.setState({
          tuning: data.diagram,
          currentPreset: _id,
        })
      },
      error: (err) => {console.log(err)}
    })
  }

  deletePreset() {
    const { currentPreset } = this.state;
    $.ajax({
      url: `http://localhost:3000/delete/${currentPreset}`,
      method: 'DELETE',
      success: (meta) => {
        console.log(meta);
        this.getAllIds();
      },
      error: (err) => {console.log(err)}
    })
  }

  render() {
    const { tuning, saveIds } = this.state;
    return (
      <div className="App">
        <h1>Key Frame Guitar</h1>
        <h2>A fretboard navigation and practice tool inspired by key frames in animation.</h2>
        <Fretboard
          tuning={tuning}
          clickToggle={this.clickToggle}
        />
        <Toolbar
          switchTuning={this.switchTuning}
          saveIds={saveIds}
          savePreset={this.savePreset}
          loadPreset={this.loadPreset}
          deletePreset={this.deletePreset}
          getAllIds={this.getAllIds}
          clearAll={this.clearAll}
        />
        <div className="formContainer">
          <CurrentForm
            globalCurrentConfiguration={this.globalCurrentConfiguration}
            resetCurrent={this.resetCurrent}
          />
          <TargetForm
            globalTargetConfiguration={this.globalTargetConfiguration}
            resetTarget={this.resetTarget}
          />
        </div>
      </div>
    );
  }
}

export default App;