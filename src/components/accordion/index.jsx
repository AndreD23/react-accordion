import { useState } from "react";
import "./styles.css";
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    if (selected === getCurrentId) {
      setSelected(null);
    } else {
      setSelected(getCurrentId);
    }
  };

  const handleMultipleSelection = (getCurrentId) => {
    if (multipleSelected.includes(getCurrentId)) {
      setMultipleSelected(multipleSelected.filter((id) => id !== getCurrentId));
    } else {
      setMultipleSelected([...multipleSelected, getCurrentId]);
    }
  };

  const handleSetMultipleSelection = () => {
    if (!enableMultiSelection) {
      setSelected(null);
    }
    if (enableMultiSelection && multipleSelected.length > 0) {
      setMultipleSelected([]);
    }
    setEnableMultiSelection(!enableMultiSelection);
  };

  return (
    <div className="wrapper">
      <button onClick={handleSetMultipleSelection}>
        Enable Multi Selection
      </button>

      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multipleSelected.indexOf(dataItem.id) !== -1 ? (
                <div className="content">
                  <p>{dataItem.answer}</p>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
