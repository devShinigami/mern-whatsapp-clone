import React from "react";

function Input({ name, state, setState, label = false, placeholder }) {
  return (
    <div className="flex gap-1 flex-col">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="text-gray-300 text-lg px-1">
            {name}
          </label>
          {name === "About" ? (
            <h1 className="text-gray-300  text-sm px-1">Max 60</h1>
          ) : (
            ""
          )}
        </div>
      )}
      <div>
        <input
          placeholder={placeholder}
          maxLength={name === "About" ? "60" : "15"}
          type="text"
          name={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="input border border-gray-300 w-full max-w-xs"
        />
      </div>
    </div>
  );
}

export default Input;
