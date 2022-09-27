import React from 'react';

export default function Name(props) {
  let { style, fieldName, fieldValue, update, path } = props;
  return (
    <input
      type="textarea"
      style={style}
      className="field"
      value={fieldValue}
      onChange={async (e) => {
        fieldValue = e.target.value;
        await update(path, { [fieldName]: `${fieldValue}`})
      }}
    ></input>
  );
}
