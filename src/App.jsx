import React from 'react';
import Fretboard from './components/fretboard/Fretboard.jsx';
import tuning from './components/fretboard/tuning.js';
import CurrentForm from './components/forms/CurrentForm.jsx';
import TargetForm from './components/forms/TargetForm.jsx';
import Toolbar from './components/toolbar/Toolbar.jsx';


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
    this.clearAllReset = this.clearAllReset.bind(this);
    // this.testButton = this.testButton.bind(this);

    this.state = {
      tuning: tuning.standard,
      saveIds: [],
      currentPreset: '',
      clearAll: false,
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
    this.resetCurrent();
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
        } else if(!collection.includes(config[i][ii])) {
          if(config[i][ii].displayType === 'common' || config[i][ii].displayType === 'target') {
            config[i][ii].displayType = 'target';
          } else {
            config[i][ii].displayType = 'neutral';
          }
        }
      }
    }
    this.setState({
      tuning: config,
    })
  }

  globalTargetConfiguration(collection) {
    this.resetTarget();
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
        } else if(!collection.includes(config[i][ii])) {
          if(config[i][ii].displayType === 'common' || config[i][ii].displayType === 'current') {
            config[i][ii].displayType = 'current';
          } else {
            config[i][ii].displayType = 'neutral';
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
      clearAll: true,
    }, () => this.clearAllReset())
  }

  clearAllReset() {
    this.setState({
      clearAll: false,
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
    fetch('http://localhost:3000/id', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            saveIds: json,
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  savePreset(saveName) {
    if(saveName !== 'Save Name' && saveName.length <= 64 && saveName !== '') {
        const { tuning } = this.state;
        fetch('http://localhost:3000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({_id: saveName, diagram: tuning})
        })
        .then(res => {
          this.getAllIds();
        })
        .catch(err => {
          console.log('err', err);
        })
    } else {
      alert('Preset can\'t be empty or too long.')
    }
  }

  loadPreset(event) {
    const _id = event.target.value;
    fetch(`http://localhost:3000/getUserPreset/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({
                tuning: data.diagram,
                currentPreset: _id,
              })
            });
          }
        })
        .catch(err => {
          console.log('err', err);
        })
  }

  deletePreset() {
    const { currentPreset } = this.state;

    fetch(`http://localhost:3000/delete/${currentPreset}`, {
      method: 'DELETE',
    })
    .then(res => {
      this.getAllIds();
    })
    .catch(err =>{
      console.log(err);
    })
  }



  render() {
    const { tuning, saveIds } = this.state;
    return (
      <div className="App">
        <h3>Key Frame Guitar</h3>
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
            clearAll={this.state.clearAll}
            clearAllReset={this.clearAllReset}
          />
          <TargetForm
            globalTargetConfiguration={this.globalTargetConfiguration}
            resetTarget={this.resetTarget}
            clearAll={this.state.clearAll}
            clearAllReset={this.clearAllReset}
          />
        </div>
      </div>
    );
  }
}

export default App;