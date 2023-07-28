import React, { useState } from "react";


export default function ExportNumber({ max }) {
  const [min, setMin] = useState(0);
  const [secondInput, setSecondInput] = useState(min);

  const formatValue = (value) => {
    value = parseInt(value);
    if (isNaN(value)) {
      return 0;
    }
    value = Math.max(0, value);
    value = Math.min(value, max);
    return value;
  };

  const handleMinChange = (e) => {
    setMin(formatValue(e.target.value));
  };

  function handleSecondInputChange(e)  {
    let value = formatValue(e.target.value);
    value = Math.max(value, min); // İkinci inputun değeri, ilk inputtan küçükse, ilk inputun değerine eşitle
    setSecondInput(value);
    console.log(secondInput)
  };

  return (
    <div className="form-outline input-group w-25">
      <input
        type="number"
        value={min}
        onChange={handleMinChange}
        onBlur={handleSecondInputChange}
        min={0}
        max={max}
        className="form-control"
      />
      -
      <input
        type="number"
        value={secondInput}
        onChange={(e) => setSecondInput(e.target.value) }
        onBlur={handleSecondInputChange}
        min={min}
        max={max}
        className="form-control"
      />
    </div>
  );
}