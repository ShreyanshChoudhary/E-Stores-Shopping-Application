import { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export function DropDown({
  valueType,
  value,
  setter,
  DefaultText,
  warnMessage,
  options,
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    isDropdownOpen ? setDropdownOpen(false) : setDropdownOpen(true);
  };

  // closing dropdown whenever the user makes a random click
  document.addEventListener("mousedown", (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  });

  return (
    <div>
      <button
        type="button"
        className="py-1 w-full px-2 font-semibold text-slate-700 flex"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col justify-center items-start w-full">
          <div className="flex justify-center items-center"> 
            <p>
              {value !== "" && value ? valueType + ": " + value : DefaultText}
            </p>
            <div className="ml-1">
              {(isDropdownOpen)? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
            </div>
          </div>
          <p className="text-xs text-slate-400 font-normal">
            {value !== "" && value ? warnMessage : " "}
          </p>
        </div>
      </button>

      {isDropdownOpen && (
        <div
          className="dropdown absolute w-3/12 font-semibold h-2/6 overflow-y-auto scroll-smooth flex flex-col shadow-lg shadow-slate-300 bg-slate-50 rounded-sm"
          ref={dropDownRef}
        >
          {options.map((option, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setter(option);
                  setDropdownOpen(false);
                }}
                className="prime-category hover:bg-blue-600 hover:shadow-md shadow-slate-700 px-4 py-2 w-full text-start font-light hover:text-slate-100 "
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
