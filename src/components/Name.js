import React from 'react';

import { useState } from 'react';

export default function Name(props) {
  let { style, fieldName, fieldValue, update, path } = props;

  const [value, setValue] = useState(fieldValue);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  const updateValue = async (e) => {
    fieldValue = e.target.value;
    await update(path, { [fieldName]: `${fieldValue}`})
  }

  return (
    <input
      type="textarea"
      style={style}
      className="field"
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}

      onKeyDown={ e => {
        handleKeyDown(e);
      }}

      onBlur={ e => {
        updateValue(e);
      }}
    ></input>
  );
}
