/* SearchBox.jsx */
/* import { useDispatch } from "react-redux";
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
 */
/* import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { useState } from "react";

export default function SearchBox() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    dispatch(changeFilter(inputValue));
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
} */
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { useState } from "react";

export default function SearchBox() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filters.name);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    dispatch(changeFilter(inputValue));
  };

  return (
    <div>
      <p className={css.label}>Find contacts by name:</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={handleChange}
      ></input>
    </div>
  );
}
