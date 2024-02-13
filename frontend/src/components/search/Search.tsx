import styles from "./search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({
  value,
  onSearch,
}: {
  value: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search Inventory"
        value={value}
        onChange={onSearch}
      />
    </div>
  );
};

export default Search;
