/* SearchBox.jsx */

/* import React from "react";
import styles from "./SearchBox.module.css";

const SearchBox = ({ filter, setFilter }) => {
  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Find contacts by name"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default SearchBox;
 */
/* SearchBox.jsx */

import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Find contacts by name"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default SearchBox;
