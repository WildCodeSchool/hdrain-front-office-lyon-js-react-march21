import React, { useState } from 'react';
import './Testdropdown.css';

// eslint-disable-next-line no-unused-vars
function TestDropDown({ title, items = [], multiSelect = false }) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);

  // eslint-disable-next-line no-unused-vars
  function handleOnClick(item) {}

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header_title">
          <p className="dd-header_title--bold">{title}</p>
        </div>
        <div className="dd-header_action">
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button
                className="dd-btn"
                type="button"
                onClick={() => handleOnClick(item)}
              >
                <span>{item.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TestDropDown;
