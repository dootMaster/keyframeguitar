import React, { useState } from 'react';

class Metronome extends React.Component {
  audioContext = null;
  notesInQueue = [];
  currentNote = 0;
  lookahead = 25;
  scheduleAheadTime = 0.1;
  nextNoteTime = 0.0;
  intervalID = null;

  constructor(props) {
    super(props);

    this.state = {
      tempo: 120,
      timeSignature: 4,
      isRunning: false,
      currentNote: 0,
      volume: 1,
      pitch440On: false,
    };
  }

  handleSettings(e) {
    const { id, value } = e.target;

    if(id === 'tempo') {
      let newTempo = this.state.tempo + parseInt(value);
      this.setState({
        [id]: (newTempo <= 280 && newTempo >= 20) ? newTempo : this.state.tempo,
      });
    } else if(id === 'volume') {
      this.setState({
        [id]: value,
      })
    } else {
      let newTimeSig = this.state.timeSignature + parseInt(value);
      this.setState({
        [id]: (newTimeSig <= 7 && newTimeSig >= 0) ? newTimeSig : this.state.timeSignature,
      })
    }
  }

  nextNote() {
      var secondsPerBeat = 60.0 / this.state.tempo;
      this.nextNoteTime += secondsPerBeat;

      this.setState({currentNote: this.state.currentNote + 1})

      if (this.state.currentNote % this.state.timeSignature === 0) {
        this.setState({currentNote: 0});
      }
  }

  scheduleNote(beatNumber, time) {
      // this.notesInQueue.push({ note: beatNumber, time: time });
      const { volume } = this.state;
      if(volume > 0.05) {
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();

        osc.frequency.value = ((beatNumber === 0) ? 1200 : 800);
        envelope.gain.value = volume;
        envelope.gain.exponentialRampToValueAtTime(volume, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.03);
      }
  }

  scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
          this.scheduleNote(this.state.currentNote, this.nextNoteTime);
          this.nextNote();
        }
    }

    start() {
        if (this.state.isRunning) return;

        if (this.audioContext == null)
        {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.setState({
          isRunning: true,
          currentNote: 0,
        })

        this.nextNoteTime = this.audioContext.currentTime + 0.05;

        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }

    stop() {
        this.setState({
          isRunning: false,
        });

        clearInterval(this.intervalID);
    }

    startStop() {
        if (this.state.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

  render() {
    const { tempo, timeSignature, isRunning, currentNote, volume } = this.state;
    return (
      <div className="metronome-wrapper">
        <h1>{isRunning ? (currentNote !== 0 ? `${currentNote}` : `${timeSignature}`) : `${tempo}`}</h1>
        <p className="accent-display">Accent {isRunning ? `${timeSignature} Tempo ${tempo}` : `${timeSignature}`}</p>
        <button className="play-pause" onClick={() => {this.startStop()}}>{!isRunning ? '▶' : '■'}</button>
        <div className="tempo-button-container">
          <button id="tempo" value="-10" onClick={(e) => this.handleSettings(e)}>-10</button>
          <button id="tempo" value="-5" onClick={(e) => this.handleSettings(e)}>-5</button>
          <button id="tempo" value="-1" onClick={(e) => this.handleSettings(e)}>-1</button>
          <button id="tempo" value="1" onClick={(e) => this.handleSettings(e)}>+1</button>
          <button id="tempo" value="5" onClick={(e) => this.handleSettings(e)}>+5</button>
          <button id="tempo" value="+10" onClick={(e) => this.handleSettings(e)}>+10</button>
        </div>
        <div className="timeSignature-button-container">
          <button id="timeSignature" value="-1" onClick={(e) => {this.handleSettings(e)}}>-acc</button>
          <button id="timeSignature" value="+1" onClick={(e) => {this.handleSettings(e)}}>+acc</button>
          {/* <button id="pitch" onClick={() => this.tuningStartStop()}>pitch</button> */}
          <input type="range" id="volume" min="0" max="2" value={volume} step="0.01" onChange={(e) => {this.handleSettings(e)}} list="middle"></input>
        </div>
      </div>
    )
  }
}

export default Metronome;