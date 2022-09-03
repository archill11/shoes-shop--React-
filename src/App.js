import {Routes, Route} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardList } from './pages/CardList/CardList';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';
import { Favorites } from "./pages/Favorites/Favorites";

import styles from './App.module.scss';

// const shoesData = [
//   {id:1, title: "Мужские кроссовки New Balance 550", price: 12999, img: "/img/1img.webp" },
//   {id:2, title: "Мужские кроссовки Nike", price: 12000, img: "/img/2img.webp" },
//   {id:3, title: "Мужские кроссовки Nike Dunks", price: 20900, img: "/img/3img.webp" },
//   {id:4, title: "Кеды Vans Old Skool", price: 8500, img: "/img/4img.webp" },
//   {id:5, title: "Мужские кроссовки Nike Air Jordan 4", price: 9000, img: "/img/5img.webp" },
//   {id:5, title: "Мужские кроссовки Nike Air Jordan 4", price: 9000, img: "/img/5img.webp" },
//   {id:6, title: "Мужские кроссовки  Fila", price: 3000, img: "/img/6img.webp" },
// ]

const App = (props) => {
  const [shoesData, setShoesData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favItems, setFavItems] = useState([])
  const [cartOpend, setCartOpend] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [searchVal, setSearchVal] = useState('')
  
  useEffect(() => {
    axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/items')
      .then(res => { setShoesData(res.data) })

      axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/cart')
      .then(res => { setCartItems(res.data) })

      axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/favorites')
      .then(res => { setFavItems(res.data) })
  }, [])

  const addToCart = async (obj) => {
    try {
      const {data} = await axios.post('https://6311eb0df5cba498da884e3e.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, data])
      console.log('toCartItemDATA:', data);
    } catch (error) {
      alert('Не удалось добавить в корзину')
      console.log(error);
    }
  }
  const remFromCart = (id) => {
    try {
      console.log("id:", id);
      const inCartItems = cartItems.filter(item => item.id !== id )
      setCartItems(inCartItems)
      axios.delete(`https://6311eb0df5cba498da884e3e.mockapi.io/cart/${id}` )
    } catch (error) {
      alert('Не удалось добавить удалить из корзины')
      console.log(error);
    }
  }

  const addTofav = async (obj) => {
    try {
      const {data} = await axios.post('https://6311eb0df5cba498da884e3e.mockapi.io/favorites', obj)
      setFavItems(prev => [...prev, data])
      console.log('toFavoriteDATA:', data);
    } catch (error) {
      alert('Не удалось добавить в фавориты')
      console.log(error);
    }
  }
  const remFromFav = (id) => {
    try {
      console.log("id:", id);
      axios.delete(`https://6311eb0df5cba498da884e3e.mockapi.io/favorites/${id}` )
    } catch (error) {
      alert('Не удалось удалить из фавориты')
      console.log(error);
    }
  }


  const searchByVal = (val) => {
    setSearchVal(val)
  }

  if (cartOpend) {
    document.body.style.overflow = 'hidden'
  }else{
    document.body.style.overflow = ''
  }

  return (
      <div className={styles.app_wrapper + ' clear'} style={cartOpend? {overflow: 'hidden'} : null}>

        <Header cartTotal={cartTotal} opnCart={() => setCartOpend(true)}/>

        <Routes>
            <Route path="/" element={
              <CardList shoesData={shoesData} 
                addToCart={addToCart} remFromCart={remFromCart}
                addTofav={addTofav} remFromFav={remFromFav}
                addToCartTotal={setCartTotal} cartTotal={cartTotal}
                searchByVal={searchByVal} searchVal={searchVal}/>}/>
            <Route path="/favorites" element={
              <Favorites
                addToCart={addToCart} remFromCart={remFromCart}
                addToCartTotal={setCartTotal} cartTotal={cartTotal}
                favItems={favItems}
                remFromFav={remFromFav}
                searchByVal={searchByVal} searchVal={searchVal}/>}/>
        </Routes>
        
        {cartOpend && <Drawer cartItems={cartItems} cartTotal={cartTotal} 
                              clseCart={() =>setCartOpend(false)}
                              remFromCart={remFromCart}/> }
                              
      </div>
  );
}

export default App;
