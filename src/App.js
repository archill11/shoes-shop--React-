// import {Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import { CardList } from './components/CardList/CardList';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

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


const cart = {
  total: 0,
  shoesInCart: []
}


const App = (props) => {

  const [shoesData, setShoesData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpend, setCartOpend] = useState(false)
  const [cartTotal, setCartTotal] = useState(cart.total)
  


  useEffect(() => {
    fetch('https://6311eb0df5cba498da884e3e.mockapi.io/items')
    .then(res => res.json())
    .then(res => { setShoesData(res) })
  }, [])

  const addToCart = (id) => {
    const toCartItem = shoesData.filter(item => item.id === id )
    setCartItems(prev => [...prev, ...toCartItem])
  }
  const remFromCart = (id) => {
    const inCartItems = cartItems.filter(item => item.id !== id )
    setCartItems(inCartItems)
  }


  if (cartOpend) {
    document.body.style.overflow = 'hidden'
  }else{
    document.body.style.overflow = ''
  }

  return (
      <div className={styles.app_wrapper + ' clear'} style={cartOpend? {overflow: 'hidden'} : null}>

        <Header cartTotal={cartTotal} opnCart={() =>setCartOpend(true)}/>
        <CardList shoesData={shoesData} 
            addToCart={addToCart} remFromCart={remFromCart}
            addToCartTotal={setCartTotal} cartTotal={cartTotal}/>
        {cartOpend && <Drawer cartItems={cartItems} cartTotal={cartTotal} 
                              clseCart={() =>setCartOpend(false)}
                              remFromCart={remFromCart}/> }
        
        
      </div>
  );
}

export default App;
