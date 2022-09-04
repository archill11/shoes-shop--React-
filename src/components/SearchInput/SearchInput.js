

import styles from './SearchInput.module.scss';



const SearchInput = (props) => {

  return (
    
    <input value={props.searchVal} className={styles.input_search} placeholder={props.placeholder} type="text" name="search" id="input-search" 
    onChange={(e) => props.searchByVal(e.target.value)}/>
    
  );
}

export {SearchInput};