import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const ThemeSettings = () => {
  const [{}, dispatch] = useStateProvider();

  const themeOptions = [
    {
      name: "light",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "light",
        });
      },
    },
    {
      name: "dark",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "dark",
        });
      },
    },
    {
      name: "coffee",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "coffee",
        });
      },
    },
    {
      name: "autumn",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "autumn",
        });
      },
    },
    {
      name: "forest",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "forest",
        });
      },
    },
    {
      name: "cyberpunk",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "cyberpunk",
        });
      },
    },
    {
      name: "synthwave",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "synthwave",
        });
      },
    },
    {
      name: "cupcake",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "cupcake",
        });
      },
    },
    {
      name: "dracula",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "dracula",
        });
      },
    },
    {
      name: "business",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "business",
        });
      },
    },
    {
      name: "halloween",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "halloween",
        });
      },
    },
    {
      name: "luxury",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "luxury",
        });
      },
    },
    {
      name: "pastel",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "pastel",
        });
      },
    },
    {
      name: "cmyk",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "cmyk",
        });
      },
    },
    {
      name: "wireframe",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "wireframe",
        });
      },
    },
    {
      name: "emerald",
      callback: () => {
        dispatch({
          type: reducerCases.SET_THEME,
          theme: "emerald",
        });
      },
    },
  ];

  return (
    <div className="h-full flex flex-col ">
      <div className="h-24 flex items-end px-3 py-4 ">
        <div className="flex items-center gap-12 ">
          <BiArrowBack
            className="cursor-pointer text-xl text-primary"
            onClick={() =>
              dispatch({
                type: reducerCases.SET_THEME_PAGE,
              })
            }
          />
          <span>Select Themes</span>
        </div>
      </div>
      <div className="flex flex-col max-h-screen custom-scrollbar z-20 overflow-auto ">
        <div className="">
          {themeOptions.map(({ name, callback }, index) => (
            <li
              className="list-none p-4 cursor-pointer hover:bg-primary-content"
              onClick={callback}
            >
              {index + 1} - {name}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
