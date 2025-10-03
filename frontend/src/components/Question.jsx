import React from "react";

const Question = ({ ques, selected, onSelect }) => {
  if (!ques) return null; // safety check

  return (
    <div>
      <h2>{ques.text}</h2>
      <ul>
        {ques.options.map((opt, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name={ques._id}
                value={i}
                checked={selected === i} // mark selected option
                onChange={() => onSelect(i)} // update parent state
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Question);
