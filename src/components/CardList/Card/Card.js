
import { useState } from 'react';
import styles from './Card.module.scss';




const Card = (props) => {

  const [inCart, setInCart] = useState(false)
  
  const addToCart = () => {
    if (!inCart) {
      props.addToCartTotal(props.cartTotal + props.price)
      props.addToCart()
      
    }else{
      props.addToCartTotal(props.cartTotal - props.price)
      props.remFromCart()

    }
    
    setInCart(prev => !prev)
  }


  return (
      <div className={styles.card}>
        <img className={styles.like} src="/img/heart.svg" height={20} alt="like"></img>
        <img width={225} height={150} src={props.img} alt="1" />
        <p>{props.title}</p>
        <div className={styles.bottom}>
            <div className={styles.price}>
                <span>цена:</span>
                <b>{props.price} руб.</b>
            </div>
            <button className={styles.button } onClick={addToCart}>
                <img height={24} src={inCart ? "/img/check.svg" : "/img/plus.svg"} alt="addToCart" />
            </button>
        </div>
      </div>
  );
}

export {Card};