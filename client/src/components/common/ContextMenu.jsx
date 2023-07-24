import React, { useEffect, useRef } from "react";

function ContextMenu({ options, coardinates, contextMenu, setContextMenu }) {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id !== "context-opener") {
        if (ref.current && !ref.current.contains(e.target)) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };
  return (
    <div
      style={{
        top: coardinates.y,
        left: coardinates.x,
      }}
      ref={ref}
      className="bg-base-200 fixed py-2 z-[100]  shadow-xl rounded-lg"
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            className="px-4  hover:bg-base-100 py-2 cursor-pointer"
            key={name}
            onClick={(e) => {
              handleClick(e, callback);
            }}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
