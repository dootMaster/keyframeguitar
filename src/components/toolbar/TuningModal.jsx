import React, { useState } from 'react';

const TuningModal = ({ toggleTuningModal, alterTuningAndStringAmount }) => {
  const [numberOfStrings, setNumberOfStrings] = useState(6);

  const [string1, setString1] = useState('E');
  const [string2, setString2] = useState('B');
  const [string3, setString3] = useState('G');
  const [string4, setString4] = useState('D');
  const [string5, setString5] = useState('A');
  const [string6, setString6] = useState('E');
  const [string7, setString7] = useState('B');
  const [string8, setString8] = useState('G');
  const [string9, setString9] = useState('G');

  const selectNumberOfStringsMap = [4,5,6,7,8,9];
  const allStrings = [string1, string2, string3, string4, string5, string6, string7, string8, string9];

  const chromaticScale = [
    'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F',
    'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B',
  ]

  const minStringsMap = [
    {f: setString6, note: 'E', num: 6},
    {f: setString5, note: 'A', num: 5},
    {f: setString4, note: 'D', num: 4},
    {f: setString3, note: 'G', num: 3},
  ];

  return (
    <div id="tuning-modal-wrapper">
      <div id="tuning-modal">
        <button onClick={toggleTuningModal}>CLOSE</button>
        <button onClick={() => alterTuningAndStringAmount(numberOfStrings, allStrings)}>Submit</button>
        <label htmlFor="string-number-select">String Amount</label>
          <select className="tuning-selector" id="string-number-select"onChange={(e) => {setNumberOfStrings(e.target.value)}} defaultValue={6}>
            {selectNumberOfStringsMap.map((num) => {
              return (
                <option value={num}>{num}</option>
              )
            })}
          </select>
        <div id="tuning-selector-group">
          {numberOfStrings === '9' ?
            <div>
              <label htmlFor="string9">9</label>
              <select className="tuning-selector" id="string9" onChange={(e) => setString9(e.target.value)} defaultValue={'C#/Db'}>
                {chromaticScale.map((note) => {
                  return (<option value={note}>{note}</option>)
                })}
              </select>
            </div>
          : null}

          {numberOfStrings === '8' || numberOfStrings === '9' ?
            <div>
              <label htmlFor="string8">8</label>
              <select className="tuning-selector" id="string8" onChange={(e) => setString8(e.target.value)} defaultValue={'F#/Gb'}>
                {chromaticScale.map((note) => {
                  return (<option value={note}>{note}</option>)
                })}
              </select>
            </div>
          : null}

          {numberOfStrings === '7' || numberOfStrings === '8' || numberOfStrings === '9' || numberOfStrings === '5' ?
            <div>
              <label htmlFor="string7">7</label>
              <select className="tuning-selector" id="string7" onChange={(e) => setString7(e.target.value)} defaultValue={'B'}>
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
              <select className="tuning-selector" id={`string${item.num}`} onChange={(e) => item.f(e.target.value)} defaultValue={item.note}>
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
            <select className="tuning-selector" id="string2" onChange={(e) => setString2(e.target.value)} defaultValue={'B'}>
              {chromaticScale.map((note) => {
                return (<option value={note}>{note}</option>)
              })}
            </select>
          </div>
          : null}

          {parseInt(numberOfStrings) >= 6 ?
          <div>
            <label htmlFor="string1">1</label>
            <select className="tuning-selector" id="string1" onChange={(e) => setString1(e.target.value)} defaultValue={'E'}>
              {chromaticScale.map((note) => {
                return (<option value={note}>{note}</option>)
              })}
            </select>
          </div>
          : null}
        </div>
      </div>
    </div>
  )
}

export default TuningModal;

