import React, { useState } from 'react';

const TuningModal = ({ toggleTuningModal, alterTuningAndStringAmount }) => {
  const [numberOfStrings, setNumberOfStrings] = useState(6);

  const [ tuning, setTuning ] = useState({
    string1: 'E',
    string2: 'B',
    string3: 'G',
    string4: 'D',
    string5: 'A',
    string6: 'E',
    string7: 'B',
    string8: 'F#/Gb',
    string9: 'C#/Db',
  })

  const selectNumberOfStringsMap = [4,5,6,7,8,9];

  const allStrings = [
    tuning.string1,
    tuning.string2,
    tuning.string3,
    tuning.string4,
    tuning.string5,
    tuning.string6,
    tuning.string7,
    tuning.string8,
    tuning.string9
  ];

  const chromaticScale = [
    'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F',
    'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B',
  ]

  const minStringsMap = [
    {note: 'E', num: 6},
    {note: 'A', num: 5},
    {note: 'D', num: 4},
    {note: 'G', num: 3},
  ];

  return (
    <div id="tuning-modal-wrapper">
      <div id="tuning-modal">
        <label htmlFor="string-number-select">String Amount</label>
          <select className="tuning-selector" id="string-number-select"onChange={(e) => {setNumberOfStrings(e.target.value)}} defaultValue={6}>
            {selectNumberOfStringsMap.map((num) => {
              return (
                <option value={num}>{num}</option>
              )
            })}
          </select>
          <br />
        <div id="tuning-selector-group">
          {numberOfStrings === '9' ?
            <div>
              <label htmlFor="string9">9</label>
              <select className="tuning-selector" id="string9" onChange={(e) => setTuning({...tuning, string9: e.target.value})} defaultValue={'C#/Db'}>
                {chromaticScale.map((note) => {
                  return (<option value={note}>{note}</option>)
                })}
              </select>
            </div>
          : null}

          {numberOfStrings === '8' || numberOfStrings === '9' ?
            <div>
              <label htmlFor="string8">8</label>
              <select className="tuning-selector" id="string8" onChange={(e) => setTuning({...tuning, string8: e.target.value})} defaultValue={'F#/Gb'}>
                {chromaticScale.map((note) => {
                  return (<option value={note}>{note}</option>)
                })}
              </select>
            </div>
          : null}

          {numberOfStrings === '7' || numberOfStrings === '8' || numberOfStrings === '9' || numberOfStrings === '5' ?
            <div>
              <label htmlFor="string7">7</label>
              <select className="tuning-selector" id="string7" onChange={(e) => setTuning({...tuning, string7: e.target.value})} defaultValue={'B'}>
                {chromaticScale.map((note) => {
                  return (<option value={note}>{note}</option>)
                })}
              </select>
            </div>
          : null}

          {minStringsMap.map((item, i) => {
            return (
            <div>
              <label htmlFor={`string${item.num}`}>{item.num}</label>
              <select
                className="tuning-selector"
                id={`string${item.num}`}
                onChange={(e) => setTuning({...tuning, ['string'+item.num]: e.target.value})}
                defaultValue={item.note}>
                {chromaticScale.map((note) => {
                  return (<option value={note}>{note}</option>)
                })}
              </select>
            </div>
            )
          })}

          {parseInt(numberOfStrings) >= 6 ?
          <div>
            <label htmlFor="string2">2</label>
            <select className="tuning-selector" id="string2" onChange={(e) => setTuning({...tuning, string2: e.target.value})} defaultValue={'B'}>
              {chromaticScale.map((note) => {
                return (<option value={note}>{note}</option>)
              })}
            </select>
          </div>
          : null}

          {parseInt(numberOfStrings) >= 6 ?
          <div>
            <label htmlFor="string1">1</label>
            <select className="tuning-selector" id="string1" onChange={(e) => setTuning({...tuning, string1: e.target.value})} defaultValue={'E'}>
              {chromaticScale.map((note) => {
                return (<option value={note}>{note}</option>)
              })}
            </select>
          </div>
          : null}
        </div>
        <div className='tuning-modal-buttons'>
          <button onClick={() => alterTuningAndStringAmount(numberOfStrings, allStrings)}>Submit</button>
          <button onClick={toggleTuningModal}>CLOSE</button>
        </div>
      </div>
    </div>
  )
}

export default TuningModal;

