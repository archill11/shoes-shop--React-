// import {Routes, Route} from "react-router-dom";
import { CardList } from './components/CardList/CardList';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

import styles from './App.module.scss';

const sneakersData = [
  {id:1, title: "Мужские кроссовки New Balance 500", price: 12999, img: "/img/1img.webp" },
  {id:2, title: "Мужские кроссовки Nike", price: 12000, img: "/img/2img.webp" },
  {id:3, title: "Мужские кроссовки Nike Dunks", price: 20900, img: "/img/3img.webp" },
  {id:4, title: "Мужские кроссовки Vans Old School", price: 8500, img: "/img/4img.webp" },
]

const App = (props) => {

  
  return (
      <div className={styles.app_wrapper + ' clear'}>

        <Header/>
        <CardList sneakersData={sneakersData}/>
        {/* <Drawer/> */}
        
        
      </div>
  );
}

export default App;
