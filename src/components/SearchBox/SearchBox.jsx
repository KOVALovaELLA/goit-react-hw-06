import { useDispatch } from "react-redux";
import { setStatusFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { useState } from "react";

export default function SearchBox() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    dispatch(setStatusFilter(inputValue));
  };

  return (
    <div>
      <p className={css.label}>Find contacts by name:</p>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
}
