import React from 'react';

export default function Name(props) {
  let { style, fieldName, fieldValue, update, location } = props;
  return (
    <input
      type="textarea"
      style={style}
      className="field"
      value={fieldValue}
      onChange={async (e) => {
        fieldValue = e.target.value;
        await update(location, { [fieldName]: `${fieldValue}` });
      }}
    ></input>
  );
}
