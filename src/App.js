import {Routes, Route} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardList } from './pages/CardList/CardList';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';
import { Favorites } from "./pages/Favorites/Favorites";
import { Cabinet } from "./pages/Cabinet/Cabinet";

import styles from './App.module.scss';

// const shoesData = [
//   {id:1, title: "Мужские кроссовки New Balance 550", price: 12999, img: "/img/1img.webp" },
//   {id:2, title: "Мужские кроссовки Nike", price: 12000, img: "/img/2img.webp" },
//   {id:3, title: "Мужские кроссовки Nike Dunks", price: 20900, img: "/img/3img.webp" },
//   {id:4, title: "Кеды Vans Old Skool", price: 8500, img: "/img/4img.webp" },
//   {id:5, title: "Мужские кроссовки Nike Air Jordan 4", price: 9000, img: "/img/5img.webp" },
//   {id:6, title: "КЕДЫ CONVERSE PLAY COMME DES GARÇONS ЧЕРНЫЕ ВЫСОКИЕ", price: 7900, img: "/img/6img.jpg" },
//  {id:7, title: "Мужские кроссовки  Fila", price: 5000, img: "/img/7img.webp" },
//  {id:8, title: "Мужские кроссовки  Fila", price: 6800, img: "/img/8img.webp" },
//  ]

const App = (props) => {
  const [shoesData, setShoesData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favItems, setFavItems] = useState([])
  const [cartOpend, setCartOpend] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [searchVal, setSearchVal] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    (async () => {
      try {
        const cartResponse = await axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/cart')
        const FavResponse = await axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/favorites')
        const itemsResponse = await axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/items')

        setCartItems(cartResponse.data) 
        setFavItems(FavResponse.data) 
        setShoesData(itemsResponse.data) 
        
        setLoading(false)
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    })()
  }, [])

  useEffect(() => {
      let tot = cartItems.reduce((acc, curr) => curr.price + acc, 0)
      setCartTotal(tot)
  }, [cartItems])

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
  const remFromCart = (thisID) => {
    try {
      console.log("thisID:", thisID);
      let indx = cartItems.findIndex(item => Number(item.thisID) === Number(thisID))
      console.log('mocid:',cartItems[indx]["id"] );
      let mocid = cartItems[indx]["id"]
      const inCartItems = cartItems.filter(item => Number(item.id) !== Number(mocid) )
      setCartItems(inCartItems)
      axios.delete(`https://6311eb0df5cba498da884e3e.mockapi.io/cart/${mocid}` )
    } catch (error) {
      alert('Не удалось удалить из корзины')
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
  const remFromFav = (thisID) => {
    try {
      console.log("thisID:", thisID);
      let indx = favItems.findIndex(item => Number(item.thisID) === Number(thisID))
      let mocid = favItems[indx]["id"]
      console.log('mocid:',favItems[indx]["id"]);
      const inFavItems = favItems.filter(item => Number(item.thisID) !== Number(thisID) )
      axios.delete(`https://6311eb0df5cba498da884e3e.mockapi.io/favorites/${mocid}` )
      setFavItems(inFavItems)
    } catch (error) {
      alert('Не удалось удалить из фавориты')
      console.log(error);
    }
  }

  const checkout = async () => {
    await axios.post('https://6311eb0df5cba498da884e3e.mockapi.io/orders', {items: cartItems, total: cartTotal})
    alert('Ваш заказ успешно оформлен 🎁')
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
              <CardList shoesData={shoesData} loading={loading}
                addToCart={addToCart} remFromCart={remFromCart}
                addTofav={addTofav} remFromFav={remFromFav}
                cartItems={cartItems} favItems={favItems}
                cartTotal={cartTotal}
                searchByVal={searchByVal} searchVal={searchVal}/>}/>
            <Route path="/favorites" element={
              <Favorites
                addToCart={addToCart} remFromCart={remFromCart}
                favItems={favItems} cartItems={cartItems}
                remFromFav={remFromFav}
                searchByVal={searchByVal} searchVal={searchVal}/>}/>
            <Route path="/cabinet" element={
              <Cabinet  
                searchByVal={searchByVal} searchVal={searchVal}
                addToCart={addToCart} remFromCart={remFromCart}
                addTofav={addTofav} remFromFav={remFromFav}
                cartItems={cartItems} favItems={favItems}
                />}/>
        </Routes>
        
        {cartOpend && <Drawer cartItems={cartItems} cartTotal={cartTotal} 
                              clseCart={() =>setCartOpend(false)}
                              remFromCart={remFromCart}
                              checkout={checkout}/> }
                              
      </div>
  );
}

export default App;
