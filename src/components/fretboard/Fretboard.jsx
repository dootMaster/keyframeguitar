import React from 'react';

function Fretboard ({ tuning, clickToggle }) {
  return (
    <div className="fretboard">
      {tuning.map((string, i) => {
        return (
          <div className="string" key={i}>
            <div
              className="nut"
              id={string[0].displayType}
              onClick={() => {clickToggle(i, 0)}}>{string[0].note}</div>
            <div
              className="fret"
              id={string[1].displayType}
              onClick={() => {clickToggle(i, 1)}}>{string[1].note}</div>
            <div
              className="fret"
              id={string[2].displayType}
              onClick={() => {clickToggle(i, 2)}}>{string[2].note}</div>
            <div
              className="fret-mark"
              id={string[3].displayType}
              onClick={() => {clickToggle(i, 3)}}>{string[3].note}</div>
            <div
              className="fret"
              id={string[4].displayType}
              onClick={() => {clickToggle(i, 4)}}>{string[4].note}</div>
            <div
              className="fret-mark"
              id={string[5].displayType}
              onClick={() => {clickToggle(i, 5)}}>{string[5].note}</div>
            <div
              className="fret"
              id={string[6].displayType}
              onClick={() => {clickToggle(i, 6)}}>{string[6].note}</div>
            <div
              className="fret-mark"
              id={string[7].displayType}
              onClick={() => {clickToggle(i, 7)}}>{string[7].note}</div>
            <div
              className="fret"
              id={string[8].displayType}
              onClick={() => {clickToggle(i, 8)}}>{string[8].note}</div>
            <div
              className="fret-mark"
              id={string[9].displayType}
              onClick={() => {clickToggle(i, 9)}}>{string[9].note}</div>
            <div
              className="fret"
              id={string[10].displayType}
              onClick={() => {clickToggle(i, 10)}}>{string[10].note}</div>
            <div
              className="fret"
              id={string[11].displayType}
              onClick={() => {clickToggle(i, 11)}}>{string[11].note}</div>
            <div
              className="fret-mark"
              id={string[12].displayType}
              onClick={() => {clickToggle(i, 12)}}>{string[12].note}</div>
          </div>
        )
      })}
          <div className="markers">
            <div className="fret-guide">0</div>
            <div></div>
            <div></div>
            <div className="fret-guide">3</div>
            <div></div>
            <div className="fret-guide">5</div>
            <div></div>
            <div className="fret-guide">7</div>
            <div></div>
            <div className="fret-guide">9</div>
            <div></div>
            <div></div>
            <div className="fret-guide">12</div>
          </div>
    </div>
  )
}

export default Fretboard;