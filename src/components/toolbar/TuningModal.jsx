import React, { useState } from 'react';

const TuningModal = props => {
  const [string1, setString1] = useState('E');

  return (
    <div id="tuning-modal">
      <select>
        <option>E</option>
        <option>B</option>
        <option>G</option>
        <option>D</option>
        <option>A</option>
      </select>
    </div>
  )
}

export default TuningModal;