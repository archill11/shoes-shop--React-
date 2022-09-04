
import { useState, useEffect } from 'react';

import styles from './Card.module.scss';



const Card = (props) => {
  const {favorited = false, addedCart = false} = props
  const [inCart, setInCart] = useState(addedCart)
  const [inFav, setInFav] = useState(favorited)
  
  const addToCart = () => {
    if (!inCart) {
      props.addToCart()
    }else{
      props.remFromCart()
    }
    setInCart(prev => !prev)
  }

  const addTofav = () => {
    if (!inFav) {
      props.addTofav()
    }else{
      props.remFromFav()
    }
    setInFav(prev => !prev)
  }

  useEffect(() => {
    setInCart(addedCart)
  }, [props.cartItems])

  useEffect(() => {
    setInFav(favorited)
  }, [props.favItems])

  return (
      <div className={styles.card}>
        <img className={styles.like} src={inFav ? "img/heart--red.svg" : "img/heart.svg"} height={20} alt="like"
              onClick={addTofav}></img>
        <img width={225} height={150} src={props.img} alt="thumbl" />
        <p>{props.title}</p>
        <div className={styles.bottom}>
            <div className={styles.price}>
                <span>цена:</span>
                <b>{props.price} руб.</b>
            </div>
            <button className={styles.button } onClick={addToCart}>
                <img height={30} src={inCart ? "img/check.svg" : "img/plus.svg"} alt="addToCart" />
            </button>
        </div>
      </div>
  );
}

export {Card};